export class TextButton extends Phaser.GameObjects.Text {

    
    constructor(scene, x, y, text, style, hoverStyle, size, funct){
        super(scene, x,y,text,style);
        this.hoverStyle = hoverStyle;
        this.setInteractive({useHandCursor: true})
        .on('pointerover', ()=>this.hover())
        .on('pointerup', ()=>funct());
        this.setFontSize(size);
        // this.setDepth(1);
    }
    hover(){
        this.setStyle = this.hoverStyle;
    }
}