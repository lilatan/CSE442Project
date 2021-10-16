import { Constants } from "/static/src/Constants.js";

export class mainMenuLoad extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.mainMenuLoad);
    }

    keySpace;
    preload(){
        var loading = new Phaser.GameObjects.Text(this, 200,200,'LOADING...', {fill: '#ffffff'});
        this.load.audio('bgm', '/static/src/assets/bgm/Prologue.mp3');
    }
    create(){
        var music = this.sound.add('bgm');
        this.sound.volume = 0.10;

        
        var prompt = new Phaser.GameObjects.Text(this, 200,200,'Press SPACE', {fill: '#ffffff'});
        prompt.setFontSize(72);
        this.add.existing(prompt);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keySpace.on('up',()=>this.next());
        
        // this.scene.start(Constants.Scenes.mainMenu);
        music.play();
    }
    next(){
        this.scene.start(Constants.Scenes.mainMenu);
    }
}