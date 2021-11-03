import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

// To allow players to purchase special abilities/power ups in game
export class shop extends Phaser.Scene {
    constructor() {
        super(Constants.Scenes.shop);
    }
    data;
    // Keyboard key to access the shop
    keyE;
    items = {
        doubleJump : 1000,
        dash : 500,
        wallJump : 250,
    }
    init(data){
        this.data = data;
        
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

        this.noMoneyText = new Phaser.GameObjects.Text(this, 120, 150,'NOT ENOUGH CREWELS', {fill: '#d4b2d8'});
        this.noMoneyText.setFontSize(30);
        this.add.existing(this.noMoneyText);
        this.noMoneyText.setVisible(false);

        // *** item 1 ****
        this.doubleJumpText = new Phaser.GameObjects.Text(this, 120, 250,'DOUBLE JUMP', {fill: '#799ced'});
        this.doubleJumpText.setFontSize(48);
        this.add.existing(this.doubleJumpText);

        this.doubleJumpBuyButton = new TextButton(this, 120, 300,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},48, ()=>this.doubleJump());
        this.add.existing(this.doubleJumpBuyButton);

        //Add in the text and buy buttons for other 2 items

        this.backButton = new TextButton(this, 25, 550, 'BACK', {fill: '#d4b2d8'}, {fill: '#888888'}, 48, () => this.resumeGame());
        this.add.existing(this.backButton);

        //Access to shop by pressing the E key
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyE.on('up', ()=>this.resumeGame());
    }
    resumeGame(){
        this.scene.stop();
    }
    buy(cost){
        if (this.data.crewels <= cost){
            this.noMoneyText.setVisible(true);
        }
        // deduct crewels when item is "bought"
    }
    // Have functions for each item and all call buy, Input could be the amount required to buy it
    doubleJump(){
        this.scene.buy(this.items.doubleJump);
    }
    dash(){
        this.scene.buy(this.items.dash);
    }
    wallJump(){
        this.scene.buy(this.items.wallJump);
    }
}