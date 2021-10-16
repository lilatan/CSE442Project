import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class pauseMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.pause);
    }
    create(){
        this.resumeButton = new TextButton(this, 25, 400,'RESUME',{fill: '#ffffff'}, {fill: '#888888'},36, ()=>this.resumeGame());
        this.restartButton = new TextButton(this, 25, 400,'RESTART',{fill: '#ffffff'}, {fill: '#888888'},36, ()=>this.restartGame());
        this.optionsButton = new TextButton(this, 25, 400,'OPTIONS',{fill: '#ffffff'}, {fill: '#888888'},36, ()=>this.scene.start(/*options scene*/));
        this.exitButton = new TextButton(this, 25, 400,'EXIT',{fill: '#ffffff'}, {fill: '#888888'},36, ()=>this.exitGame());

    }

    resumeGame(){

    }
    restartGame(){

    }
    exitGame(){

    }
    
}