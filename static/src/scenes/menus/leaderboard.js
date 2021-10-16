import { Constants } from "../../Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class leaderboard extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.leaderboard);
    }
    //Put in database information
    init(){}
    leaderboardData;
    xhr;
    preload(){
        this.xhr = new XMLHttpRequest();
        this.xhr.onreadystatechange = this.stateChangeData();
        console.log(this.leaderboardData);
        this.xhr.open('GET', '/get-leaderboard', true);
        this.xhr.send();
    }
    //make the leaderboard using the data grabbed in init
    create(){
        this.leaderboardText = new Phaser.GameObjects.Text(this, 100, 90,'LEADERBOARD', {fill: '#d4b2d8', align: 'center'});
        this.leaderboardText.setFontSize(40);
        this.add.existing(this.leaderboardText);
        this.nameText = new Phaser.GameObjects.Text(this, 100, 120, 'NAME - SCORE - LEVEL', {fill: '#d4b2d8', align: 'center'});
        this.nameText.setFontSize(32);
        this.add.existing(this.nameText);

        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.mainMenu));
        this.add.existing(this.menuButton);
        // console.log('leader testing');
    }
    stateChangeData() {
        if (this.xhr.readyState != 4) return;
        if (this.xhr.status == 200) {
            // this.leaderboardData contains json received from the server
            this.leaderboardData = JSON.parse(this.responseText);
            console.log(this.leaderboardData);
            // for (let i = 0; i < this.leaderboardData.length; i++) {
            //     console.log(this.leaderboardData[i]);
            // }
        }
    }
}