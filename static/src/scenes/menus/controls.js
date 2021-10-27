import { Constants } from "/static/src/Constants.js"
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class controlsScene extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.control);
    }
    x=200;
    y;
    create(){
        this.scene.bringToTop();
        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.scene.start(Constants.Scenes.options));
        this.add.existing(this.menuButton);
        this.y = 100;
        // console.log(this.sound.key);
        this.controlTextLine('W', '\u{1f845}', "MOVE UP/JUMP");
        this.controlTextLine('A', '\u{1f844}', "MOVE LEFT   ");
        this.controlTextLine('S', '\u{1f847}', "MOVE DOWN   ");
        this.controlTextLine('D', '\u{1f846}', "MOVE RIGHT  ");
    }

    controlTextLine(control1, control2, usage){
        var textLine = "" + usage +"  -  " +  control1 + " " + control2;
        var controlsLine = new Phaser.GameObjects.Text(this, this.x, this.y, textLine,{fill: '#ffffff', fontSize: 48});
        this.add.existing(controlsLine);
        this.y += 75;
    }

}