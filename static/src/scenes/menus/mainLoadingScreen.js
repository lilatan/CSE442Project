import { Constants } from "/static/src/Constants.js";

export class mainMenuLoad extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.mainMenuLoad);
    }

    keySpace;
    preload(){
        
    }
    create(){
        var loading = new Phaser.GameObjects.Text(this, 200,150,'LOADING...', {fill: '#ffffff'});
        loading.setFontSize(72);
        this.add.existing(loading);
        
        // var e = new Date().getTime()+(5*1000);
        // while(new Date().getTime()<=e){}
        
        // loading.setVisible(false);
        var prompt = new Phaser.GameObjects.Text(this, 200,200,'Press SPACE', {fill: '#ffffff'});
        prompt.setFontSize(72);
        this.add.existing(prompt);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keySpace.on('up',()=>this.next());
    }
    next(){
        this.scene.start(Constants.Scenes.mainMenu);
    }
}