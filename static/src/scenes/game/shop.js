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
    keyE;
    items = {
        itemA : 10,
        itemB : 5,
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
        this.doubleJumpText = new Phaser.GameObjects.Text(this, 110, 225,'ITEM A', {fill: '#799ced'});
        this.doubleJumpText.setFontSize(40);
        this.add.existing(this.doubleJumpText);
        this.doubleJumpBuyButton = new TextButton(this, 110, 265,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},30, ()=>this.buyItemA());
        this.add.existing(this.doubleJumpBuyButton);

        this.heartLife = this.physics.add.image(310, 250, 'heart_life');
        this.heartLife.body.moves = false;
        this.heartLife.body.setAllowGravity(false);
        this.heartLife.setScale(0.3);

        // *** item 2 ****
        this.dashText = new Phaser.GameObjects.Text(this, 110, 300,'ITEM B', {fill: '#799ced'});
        this.dashText.setFontSize(40);
        this.add.existing(this.dashText);
        this.dashBuyButton = new TextButton(this, 110, 340,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},30, ()=>this.buyItemB());
        this.add.existing(this.dashBuyButton);

        this.shield = this.physics.add.image(360, 340, 'shield');
        this.shield.body.moves = false;
        this.shield.body.setAllowGravity(false);
        this.shield.setScale(0.2);

        // *** item 3 ****
        this.dashText = new Phaser.GameObjects.Text(this, 110, 375,'ITEM C', {fill: '#799ced'});
        this.dashText.setFontSize(40);
        this.add.existing(this.dashText);
        this.dashBuyButton = new TextButton(this, 110, 415,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},30, ()=>this.buyItemC());
        this.add.existing(this.dashBuyButton);

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
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyE.on('up', ()=>this.resumeGame());
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
            this.data.doubleJump = 1;
        }
    }

    buyItemB(){
        if(this.buy(this.items.itemB)){
            this.data.dash = 1;
        }
    }

    buyItemC(){
        if(this.buy(this.items.itemC)){
            this.data.wallJump = 1;
        }
    }
}