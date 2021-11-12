import { Constants } from "/static/src/Constants.js"
// import { pause } from "../menus/pausemenu.js";
import { dataFile } from "../../data.js";

export class level1_2 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl1_2);
    }
    player;
    spikes;
    platforms;
    cursors;
    door1;
    door2;
    button;

    shopFront;
    shopText;

    vid;
    keyF;
    keyA;
    keyW;
    keyD;
    keyS;
    keyESC;
    keyE;

    data;

    inAir;

    init(data){
        this.data = data;
        this.data.level = this.scene;
    }

    preload() {

        this.load.video('background1_2', '/static/src/assets/background_1_2.mp4', 'loadeddata', false, true);
        this.load.image('ground1_2', '/static/src/assets/sand_platform.png');

        //----------------------------------------------------------------------------------------------------------------------------------
        this.load.spritesheet('player_one_walk', '/static/src/assets/assets_2/walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_death', '/static/src/assets/assets_2/death.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_idle_sheet', '/static/src/assets/assets_2/idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_jump', '/static/src/assets/assets_2/jump.png', { frameWidth: 64, frameHeight: 64 });
        //----------------------------------------------------------------------------------------------------------------------------------

        this.load.image('shop', '/static/src/assets/hotel-sign.png');

    }

    create ()
    {

        this.scene.bringToTop();
        console.log("im at level 1-2");
        //for fullscreen
        this.button = this.add.image(800 - 16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

        this.button.on('pointerup', function () {

            if (this.scale.isFullscreen) {
                this.button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else {
                this.button.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);

        this.keyF = this.input.keyboard.addKey('F');

        this.keyF.on('down', function () {

            if (this.scale.isFullscreen) {
                this.button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else {
                this.button.setFrame(1);
                this.scale.startFullscreen();
            }

        }, this);

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyESC.on('up', () => this.pause());
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyE.on('up', () => this.shop());
        this.keyE.enabled = false;

        this.platforms = this.physics.add.staticGroup();
        //spikes = this.physics.add.staticGroup();
       // door1 = this.physics.add.staticGroup();
       this.door1 = this.physics.add.staticGroup();
       this.door2 = this.physics.add.staticGroup();
       this.door1.create(-63, 290, null).setScale(4).refreshBody();
       this.door1.create(-63, 420, null).setScale(4).refreshBody();
       this.door1.create(-63, 550, null).setScale(4).refreshBody();
       this.door2.create(862, 300, null).setScale(4).refreshBody();
       this.door2.create(862, 400, null).setScale(4).refreshBody();
       this.door2.create(862, 500, null).setScale(4).refreshBody();

       this.platforms.create(50, 575, null).setScale(4).refreshBody();
       this.platforms.create(100, 575, null).setScale(4).refreshBody();
       this.platforms.create(200, 575, null).setScale(4).refreshBody();
       this.platforms.create(300, 575, null).setScale(4).refreshBody();
       this.platforms.create(400, 575, null).setScale(4).refreshBody();
        //stairs below
       this.platforms.create(475, 570, null).setScale(4).refreshBody();
       this.platforms.create(480, 565, null).setScale(4).refreshBody();
       this.platforms.create(485, 560, null).setScale(4).refreshBody();
       this.platforms.create(490, 555, null).setScale(4).refreshBody();
       this.platforms.create(495, 550, null).setScale(4).refreshBody();
       this.platforms.create(500, 545, null).setScale(4).refreshBody();
       this.platforms.create(505, 540, null).setScale(4).refreshBody();
       this.platforms.create(510, 535, null).setScale(4).refreshBody();
       this.platforms.create(515, 530, null).setScale(4).refreshBody();
       this.platforms.create(520, 525, null).setScale(4).refreshBody();

       this.platforms.create(530, 520, null).setScale(4).refreshBody();
       this.platforms.create(600, 520, null).setScale(4).refreshBody();
       this.platforms.create(700, 520, null).setScale(4).refreshBody();
       this.platforms.create(800, 520, null).setScale(4).refreshBody();
       this.platforms.create(900, 520, null).setScale(4).refreshBody();
        //platforms to climb higher





        //add shop
        this.shopFront = this.physics.add.image(400, 450, 'shop');
        this.shopFront.body.moves = false;
        this.shopFront.body.setAllowGravity(false);
        this.shopText = new Phaser.GameObjects.Text(this, 350, 400, 'Press E', { fill: '#ffffff' });
        this.shopText.setFontSize(24);
        this.add.existing(this.shopText);
        this.shopFront.depth = 1;
        this.shopText.depth = 1;




        this.vid = this.add.video(400, 300, 'background1_2');
        this.vid.play(true);
        this.vid.setPaused(false);
        // this.vid.depth = -1;

        this.vid.displayWidth = this.sys.canvas.width;
        this.vid.displayHeight = this.sys.canvas.height;


        
        //platforms.create(400, 650, 'ground').setScale(4).refreshBody();

      //  door1.create(100, 450, 'door_1');
     //   door2.create(700, 450, 'door_2');
      //  spikes.create(400, 568, 'spike');
        //test animations here:
        //this.player = this.physics.add.sprite(150, 450, 'player_one_idle').play('player_one_jump');--------------
        //
       // enemy =  this.physics.add.sprite(700, 450, null);
       this.player = this.physics.add.sprite(100, 400, 'player_one_idle');
       this.player.body.offset.x=15;
       this.player.body.offset.y=32;
        //remove this if you want
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_one_idle_sheet', { frames: [0,1,2,3,4,5] }),
            frameRate: 6,
            repeat: -1,

        });
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_one_walk', { frames: [ 0, 1, 2, 3, 4,  5, 6, 7, 8] }),
            frameRate: 9,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_one_walk', { frames: [ 0, 1, 2, 3, 4,  5, 6, 7, 8] }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_one_jump', { frames: [0, 1, 2, 3, 4, 5 ] }),
            frameRate: 6,
            repeat: -1
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('player_one_death', { frames: [0,1,2,3,4,5,6,7,8,9,10,11 ] }),
            frameRate: 15,
        });

        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();


        this.physics.add.collider(this.player, this.platforms);

        //allows player and shop to interact
        this.physics.add.overlap(this.player, this.shopFront);

        // make the camera follow the player
       
      this.player.setScale(2, 2);
      this.physics.add.overlap(this.player, this.door1, this.playerHitdoor1,null, this);
      this.physics.add.overlap(this.player, this.door2, this.playerHitdoor2,null, this);

      // Scene Label Text so user knows what level/scene they are on
      this.level1_2Text = this.add.text( 16,24, 'Level 1_2 Transition Scene', { fontSize: '30px', fill: '#fff' }).setScrollFactor(0);
      this.level1_2Text.setPosition(150, 90);
    }

    gofull() {

        if (game.scale.isFullScreen)
        {
             game.scale.stopFullScreen();
        }
        else
        {
         game.scale.startFullScreen(false);
        }
    }

    update ()
    {
        //NOTE: IF ELSE block to stop player movement while shop scene is active
        if (!this.scene.isActive(Constants.Scenes.shop)) {
            this.keyESC.enabled = true;
            if (this.cursors.left.isDown || this.keyA.isDown) {
                this.player.setVelocityX(-200);
                this.player.anims.play('left', true);
                this.player.flipX = true;

            } else if (this.cursors.right.isDown || this.keyD.isDown) {
                this.player.setVelocityX(200);
                this.player.anims.play('right', true);
                this.player.flipX = false;
            } else{
                this.player.setVelocityX(0);
                this.player.anims.play('idle', true);

            }
            // jump
            if (this.cursors.up.isDown && this.player.body.touching.down || this.keyW.isDown && this.player.body.touching.down) {
                this.player.setVelocityY(-400);
                setTimeout(() => {  this.inAir = true; }, 100);
                this.sound.play(Constants.SFX.jump);
                this.player.anims.play('jump', true);
            }
            // landing sound
            if (this.inAir && this.player.body.touching.down) {
                this.inAir = false;
                this.sound.play(Constants.SFX.land);
            }

            if (this.cursors.down.isDown || this.keyS.isDown) {
                this.player.setVelocityY(170);

            }
        }
        else{
            this.player.setVelocityX(0);
            this.player.anims.play('idle');
            this.keyESC.enabled = false;
        }

        //if the player is on the shop
        if (!this.shopFront.body.touching.none) {
            this.shopText.setVisible(true);
            this.keyE.enabled = true;
            console.log("touching\n");
        } else {
            this.shopText.setVisible(false);
            this.keyE.enabled = false;
        }
    }
    playerHitdoor1() {
        this.scene.start(Constants.Scenes.lvl1,this.data);
    }
    playerHitdoor2() {
        this.scene.start(Constants.Scenes.lvl2,this.data);
    }
    pause() {
        this.scene.launch(Constants.Scenes.pause, this.scene);
        this.scene.pause();
    }
    shop() {
        this.scene.launch(Constants.Scenes.shop, this.data);
    }
    transition() {
        // this.scene.launch(Constants.Scenes.lvl2,this.data);
        // this.scene.stop(Constants.Scenes.lvl1_2,this.scene);
    }
}
