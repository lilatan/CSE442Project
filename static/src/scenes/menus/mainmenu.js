import { Constants } from "../../Constants.js";
import { TextButton } from "../../game_objects/TextButton.js";
export class mainMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.mainMenu);
    }
    init(){

    }
    preload(){

    }

    create(){
        // this.startButton = new TextButton(this, 100,100,'START',{fill: '#ffffff'}, {fill: '#888888'}, ()=>this.scene.start(Constants.Scenes.lvl1));
        this.leaderButton = new TextButton(this, 100, 150, 'LEADERBOARD', {fill: '#ffffff'}, {fill: '#888888'}, ()=>this.scene.start(Constants.Scenes.leaderboard));
        console.log('testing');
    }

    startButtonFunction

}