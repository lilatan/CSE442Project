import { Constants } from "../../Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

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
        this.leaderboardText = new Phaser.GameObjects.Text(this,275,200,'LEADERBOARD', {fill: '#ffffff'});
        this.leaderboardText.setFontSize(72);
        this.add.existing(this.leaderboardText);
        this.nameText = new Phaser.GameObjects.Text(this, 250, 230, 'NAME - SCORE - LEVEL', {fill: '#ffffff'});
        this.nameText.setFontSize(48);
        this.add.existing(this.nameText);

        
        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.mainMenu));
        this.add.existing(this.menuButton);
        // console.log('leader testing');
    }
}