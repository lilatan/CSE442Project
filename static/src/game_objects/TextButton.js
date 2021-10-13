export class TextButton extends Phaser.GameObjects.Text {

    
    constructor(scene, x, y, text, style, hoverStyle, funct){
        super(scene, x,y,text,style);
        this.hoverStyle = hoverStyle;
        this.setIntereactive({useHandCursor: true})
        .on('pointerover', ()=>this.hover())
        .on('pointerup', ()=>funct());
    }
    hover(){
        this.setStyle = this.hoverStyle;
    }
}