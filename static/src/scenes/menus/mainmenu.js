import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class mainMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.mainMenu);
        
    }
    video;
    vid;
    init(){

    }
    preload(){
        this.load.video('background_main', '/static/src/assets/high_way_view.mp4', 'loadeddata', false, true);
        this.load.video('background_main', '/static/src/assets/main_menu_foot.mp4', 'loadeddata', false, true);
        this.load.video('background_main', '/static/src/assets/main_menu_background.mp4', 'loadeddata', false, true);

        this.load.audio('Prologue', '/static/src/assets/bgm/Prologue.mp3');
        this.load.audio('Battle-Rosemoon', '/static/src/assets/bgm/Battle-Rosemoon.mp3');
        this.load.audio('Battle-Sanctuary', '/static/src/assets/bgm/Battle-Sanctuary.mp3');
        this.load.audio('Nostalgia', '/static/src/assets/bgm/Nostalgia.mp3');
        this.load.audio('Remotest-Liblary', '/static/src/assets/bgm/Remotest-Liblary.mp3');
        this.load.audio('Wanderers-City', '/static/src/assets/bgm/Wanderers-City.mp3');
    }

    create(){
        
        this.music = this.sound.add(this.game.config.audio.music);
        this.sound.setVolume(this.game.config.audio.volume / 100);
        this.sound.pauseOnBlur = false;
        // console.log(this.sound.key + " - " + music.key);
        console.log(this.sound.get(this.game.config.audio.music).key +" "+ this.sound.get(this.game.config.audio.music).isPlaying);
        if (!this.sound.get(this.game.config.audio.music).isPlaying){
            this.music.loop=true;
            this.music.play();
        }
        //video code below
        this.vid = this.add.video(390, 325, 'background_main'); //400, 300
        this.vid.play(true);
        this.vid.setPaused(false);
        this.vid.displayWidth = this.sys.canvas.width;
        this.vid.displayHeight = this.sys.canvas.height;
       
        // console.log(this.sound.key);


        this.startButton = new TextButton(this, 25, 375,'START',{fill: '#ffffff'}, {fill: '#888888'},72, ()=>this.scene.start(Constants.Scenes.lvl1));
        this.add.existing(this.startButton);
        this.optionsButton = new TextButton(this, 25, 450,'OPTIONS',{fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.scene.start(Constants.Scenes.options, this.scene));
        this.add.existing(this.optionsButton);
        this.leaderButton = new TextButton(this, 25, 500, 'LEADERBOARD', {fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.scene.start(Constants.Scenes.leaderboard));
        this.add.existing(this.leaderButton);
        this.levelsMenuButton = new TextButton(this, 25, 550, 'LEVELS', {fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.scene.start(Constants.Scenes.levelsMenu));
        this.add.existing(this.levelsMenuButton);
        // this.button = new Phaser.GameObjects.Text(this, 10, 10,'hello', '#ffffff');

        // console.log('testing');
        
    }

    // startButtonFunction

}