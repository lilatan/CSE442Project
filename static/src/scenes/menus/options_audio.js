import { Constants } from "/static/src/Constants.js";
import { TextButton } from "/static/src/game_objects/TextButton.js";

export class audioMenu extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.audio);
    }
    musicPieces = [
        Constants.BGM.default,
        Constants.BGM.rosemoon,
        Constants.BGM.sanctuary,
        Constants.BGM. nostalgia,
        Constants.BGM.remotest,
        Constants.BGM.wanderers
    ]
    flag = 0
    create(){
        this.scene.bringToTop();

        // Create buttons for volume
        this.muteButton = new TextButton(this, 300, 50, "MUTE SOUND", {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.muteSound());
        this.plusButton = new TextButton(this, 550, 100, "+", {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.increaseVolume());
        this.minusButton = new TextButton(this, 300, 100, "-", {fill: '#ffffff'}, {fill: '#888888'}, 48, ()=>this.decreaseVolume());

        // Create buttons for music selection
        this.musicA_Button = new TextButton(this, 300, 150, this.musicPieces[0], {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=>this.selectMusic(0, 150));
        this.musicB_Button = new TextButton(this, 300, 200, this.musicPieces[1], {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=>this.selectMusic(1, 200));
        this.musicC_Button = new TextButton(this, 300, 250, this.musicPieces[2], {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=>this.selectMusic(2, 250));
        this.musicD_Button = new TextButton(this, 300, 300, this.musicPieces[3], {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=>this.selectMusic(3, 300));
        this.musicE_Button = new TextButton(this, 300, 350, this.musicPieces[4], {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=>this.selectMusic(4, 350));
        this.musicF_Button = new TextButton(this, 300, 400, this.musicPieces[5], {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=>this.selectMusic(5, 400));


        // Create indicators
        this.muteMark = new Phaser.GameObjects.Text(this, 250, 50, '✓', {fill: '#ffffff'});
        this.muteMark.setFontSize(48);
        this.volumeText = new Phaser.GameObjects.Text(this, 410, 100, this.game.config.audio.volume, {fill: '#ffffff'});
        this.volumeText.setFontSize(48);
        this.musicMark = new Phaser.GameObjects.Text(this, 250, 100, '✓', {fill: '#ffffff'});
        this.musicMark.setFontSize(48);


        // Add buttons to scene
        this.menuButton = new TextButton(this, 25, 550, 'BACK', {fill: '#ffffff'}, {fill: '#888888'}, 48,
            ()=> {this.scene.start(Constants.Scenes.options); this.sound.play(Constants.SFX.back)});
        this.add.existing(this.menuButton);
        this.add.existing(this.muteButton);
        this.add.existing(this.plusButton);
        this.add.existing(this.minusButton);
        this.add.existing(this.musicA_Button);
        this.add.existing(this.musicB_Button);
        this.add.existing(this.musicC_Button);
        this.add.existing(this.musicD_Button);
        this.add.existing(this.musicE_Button);
        this.add.existing(this.musicF_Button);

        // Add indicators to scene
        this.add.existing(this.muteMark);
        this.add.existing(this.volumeText);
        this.add.existing(this.musicMark)

        // Update sound indicator if mute
        if(!this.sound.mute){
            this.muteMark.setVisible(false);
        }else{
            this.muteMark.setVisible(true);
        }

        // Update current music marker
        const y = this.musicPieces.indexOf(this.game.config.audio.music);
        this.musicMark.setY(150 + 50 * y);
    }

    // Mute/unmute function
    muteSound(){
        if(!this.sound.mute){
            this.sound.setMute(true);
            this.muteMark.setVisible(true);
        }else{
            this.sound.setMute(false);
            this.muteMark.setVisible(false);
        }

        // add sfx for pressing button
        this.sound.play(Constants.SFX.menu);

        // console.log(this.sound.key + "  " + this.sound.isPlaying);
    }

    increaseVolume(){
        var volume = this.game.config.audio.volume + 5;
        if (volume > 100){
            volume = 100;
        }
        this.game.config.audio.volume = volume;
        this.sound.setVolume(volume / 100);
        this.volumeText.setText(volume);

        // add sfx for pressing button
        this.sound.play(Constants.SFX.menu);

        console.log("Volume is set to: " + volume);
    }

    decreaseVolume(){
        var volume = this.game.config.audio.volume - 5;
        if (volume < 0){
            volume = 0;
        }
        this.game.config.audio.volume = volume;
        this.sound.setVolume(volume / 100);
        this.volumeText.setText(volume);

        // add sfx for pressing button
        this.sound.play(Constants.SFX.menu);

        console.log("Volume is set to: " + volume);
    }

    selectMusic(musicIndex, y_coord){
        // Stop all sounds
        this.game.sound.removeAll();

        // Set selected song title
        const next = this.musicPieces[musicIndex]
        this.game.config.audio.music = next;

        // Start selected song
        this.music = this.sound.add(next);
        this.music.loop = true;
        this.music.play();

        // Update checkmark to indicate current song
        this.musicMark.setY(y_coord)

        // add sfx for pressing button
        this.sound.play(Constants.SFX.menu);

        console.log("Music is set to: " + next);
    }

}