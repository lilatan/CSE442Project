import { Constants } from "/static/src/Constants.js"
// import { pause } from "../menus/pausemenu.js";
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
    
    vid;
    keyF;
    keyA;
    keyW;
    keyD;
    keyS;
    keyESC;

    keyE;

    preload ()
    {

        this.load.video('background', '/static/src/assets/city-lights.mp4', 'loadeddata', false, true);
       // this.load.video('background', 'assets2/zelda-background1.mp4', 'loadeddata', false, false);

        //this.load.image('background', 'assets1/sand_gw2.png');
      // this.load.image('door_1', 'assets2/door1.png');
      //  this.load.image('door_2', 'assets2/door2.png');
        this.load.image('ground', '/static/src/assets/sand_platform.png');
      //  this.load.image('player_one', 'assets2/spear_player.png');
     // this.load.spritesheet('dude', 'assets2/dude.png', { frameWidth: 32, frameHeight: 48 });
        //this.load.image('spike', 'assets2/spikes.png');

        //----------------------------------------------------------------------------------------------------------------------------------
        this.load.spritesheet('player_one', '/static/src/assets/brawler.png', { frameWidth: 48, frameHeight: 48 });
        //----------------------------------------------------------------------------------------------------------------------------------
        
    }

    create ()
    {
        console.log("im at level 1-2");
        //for fullscreen
        this.button = this.add.image(800-16, 16, 'fullscreen', 0).setOrigin(1, 0).setInteractive();

        this.button.on('pointerup', function () {

            if (this.scale.isFullscreen)
            {
                this.button.setFrame(0);

                this.scale.stopFullscreen();
            }
            else
            {
                this.button.setFrame(1);

                this.scale.startFullscreen();
            }

        }, this);

        this.keyF = this.input.keyboard.addKey('F');

        this.keyF.on('down', function () {

            if (this.scale.isFullscreen)
            {
                this.button.setFrame(0);
                this.scale.stopFullscreen();
            }
            else
            {
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
        this.keyESC.on('up',()=>this.pause());
        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyE.on('up', ()=>this.shop());

        this.platforms = this.physics.add.staticGroup();
        //spikes = this.physics.add.staticGroup();
       // door1 = this.physics.add.staticGroup();
       this.door2 = this.physics.add.staticGroup();
        //delete this line if adding an actual door and not an invisible door
       // door2.create(860, 590, null).setScale(4).refreshBody();
       this.door2.create(862, 300, null).setScale(4).refreshBody();

       this.platforms.create(50, 600, null).setScale(4).refreshBody();
       this.platforms.create(100, 600, null).setScale(4).refreshBody();
       this.platforms.create(200, 600, null).setScale(4).refreshBody();
       this.platforms.create(300, 600, null).setScale(4).refreshBody();
       this.platforms.create(400, 600, null).setScale(4).refreshBody();
       this.platforms.create(500, 600, null).setScale(4).refreshBody();
       this.platforms.create(600, 600, null).setScale(4).refreshBody();
       this.platforms.create(700, 600, null).setScale(4).refreshBody();
       this.platforms.create(800, 600, null).setScale(4).refreshBody();
       this.platforms.create(900, 600, null).setScale(4).refreshBody();
        //platforms to climb higher

        this.platforms.create(25, 500, null).setScale(1).refreshBody();
        this.platforms.create(100, 400, null).setScale(1).refreshBody();
        this.platforms.create(25, 300, null).setScale(1).refreshBody();
        this.platforms.create(150, 300, null).setScale(1).refreshBody();
        this.platforms.create(200, 300, null).setScale(1).refreshBody();
        this.platforms.create(250, 300, null).setScale(1).refreshBody();
        this.platforms.create(300, 300, null).setScale(1).refreshBody();
        this.platforms.create(350, 300, null).setScale(1).refreshBody();
        this.platforms.create(400, 300, null).setScale(1).refreshBody();
        this.platforms.create(450, 300, null).setScale(1).refreshBody();
        this.platforms.create(500, 300, null).setScale(1).refreshBody();
        this.platforms.create(550, 300, null).setScale(1).refreshBody();
        this.platforms.create(600, 300, null).setScale(1).refreshBody();
        this.platforms.create(650, 300, null).setScale(1).refreshBody();
        this.platforms.create(700, 300, null).setScale(1).refreshBody();



        this.vid = this.add.video(400, 300, 'background');
        this.vid.play(true);
        this.vid.setPaused(false);

        
        
        //platforms.create(400, 650, 'ground').setScale(4).refreshBody();

      //  door1.create(100, 450, 'door_1');
     //   door2.create(700, 450, 'door_2');
      //  spikes.create(400, 568, 'spike');

       // enemy =  this.physics.add.sprite(700, 450, null);
       this.player = this.physics.add.sprite(100, 450, 'player_one');
        //remove this if you want
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('player_one', { frames: [ 0, 1, 2, 3 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('player_one', { frames: [ 0, 1, 2, 3 ] }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('player_one', { frames: [ 5, 6, 7, 8 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNumbers('player_one', { frames: [ 20, 21, 22, 23 ] }),
            frameRate: 8,
            repeat: -1
        });
        this.anims.create({
            key: 'die',
            frames: this.anims.generateFrameNumbers('player_one', { frames: [ 35, 36, 37 ] }),
            frameRate: 8,
        });
      //remove this if you want

    //    enemy.setCollideWorldBounds(true);
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

     
  //      this.physics.add.collider(enemy, platforms);
        this.physics.add.collider(this.player, this.platforms);

        // make the camera follow the player
       
      // this.physics.add.overlap(player, door2,)
      this.player.setScale(1.5, 1.5);
    }
    //Attempting to reset player
    playerHitDoor(player, door2){
       // player.anims.play('die', true);
        //this.physics.world.wrap(player, 100)
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
    //    if (player.body.touching.down || enemy.body.blocked.up){
   //         player.anims.play('die', true);
    //    }
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.player.setVelocityX(-200);
            this.player.anims.play('left', true);
            this.player.flipX = false;
         
        }
        else if (this.cursors.right.isDown || this.keyD.isDown)
        {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
            this.player.flipX = true;
          //  player.scale.setTo(-1,1);
        }
        else
        {
            this.player.setVelocityX(0); 
            this.player.anims.play('idle');
        }
        if (this.cursors.up.isDown && this.player.body.touching.down || this.keyW.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-400);
            this.player.anims.play('jump');
        }
        if (this.cursors.down.isDown || this.keyS.isDown)
        {
            this.player.setVelocityY(170);
        }
         
    }
    pause(){
        this.scene.launch(Constants.Scenes.pause,this.scene);
        // console.log(this.scene);
        this.scene.pause();
    }
    shop(){
        this.scene.launch(Constants.Scenes.shop, this.scene);
        this.scene.shop();
    }
}
