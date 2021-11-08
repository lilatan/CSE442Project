import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class endgame extends Phaser.Scene{
    constructor(){
        super(Constants.Scenes.endgame);
    }
    score;
    level;
    init(data){//[Score, Game Scene]
        this.score = data[0] + 100;
        this.level = data[1];
    }
    preload(){
        this.screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;

        this.load.image('endgame', '/static/src/assets/images/endgame.jpg');
        // <a href="https://www.freepik.com/vectors/tree">Tree vector created by upklyak - www.freepik.com</a>

        // this.load.html('nameform', '/static/src/assets/html/nameform.html');
    }
    create(){
        // add image to background and scale it
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'endgame')
        let scaleX = this.cameras.main.width / image.width
        let scaleY = this.cameras.main.height / image.height
        let scale = Math.max(scaleX, scaleY)
        image.setScale(scale).setScrollFactor(0)

        // "game over" text at the top of the scene
        this.gameoverText = this.add.text(this.screenCenterX, 70,
            'VICTORY',
            { fontSize: '80px', fill: '#ffffff' }
        ).setOrigin(0.5);

        // display player's level and final score
        this.scoreTitle = this.add.text(this.screenCenterX, 130,
            'YOUR SCORE',
            { fontSize: '40px', fill: '#ffffff' }
        ).setOrigin(0.5);
        // this.displayLevel = this.add.text(this.screenCenterX, 180,
        //     this.level.key,
        //     { fontSize: '32px', fill: '#730000' }
        // ).setOrigin(0.5);
        this.displayScore = this.add.text(this.screenCenterX, 170,
            this.score.toString(),
            { fontSize: '32px', fill: '#ffffff' }
        ).setOrigin(0.5);


        // prompt user to enter name
        this.promptText = this.add.text(this.screenCenterX, 410,
            'ENTER YOUR NAME',
            { fontSize: '40px', fill: '#000000' }
        ).setOrigin(0.5);

        // player input for name
        var nameDisplay = this.add.text(this.screenCenterX, 450,
            'type to enter',
            { fontSize: '32px', fill: '#000000' }
        ).setOrigin(0.5);

        // update display with user's input
        // https://phaser.io/examples/v3/view/input/keyboard/text-entry
        var userInputted = false;
        this.input.keyboard.on('keydown', function (event) {
            // handle backspace
            if (event.keyCode === 8 && nameDisplay.text.length > 0)
            {
                nameDisplay.text = nameDisplay.text.substr(0, nameDisplay.text.length - 1);
            }
            else if (event.keyCode === 32 || (event.keyCode >= 48 && event.keyCode < 90))
            {
                // remove prompt if not done so already
                if (!userInputted) {
                    userInputted = true;
                    nameDisplay.text = "";
                }

                // handle keypress
                if (nameDisplay.text.length < 10) {
                    nameDisplay.text += event.key;
                }
            }
        });

        // submit to leaderboard button
        this.submitButton = new TextButton(this, 340, 480, 'SUBMIT', {fill: '#474747'}, {fill: '#999999'}, 32,
            ()=> {
            if (userInputted) {
                this.send_leaderboard_entry(nameDisplay.text, this.score, this.level.key)
                this.scene.stop(this.level.key);
                this.sound.play(Constants.SFX.back);
                this.scene.start(Constants.Scenes.leaderboard);
            }
        });
        this.add.existing(this.submitButton);

        // back to menu button
        this.menuButton = new TextButton(this, 25, 550, 'SKIP LEADERBOARD', {fill: '#474747'}, {fill: '#999999'}, 32,
            ()=> {
            this.scene.stop(this.level.key);
            this.scene.start(Constants.Scenes.mainMenu);
            this.sound.play(Constants.SFX.back)
        });
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