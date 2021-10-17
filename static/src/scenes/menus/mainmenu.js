import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class mainMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.mainMenu);
        
    }
    init(){

    }
    preload(){
        this.load.audio('bgm', '/static/src/assets/bgm/Prologue.mp3');
    }

    create(){
        var music = this.sound.add(Constants.BGM.mainMusic);
        this.sound.setVolume(0.1);
        this.sound.pauseOnBlur = false;
        // console.log(this.sound.key + " - " + music.key);
        console.log(this.sound.get(Constants.BGM.mainMusic).key +" "+ this.sound.get(Constants.BGM.mainMusic).isPlaying);
        if (!this.sound.get(Constants.BGM.mainMusic).isPlaying){
            music.loop=true;
            music.play();
        }
        // console.log(this.sound.key);

        this.startButton = new TextButton(this, 25, 375,'START',{fill: '#ffffff'}, {fill: '#888888'},72, ()=>this.scene.start(Constants.Scenes.lvl1));
        this.add.existing(this.startButton);
        this.loadButton = new TextButton(this, 25, 450,'LOAD',{fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.scene.start(Constants.Scenes.load));
        this.add.existing(this.loadButton);
        this.optionsButton = new TextButton(this, 25, 500,'OPTIONS',{fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.scene.start(Constants.Scenes.options, this.scene));
        this.add.existing(this.optionsButton);
        this.leaderButton = new TextButton(this, 25, 550, 'LEADERBOARD', {fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.scene.start(Constants.Scenes.leaderboard));
        this.add.existing(this.leaderButton);
        // this.button = new Phaser.GameObjects.Text(this, 10, 10,'hello', '#ffffff');

        // console.log('testing');
    }

    // startButtonFunction

}