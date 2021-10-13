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
        this.startButton = new TextButton(this, 25, 400,'START',{fill: '#ffffff'}, {fill: '#888888'},72, ()=>this.scene.start(Constants.Scenes.lvl1));
        this.add.existing(this.startButton);
        this.leaderButton = new TextButton(this, 25, 475, 'LEADERBOARD', {fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.scene.start(Constants.Scenes.leaderboard));
        this.add.existing(this.leaderButton);
        // this.button = new Phaser.GameObjects.Text(this, 10, 10,'hello', '#ffffff');
        // console.log('testing');
    }

    startButtonFunction

}