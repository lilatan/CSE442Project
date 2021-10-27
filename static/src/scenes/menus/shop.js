import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class shop extends Phaser.Scene {
    constructor() {
        super(Constants.Scenes.shop);
    }
    init(){}

    create(){
        this.scene.bringToTop();

        this.shopText = new Phaser.GameObjects.Text(this,275,200,'SHOP',{fill: '#ffffff'});
        this.shopText.setFontSize(72);
        this.add.existing(this.shopText);
    }
}