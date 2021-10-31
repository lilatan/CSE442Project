import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class levelsMenu extends Phaser.Scene {
    constructor() {
        super(Constants.Scenes.levelsMenu);

    }
    init() {}

    create(){
        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=> {this.scene.start(Constants.Scenes.mainMenu); this.sound.play(Constants.SFX.back)});
        this.add.existing(this.menuButton);

        this.level1Button = new TextButton(this, 25, 100, "LEVEL 1", {fill: '#d4b2d8'}, {fill: '#888888'}, 48,
            ()=> {this.scene.start(Constants.Scenes.lvl1); this.sound.play(Constants.SFX.start)});
        this.add.existing(this.level1Button);
    }

}