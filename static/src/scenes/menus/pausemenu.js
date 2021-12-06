import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

// export function pause(scene){
//     scene.pause();
    
// }

export class pauseMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.pause);
    }
    level;
    keyESC;
    init(level){
        this.level = level;
    }
    create(){
        this.scene.bringToTop();
        // console.log(this.level.key);
        this.pauseText = new Phaser.GameObjects.Text(this,275,200,'PAUSED',{fill: '#ffffff'});
        this.pauseText.setFontSize(72);
        this.add.existing(this.pauseText);
        this.resumeButton = new TextButton(this, 25, 450,'RESUME',{fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.resumeGame());
        this.add.existing(this.resumeButton);
        // this.restartButton = new TextButton(this, 25, 450,'RESTART',{fill: '#ffffff'}, {fill: '#888888'},48, ()=>this.restartGame());
        // this.add.existing(this.restartButton);
        this.optionsButton = new TextButton(this, 25, 500,'OPTIONS',{fill: '#ffffff'}, {fill: '#888888'},48,
            ()=> {this.scene.start(Constants.Scenes.options,this.scene); this.sound.play(Constants.SFX.menu)});
        this.add.existing(this.optionsButton);
        this.exitButton = new TextButton(this, 25, 550,'EXIT',{fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.exitGame());
        this.add.existing(this.exitButton);

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyESC.on('up', ()=>this.resumeGame());

    }
    update(){
        // if(this.keyESC.isDown){
        //     this.scene.pause();
        //     this.scene.launch(Constants.Scenes.pause);
        // }
    }

    resumeGame(){
        this.scene.resume(this.level.key);
        this.scene.stop();
        this.sound.play(Constants.SFX.back);

    }
    restartGame(){
        this.scene.start(this.level.key);
        // this.scene.stop();
        this.sound.play(Constants.SFX.start);
    }
    exitGame(){
        this.scene.stop(this.level.key);
        this.scene.start(Constants.Scenes.mainMenu);
        this.sound.play(Constants.SFX.back);
    }

}