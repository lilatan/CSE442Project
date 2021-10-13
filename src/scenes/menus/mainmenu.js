import { Constants } from "../../Constants";
import { TextButton } from "../../game_objects/TextButton";
export class mainMenu extends Phaser.Scene {
    constructor(){
        super(Constant.Scenes.mainMenu);
    }
    init(){

    }
    preload(){

    }

    create(){
        this.startButton = new TextButton(this, 100,100,'START',{fill: '#fff'}, {fill: '#888'}, ()=>this.scene.start(Constants.Scenes.lvl1));
        this.leaderButton = new TextButton(this, 100, 150, 'LEADERBOARD', {fill: '#fff'}, {fill: '#888'}, ()=>this.scene.start(Constants.Scenes.leaderboard));
    }

    startButtonFunction

}