import { Constants } from "../../Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class leaderboard extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.leaderboard);
    }
    //Put in database information
    init(){

    }
    leaderboardData = null;
    preload(){
        var parent = this;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (this.readyState != 4) return;
            if (this.status == 200) {
                // data var contains json received from the server
                parent.leaderboardData = JSON.parse(this.responseText);

                // Iterating through the leaderboard Data
                let x = 100 ; let y = 160; // position of first entry
                let max_entries = 10; let entry_num = 0; // limit number of entries on leaderboard
                for (let entry of parent.leaderboardData){
                    // stop adding entries if limit hit
                    if (entry_num === max_entries) break;
                    else entry_num += 1;

                    // Get each field from an entry
                    let entry_name = "" + entry.name;
                    let entry_score = "" + entry.score;
                    let entry_level = "" + entry.level;

                    // Pad name and score to align columns
                    while (entry_name.length < 12) {entry_name += " "}
                    while (entry_score.length < 12) {entry_score += " "}

                    let value = entry_name + entry_score + entry_level;
                    parent.leaderboardText = new Phaser.GameObjects.Text(parent, x, y, value, {fill: '#d4b2d8', align: 'center'});
                    parent.leaderboardText.setFontSize(20);
                    parent.add.existing(parent.leaderboardText);
                    y += 30
                }
            }
        };
        xhr.open('GET', '/get-leaderboard', true);
        xhr.send();
    }

    //make the leaderboard page (static content only)
    create(){
        this.leaderboardText = new Phaser.GameObjects.Text(this, 100, 80, 'LEADERBOARD', {fill: '#d4b2d8', align: 'center'});
        this.leaderboardText.setFontSize(40);
        this.add.existing(this.leaderboardText);
        this.nameText = new Phaser.GameObjects.Text(this, 100, 120, 'NAME - SCORE - LEVEL', {fill: '#d4b2d8', align: 'center'});
        this.nameText.setFontSize(32);
        this.add.existing(this.nameText);

        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48,
            () => {this.scene.start(Constants.Scenes.mainMenu); this.sound.play(Constants.SFX.back)});
        this.add.existing(this.menuButton);
    }

}