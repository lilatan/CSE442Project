import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class optionsMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.options);
    }
    create(){
        this.muteButton = new TextButton(this, 300, 300, "MUTE SOUND", {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.muteSound());
        this.xMark = new Phaser.GameObjects.Text(this, 250, 300, 'X', {fill: '#ffffff'});
        this.xMark.setFontSize(48);
        
        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.mainMenu));
        this.add.existing(this.menuButton);
        this.add.existing(this.muteButton);
        this.add.existing(this.xMark);
        this.xMark.setVisible(false);
    }

    muteSound(){
        if(!this.sound.mute){
            this.sound.setMute(true);
            this.xMark.setVisible(true);
        }else{
            this.sound.setMute(false);
            this.xMark.setVisible(false);
        }
    }
    
}