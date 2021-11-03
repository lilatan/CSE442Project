import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

// To allow players to purchase special abilities/power ups in game
export class shop extends Phaser.Scene {
    constructor() {
        super(Constants.Scenes.shop);
    }
    // These are the transition scenes
    data;
    // Keyboard key to access the shop
    keyE;
    // FIGURE OUT HOW TO IMPORT CREWELS CURRENCY INTO THIS FILE SOMEHOW TO USE

    static items = {
        doubleJump : 1000,
        dash : 500,
        wallJump : 250,
    }
    init(data){
        this.data = data;
        
    }

    create(){
        this.scene.bringToTop();
        // Double jump, fast forward/zoom

        // Create a popup window for the shop
        let graphics = this.add.graphics();

        graphics.fillStyle(0xffffff, 1);
        graphics.fillRect(100, 200, 600, 300);

        this.shopText = new Phaser.GameObjects.Text(this, 120, 110,'SHOP', {fill: '#d4b2d8'});
        this.shopText.setFontSize(52);
        this.add.existing(this.shopText);

        this.moneyText = new Phaser.GameObjects.Text(this, 120, 150,'CREWELS: 0', {fill: '#d4b2d8'});
        this.moneyText.setFontSize(30);
        this.add.existing(this.moneyText);

        this.doubleJumpText = new Phaser.GameObjects.Text(this, 120, 250,'DOUBLE JUMP', {fill: '#799ced'});
        this.doubleJumpText.setFontSize(48);
        this.add.existing(this.doubleJumpText);

        this.buyButton = new TextButton(this, 120, 300,'BUY',{fill: '#d4b2d8'}, {fill: '#888888'},48, ()=>this.buy());
        this.add.existing(this.buyButton);

        // Figure out how to make this work for all transition levels
        this.backButton = new TextButton(this, 25, 550, 'BACK', {fill: '#d4b2d8'}, {fill: '#888888'}, 48, () => this.resumeGame());
        this.add.existing(this.backButton);

        //Access to shop by pressing the E key
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyE.on('up', ()=>this.resumeGame());
    }
    resumeGame(){
        
        // this.scene.resume(this.lvl1_2.key);
        // this.scene.resume(this.lvl2_3.key);
        // this.scene.resume(this.lvl3_4.key);
        this.scene.stop();
    }
    buy(crewels){
        if (crewels <= 0){
            console.log("Not enough crewels");
        }
        // Figure out how to print to screen the above
        // And how to deduct crewels when item is "bought"
    }
    // Have functions for each item and all call buy, Input could be the amount required to buy it
    doubleJump(){
        this.scene.buy(this.crewels);
    }
    fastForward(){
        this.scene.buy(this.crewels);
    }

    // Player walks up to shop and then clicks 'E' to access shop window
}