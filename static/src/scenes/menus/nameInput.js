import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class nameInput extends Phaser.Scene{
    constructor(){
        super(Constants.Scenes.nameInput);
    }
    score;
    level;
    userInput;
    init(data){//[Score, Game Scene]
        this.score = data[0];
        this.level = data[1];
    }
    preload(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        this.load.image('graveyard', '/static/src/assets/images/graveyard2.jpg');
        // <a href="https://www.freepik.com/vectors/tree">Tree vector created by upklyak - www.freepik.com</a>

        // this.load.html('nameform', '/static/src/assets/html/nameform.html');
    }
    create(){
        // add image to background and scale it
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'graveyard')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)

        // "game over" text at the top of the scene
        this.gameoverText = this.add.text(this.screenCenterX, 70,
            'GAME OVER',
            { fontSize: '80px', fill: '#730000' }
        ).setOrigin(0.5);

        // prompt user to enter name
        this.promptText = this.add.text(this.screenCenterX, 150,
            'ENTER YOUR NAME',
            { fontSize: '32px', fill: '#ffffff' }
        ).setOrigin(0.5);

        // player input for name
        this.nameDisplay = this.add.text(this.screenCenterX, 200,
            'NAME',
            { fontSize: '40px', fill: '#000000' }
        ).setOrigin(0.5);

        // update display with user's input
        // this.nameDisplay.setText("this is my name");

        // back to menu button
        this.menuButton = new TextButton(this, 25, 550, 'BACK TO MAIN MENU', {fill: '#ffffff'}, {fill: '#999999'}, 32,
            ()=> {this.scene.start(this.data.key); this.sound.play(Constants.SFX.back)});
        this.add.existing(this.menuButton);

    }

    send_leaderboard_entry(name, score, level){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/update-leaderboard', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: name,
            score: score,
            level: level
        }));
    }
}