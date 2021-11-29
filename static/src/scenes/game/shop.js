import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";
import {dataFile} from "../../data.js";

// To allow players to purchase special abilities/power ups in game
export class shop extends Phaser.Scene {
    constructor() {
        super(Constants.Scenes.shop);
    }
    data;
    // Keyboard key to access the shop
    keyEsc;
    items = {
        itemA : 5,
        itemB : 15,
        itemC : 2,
    }
    init(data){
        this.data = data;

    }
    // For adding images later
    preload(){
        // Image of item 1: Heart/life
        this.load.image('heart_life', 'static/src/assets/images/heartlife.png');

        //Image of item 2: Shield
        this.load.image('shield', 'static/src/assets/images/shield.png');

        //image of item 3: Winged_Shoes
        this.load.image('talaria', 'static/src/assets/images/winged_shoes.png');

        //Image of item 3:
        //this.image.load('', '');
    }

    create(){
        this.scene.bringToTop();

        // Create a popup window for the shop
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(100, 200, 600, 300);

        this.shopText = new Phaser.GameObjects.Text(this, 120, 110,'SHOP', {fill: '#d4b2d8'});
        this.shopText.setFontSize(52);
        this.add.existing(this.shopText);

        this.moneyText = new Phaser.GameObjects.Text(this, 120, 150,'CREWELS: ' + this.data.crewels, {fill: '#d4b2d8'});
        this.moneyText.setFontSize(30);
        this.add.existing(this.moneyText);

        this.noMoneyText = new Phaser.GameObjects.Text(this, 120, 175,'NOT ENOUGH CREWELS', {fill: '#d4b2d8'});
        this.noMoneyText.setFontSize(30);
        this.add.existing(this.noMoneyText);
        this.noMoneyText.setVisible(false);

        // *** item 1 ****
        this.itemAText = new Phaser.GameObjects.Text(this, 110, 225,'Extra Life', {fill: '#799ced'});
        this.itemAText.setFontSize(40);
        this.add.existing(this.itemAText);
        this.itemACost = new Phaser.GameObjects.Text(this, 200, 265,'COST:' + this.items.itemA.toString(), {fill: '#799ced'});
        this.itemACost.setFontSize(30);
        this.add.existing(this.itemACost);
        this.extraLifeBuyButton = new TextButton(this, 110, 265,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},30, ()=>this.buyItemA());
        this.add.existing(this.extraLifeBuyButton);


        this.heartLife = this.physics.add.image(500, 250, 'heart_life');
        this.heartLife.body.moves = false;
        this.heartLife.body.setAllowGravity(false);
        this.heartLife.setScale(0.3);

        // *** item 2 ****
        this.itemBText = new Phaser.GameObjects.Text(this, 110, 300,'Power Shield', {fill: '#799ced'});
        this.itemBText.setFontSize(40);
        this.add.existing(this.itemBText);
        this.itemBCost = new Phaser.GameObjects.Text(this, 200, 340,'COST:' + this.items.itemB.toString(), {fill: '#799ced'});
        this.itemBCost.setFontSize(30);
        this.add.existing(this.itemBCost);
        this.shieldBuyButton = new TextButton(this, 110, 340,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},30, ()=>this.buyItemB());
        this.add.existing(this.shieldBuyButton);

        this.shield = this.physics.add.image(500, 340, 'shield');
        this.shield.body.moves = false;
        this.shield.body.setAllowGravity(false);
        this.shield.setScale(0.2);

        // *** item 3 ****
        this.dashText = new Phaser.GameObjects.Text(this, 110, 375,'Double Jump', {fill: '#799ced'});
        this.dashText.setFontSize(40);
        this.add.existing(this.dashText);
        this.itemCCost = new Phaser.GameObjects.Text(this, 200, 415,'COST:' + this.items.itemC.toString(), {fill: '#799ced'});
        this.itemCCost.setFontSize(30);
        this.add.existing(this.itemCCost);
        this.dashBuyButton = new TextButton(this, 110, 415,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},30, ()=>this.buyItemC());
        this.add.existing(this.dashBuyButton);

        this.talaria = this.physics.add.image(500, 430, 'talaria');
        this.talaria.body.moves = false;
        this.talaria.body.setAllowGravity(false);
        this.talaria.setScale(0.2);



        //For image to come
        //this.heartLife = this.physics.add.image(140, 225, 'heart_life');
        /*
        this.wallJumpText = new Phaser.GameObjects.Text(this, 400, 250,'WALL JUMP', {fill: '#799ced'});
        this.wallJumpText.setFontSize(40);
        this.add.existing(this.wallJumpText);
        this.wallJumpBuyButton = new TextButton(this, 400, 300,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},30, ()=>this.wallJump());
        this.add.existing(this.wallJumpBuyButton);
        */
        this.backButton = new TextButton(this, 25, 550, 'BACK', {fill: '#d4b2d8'}, {fill: '#888888'}, 48, () => this.resumeGame());
        this.add.existing(this.backButton);

        //Access to shop by pressing the E key
        this.keyEsc = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyEsc.on('up', ()=>this.resumeGame());
    }

    update(){
        this.moneyText.setText('CREWELS: ' + this.data.crewels);
    }

    resumeGame(){
        this.scene.stop();
    }

    buy(cost){
        if (this.data.crewels < cost){
            this.noMoneyText.setVisible(true);
            return false
        }else{
            this.noMoneyText.setVisible(false);
            this.data.crewels-=cost;
            return true;
        }

        // deduct crewels when item is "bought"
    }
    // Item functions that call buy func with cost
    buyItemA(){
        if(this.buy(this.items.itemA)){
            this.data.lives += 1;
        }
    }

    buyItemB(){
        if(this.data.shield !== 1){
            if(this.buy(this.items.itemB)){
                this.data.shield = 1;
            }
        }
    }

    buyItemC(){
        if(this.buy(this.items.itemC)){
            this.data.doubleJump += 1;
        }
    }
}