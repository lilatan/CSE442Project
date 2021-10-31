import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class mainMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.mainMenu);
        
    }
    init(){

    }
    preload(){
        // music bgm
        this.load.audio('Prologue', '/static/src/assets/audio/bgm/Prologue.mp3');
        this.load.audio('Battle-Rosemoon', '/static/src/assets/audio/bgm/Battle-Rosemoon.mp3');
        this.load.audio('Battle-Sanctuary', '/static/src/assets/audio/bgm/Battle-Sanctuary.mp3');
        this.load.audio('Nostalgia', '/static/src/assets/audio/bgm/Nostalgia.mp3');
        this.load.audio('Remotest-Liblary', '/static/src/assets/audio/bgm/Remotest-Liblary.mp3');
        this.load.audio('Wanderers-City', '/static/src/assets/audio/bgm/Wanderers-City.mp3');

        // sound effects
        // this.load.audio('', 'static/src/assets/audio/sfx/cursor-01.wav');
        this.load.audio('menu-click', 'static/src/assets/audio/sfx/cursor-02.wav');
        this.load.audio('start-click', 'static/src/assets/audio/sfx/item-02.wav');
        this.load.audio('back-click', 'static/src/assets/audio/sfx/cancel-01.wav');
        this.load.audio('collect-coin', 'static/src/assets/audio/sfx/kettei-01.wav');
        this.load.audio('take-damage', 'static/src/assets/audio/sfx/14_nekketsu_damage.wav');
        this.load.audio('jump', 'static/src/assets/audio/sfx/07_priest_attack.wav');
        this.load.audio('land-ground', 'static/src/assets/audio/sfx/damage01.wav');
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
        // console.log(this.sound.key);

        this.startButton = new TextButton(this, 25, 375,'START',{fill: '#ffffff'}, {fill: '#888888'},72,
            ()=> {this.scene.start(Constants.Scenes.lvl1); this.sound.play(Constants.SFX.start)});
        this.add.existing(this.startButton);
        this.optionsButton = new TextButton(this, 25, 450,'OPTIONS',{fill: '#ffffff'}, {fill: '#888888'},48,
            ()=> {this.scene.start(Constants.Scenes.options, this.scene); this.sound.play(Constants.SFX.menu)});
        this.add.existing(this.optionsButton);
        this.leaderButton = new TextButton(this, 25, 500, 'LEADERBOARD', {fill: '#ffffff'}, {fill: '#888888'},48,
            ()=> {this.scene.start(Constants.Scenes.leaderboard); this.sound.play(Constants.SFX.menu)});
        this.add.existing(this.leaderButton);
        this.levelsMenuButton = new TextButton(this, 25, 550, 'LEVELS', {fill: '#ffffff'}, {fill: '#888888'},48,
            ()=> {this.scene.start(Constants.Scenes.levelsMenu); this.sound.play(Constants.SFX.menu)});
        this.add.existing(this.levelsMenuButton);
        // this.button = new Phaser.GameObjects.Text(this, 10, 10,'hello', '#ffffff');

        // console.log('testing');
    }

}