import { Constants } from "../../Constants.js"
import { TextButton } from "../../game_objects/TextButton.js";

export class loadGame extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.load);
    }

    create(){
        this.menuButton = new TextButton(this, 25, 750, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.mainMenu));
        this.add.existing(this.menuButton);
    }

}