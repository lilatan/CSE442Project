import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";
import { dataFile } from "/static/src/data.js";

export class levelsMenu extends Phaser.Scene {
    constructor() {
        super(Constants.Scenes.levelsMenu);

    }
    init() {}

    create(){
        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=> {this.scene.start(Constants.Scenes.mainMenu); this.sound.play(Constants.SFX.back)});
        this.add.existing(this.menuButton);

        var data = new dataFile();
        this.level1Button = new TextButton(this, 25, 100, "LEVEL 1", {fill: '#d4b2d8'}, {fill: '#888888'}, 48,
            ()=> {this.scene.start(Constants.Scenes.lvl1); this.sound.play(Constants.SFX.start)});
        this.add.existing(this.level1Button);

        this.level1_2Button = new TextButton(this, 25, 150, "LEVEL 1_2", {fill: '#d4b2d8'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.lvl1_2));
        this.add.existing(this.level1_2Button);

        this.level2Button = new TextButton(this, 25, 200, "LEVEL 2", {fill: '#d4b2d8'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.lvl2));
        this.add.existing(this.level2Button);

        this.level2_3Button = new TextButton(this, 25, 250, "LEVEL 2_3", {fill: '#d4b2d8'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.lvl2_3));
        this.add.existing(this.level2_3Button);

        this.level3Button = new TextButton(this, 25, 300, "LEVEL 3", {fill: '#d4b2d8'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.lvl3));
        this.add.existing(this.level3Button);

        this.level3_4Button = new TextButton(this, 25, 350, "LEVEL 3_4", {fill: '#d4b2d8'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.lvl3_4));
        this.add.existing(this.level3_4Button);

        this.level4Button = new TextButton(this, 25, 400, "LEVEL 4", {fill: '#d4b2d8'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.lvl4));
        this.add.existing(this.level4Button);



    }
}