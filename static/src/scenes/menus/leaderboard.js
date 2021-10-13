import { Constants } from "../../Constants.js";
import { TextButton } from "../../game_objects/TextButton.js";

export class leaderboard extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.leaderboard);
    }
    //Put in database information
    init(){

    }
    preload(){

    }
    //make the leaderboard using the data grabbed in init
    create(){
        this.menuButton = new TextButton(this, 25, 750, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.mainMenu));
        this.add.existing(this.menuButton);
        // console.log('leader testing');
    }
}