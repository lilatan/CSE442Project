import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class optionsMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.options);
    }
    data;
    init(data){
        this.data = data;
    }
    create(){
        this.scene.bringToTop();

        // Create buttons
        this.audioButton = new TextButton(this, 300, 300, "AUDIO", {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.audio));
        this.controlsButton = new TextButton(this,300, 350, "CONTROLS", {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.control));
        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(this.data.key));

        // Add buttons to scene
        this.add.existing(this.audioButton);
        this.add.existing(this.controlsButton);
        this.add.existing(this.menuButton);
    }
}