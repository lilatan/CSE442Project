export class TextButton extends Phaser.GameObjects.Text {

    
    constructor(scene, x, y, text, style, hoverStyle, size, funct){
        super(scene, x,y,text,style);
        this.hoverStyle = hoverStyle;
        this.normStyle = style;
        this.setInteractive({useHandCursor: true})
        .on('pointerover', ()=>this.hover())
        .on('pointerout', ()=>this.nohover())
        .on('pointerup', ()=>funct());
        this.setFontSize(size);
    }
    hover(){
        this.setStyle(this.hoverStyle);
    }
    nohover(){
        this.setStyle(this.normStyle);
    }
}