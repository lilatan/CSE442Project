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
    //testing level transition
    keyP;


    preload ()
    {

        this.load.video('background1_2', '/static/src/assets/background_1_2.mp4', 'loadeddata', false, true);
        this.load.image('ground1_2', '/static/src/assets/sand_platform.png');

        //----------------------------------------------------------------------------------------------------------------------------------
        this.load.spritesheet('player_one_walk', '/static/src/assets/assets_2/walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_death', '/static/src/assets/assets_2/death.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_idle_sheet', '/static/src/assets/assets_2/idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_jump', '/static/src/assets/assets_2/jump.png', { frameWidth: 64, frameHeight: 64 });
        //----------------------------------------------------------------------------------------------------------------------------------
        
    }

    create ()
    {
//--------------------
        this.scene.bringToTop();
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

        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyP.on('up',()=>this.transition());
        
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

        



        this.vid = this.add.video(400, 300, 'background1_2');
        this.vid.play(true);
        this.vid.setPaused(false);

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
      //remove this if you want

    //    enemy.setCollideWorldBounds(true);
    this.player.setBounce(0.1);
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

     
  //      this.physics.add.collider(enemy, platforms);
        this.physics.add.collider(this.player, this.platforms);

        // make the camera follow the player
       
      // this.physics.add.overlap(player, door2,)
      this.player.setScale(2, 2);
      this.physics.add.overlap(this.player, this.door1, this.playerHitdoor1,null, this);
      this.physics.add.overlap(this.player, this.door2, this.playerHitdoor2,null, this);
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
            this.player.flipX = true;
         
        }
        else if (this.cursors.right.isDown || this.keyD.isDown)
        {
            this.player.setVelocityX(200);
            this.player.anims.play('right', true);
            this.player.flipX = false;
         
          //  player.scale.setTo(-1,1);
        }
        else //else
        {
            this.player.setVelocityX(0); 
            this.player.anims.play('idle',true);
         
        }
        if (this.cursors.up.isDown && this.player.body.touching.down || this.keyW.isDown && this.player.body.touching.down) //if
        {
            //Phaser.Input.Keyboard.JustDown(this.cursors.up)
            //this.player.body.onFloor()
            //this.player.body.touching.down
            this.player.setVelocityY(-400);
            this.player.anims.play('jump',true);
         
          // this.player.anims.play('jump', this.player)
        }
        if (this.cursors.down.isDown || this.keyS.isDown) //if
        {
            this.player.setVelocityY(170);
           // this.player.anims.play('jump',true);
         
        }  
    }
    playerHitdoor1()
    {
        this.scene.start(Constants.Scenes.lvl1);
    }
    playerHitdoor2()
    {
        this.scene.start(Constants.Scenes.lvl2);
    }
    pause(){
        this.scene.launch(Constants.Scenes.pause,this.scene);
        // console.log(this.scene);
        this.scene.pause();
    }
    transition(){
        this.scene.launch(Constants.Scenes.lvl2,this.scene);
        this.scene.stop(Constants.Scenes.lvl1_2,this.scene);
    }
}

