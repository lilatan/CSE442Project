import { Constants } from "../../Constants.js";
import { TextButton } from "../../game_objects/TextButton.js";

export class optionsMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.options);
    }
    create(){
        this.muteButton = new TextButton(this, 300, 300, "MUTE SOUND", {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.muteSound());
        this.unmuteButton = new TextButton(this, 300, 300, "UNMUTE SOUND", {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=> this.unmuteSound());
        this.menuButton = new TextButton(this, 25, 750, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.mainMenu));
        this.add.existing(this.menuButton);
        this.add.existing(this.muteButton);
    }

    muteSound(){
        this.add.existing(this.unmuteButton);
    }
    unmuteSound(){

    }
}