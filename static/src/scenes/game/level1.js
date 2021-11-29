import { Constants } from "/static/src/Constants.js"
// import { pause } from "../menus/pausemenu.js";
import { dataFile } from "../../data.js";

export class level1 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl1);
    }
    player;
    coin;
    door1;
    door2;
    platforms;
    cursors;
    crewels = 0;
    coinCount;
    lifeCount;
    totalCoin = 12;
    spikes;
    zoom;
    inAir;
    invincible;
    spike1; 
    increasingspike1; 
    movingPlatform; 
    jump_count = 0;

    keyW;
    keyA;
    keyS;
    keyD;

    keyESC;
    //testing level transition
    keyP;
    data;
    movingup;
    shieldStatus;

    init(data){
        this.data = data;
        this.invincible = false;
        this.shieldStatus = this.data.shield;
    }

    preload(){
        this.load.image('background1', '/static/src/assets/sand_gw2.png');
        this.load.image('ground1', '/static/src/assets/sand_platform.png');
        this.load.image('coin1', '/static/src/assets/single_coin.png');
        // this.load.image('player_one', '/static/src/assets/spear_player.png');
        //-----------
       this.load.spritesheet('player_one_walk', '/static/src/assets/assets_2/walk.png', { frameWidth: 64, frameHeight: 64 });
       this.load.spritesheet('player_one_death', '/static/src/assets/assets_2/death.png', { frameWidth: 64, frameHeight: 64 });
       this.load.spritesheet('player_one_idle_sheet', '/static/src/assets/assets_2/idle.png', { frameWidth: 64, frameHeight: 64 });
       this.load.spritesheet('player_one_jump', '/static/src/assets/assets_2/jump.png', { frameWidth: 64, frameHeight: 64 });
       //----------------------------------------------------------------------------------------------------------------------

       //--------------------
        this.load.image('spike1', '/static/src/assets/spikes.png');
        this.load.image('shield', '/static/src/assets/assets_2/shield.png');
    }

    create(){

        console.log("im at level 1");
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //testing level transition
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyP.on('up',()=>this.transition());
        

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyESC.on('up',()=>{this.pause();this.sound.play(Constants.SFX.back);});
        

        this.door1 = this.physics.add.staticGroup();
       this.door2 = this.physics.add.staticGroup();
        //delete this line if adding an actual door and not an invisible door
       // door2.create(860, 590, null).setScale(4).refreshBody();
       this.door1.create(-63, 290, null).setScale(4).refreshBody();
       this.door1.create(-63, 420, null).setScale(4).refreshBody();
       this.door1.create(-63, 550, null).setScale(4).refreshBody();

       this.door2.create(862, 300, null).setScale(4).refreshBody();
       this.door2.create(862, 400, null).setScale(4).refreshBody();
       this.door2.create(862, 500, null).setScale(4).refreshBody();
        
        
        this.add.image(400, 300, 'background1');

        this.platforms = this.physics.add.staticGroup();
        this.pillar = this.physics.add.staticGroup();
        // this.spikes = this.physics.add.staticGroup();
        this.spikes = this.physics.add.group();

        this.platforms.create(400, 568, 'ground1').setScale(2).refreshBody();

        this.platforms.create(150, 300, 'ground1').setScale(0.5).refreshBody();
        this.platforms.create(400, 230, 'ground1').setScale(0.5).refreshBody();
        // this.platforms.create(100, 400, 'ground1');
        this.platforms.create(700, 450, 'ground1');
        // this.platforms.create(550, 150, 'ground1');
        this.platforms.create(25, 125, 'ground1');

        this.movingPlatform = this.physics.add.image(550, 150, 'ground1'); 
        this.movingPlatformHorizontal = this.physics.add.image(100, 400, 'ground1'); 


        this.movingPlatform.setImmovable(true); 
        this.movingPlatform.body.allowGravity = false; 
        this.movingPlatformHorizontal.setImmovable(true); 
        this.movingPlatformHorizontal.body.allowGravity = false; 

        // this.spikes.create(400, 500, 'spike1');
        this.spike1 = this.spikes.create(450, 500, 'spike1').body.setAllowGravity(false);

        this.player = this.physics.add.sprite(100, 450, 'player_one_idle');
        //TRYING TO CHANGE PLAYER HITBOX WITH CODE BELOW
        this.player.body.offset.x=15;
        this.player.body.offset.y=32;

        // add shield to scene (if purchased)
        if (this.shieldStatus === 1) {
            this.shield = this.physics.add.image(100, 460, 'shield');
            this.shield.body.moves = false;
            this.shield.body.setAllowGravity(false);
            this.shield.setAlpha(0.5);
        }


       // this.player.setSize(12,12, false);
      //  this.time.addEvent({delay: 100, callback: this.delayDone, callbackScope: this, loop: false});
       // this.player.setScale(1);
       // this.player.body.setSize(this.player.width,this.player.height,true);
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

        this.coin = this.physics.add.group({
            key: 'coin1',
            repeat: this.totalCoin-1,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.coin.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

    });

        this.coinCount = this.add.text( 16,16, 'crewels:'+this.data.crewels, { fontSize: '12px', fill: '#000' }).setScrollFactor(0);
        this.level1Text = this.add.text( 16,24, 'Level 1', { fontSize: '12px', fill: '#000' }).setScrollFactor(0);
        this.lifeCount = this.add.text(16, 32, 'lives: ' + this.data.lives, { fontSize: '12px', fill: '#000' }).setScrollFactor(0);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.coin, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatform);
        this.physics.add.collider(this.player, this.movingPlatformHorizontal);


        //this.physics.add.collider(this.spikes,this.platforms);

        this.physics.add.overlap(this.player, this.coin, this.collectcoin, null, this);

        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.5);
        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null,this)
        this.increasingspike1 = false; 
        this.coinCount.setPosition(150, 100);
        this.level1Text.setPosition(150, 120);
        this.lifeCount.setPosition(150, 140);

        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.door1, this.playerHitdoor1,null, this);
        this.physics.add.overlap(this.player, this.door2, this.playerHitdoor2,null, this);
    }
 //  delayDone(){
       // this.player.body.setSize(this.player.width/2,this.player.height/1,true);
  //     this.player.body.setSize(64/2,32,true);
   // }

    update(){
      //  this.coinCount.setPosition(300, 300);
        if (this.movingPlatform.y <= 150) { 
            this.movingPlatform.setVelocityY(10) 
        }  
        if (this.movingPlatform.y >= 200) { 
            this.movingPlatform.setVelocityY(-10);
        }

        if (this.movingPlatformHorizontal.x <= 100) { 
            this.movingPlatformHorizontal.setVelocityX(10) 
        }  
        if (this.movingPlatformHorizontal.x >= 200) { 
            this.movingPlatformHorizontal.setVelocityX(-10);
        }

        if (this.spike1.y <= 200) { 
            this.increasingspike1 = true ;

        } 
        if (this.spike1.y >= 500) { 
            this.increasingspike1 = false ;
            console.log("test");
        }
        if (this.increasingspike1 == true) { 
            this.spike1.y += 2;
        } else { 
            this.spike1.y -= 2;
        }

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
        const isJumpJustDownc =  Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const isJumpJustDownw = Phaser.Input.Keyboard.JustDown(this.keyW);
        // jump
        if (this.cursors.up.isDown && this.player.body.touching.down || this.keyW.isDown && this.player.body.touching.down)
        {
            //Phaser.Input.Keyboard.JustDown(this.cursors.up)
            //this.player.body.onFloor()
            //this.player.body.touching.down
            this.player.setVelocityY(-400);
            setTimeout(() => {  this.inAir = true; }, 100);
            this.sound.play(Constants.SFX.jump);
            this.player.anims.play('jump',true);
            this.jump_count = 1;
        }
        // for double jump
        if((isJumpJustDownc && (!this.player.body.touching.down && this.jump_count < 2)) || isJumpJustDownw && (!this.player.body.touching.down && this.jump_count < 2)){
            this.doublejump_enabled();
        }
        // reset jump counter
        if(this.player.body.touching.down){
            this.jump_count = 0;
        }
        // landing sound
        if (this.inAir && this.player.body.touching.down) {
            this.inAir = false;
            this.sound.play(Constants.SFX.land);
            
         
          // this.player.anims.play('jump', this.player)
        }
        if (this.cursors.down.isDown || this.keyS.isDown) //if
        {
            this.player.setVelocityY(170);
        }
    
        // if(this.keyESC.isDown){
        //     this.scene.pause();
        //     this.scene.launch(Constants.Scenes.pause);
        // }
        if(this.crewels==this.totalCoin){
            // this.scene.pause();
            // this.scene.launch(Constants.Scenes.nameInput, this.scene);
            // console.log(this.scene.key)
            // this.scene.start(Constants.Scenes.endgame, [this.crewels, this.scene]);
        }

        // update shield position
        if (this.shieldStatus === 1) {
            this.shield.x = this.player.x;
            this.shield.y = this.player.y + 17;
        }
    }

    playerHitSpike(){
        if (!this.invincible) {

            // set invincibility frame
            this.invincible = true;
            setTimeout(() => {  this.invincible = false; }, 750);

            // if shield is available
            if (this.shieldStatus === 1) {
                // disable shield
                this.shieldStatus = 0;
                this.shield.setAlpha(0);

                // shield recovers after 8 seconds
                setTimeout(() => {  this.shieldStatus = 1; this.shield.setAlpha(0.5);}, 5000);

            // otherwise, player takes damage
            } else {
                // update player lives
                this.data.lives -= 1;
                this.lifeCount.setText('lives: ' + this.data.lives);

                // play take damage sound
                this.sound.play(Constants.SFX.damage);

                // go to graveyard scene if lives hit zero
                if (this.data.lives === 0) {
                    this.scene.start(Constants.Scenes.nameInput, [this.data.crewels, this.scene]);
                }
            }
        }
    }
    playerHitdoor1()
    {
        this.scene.start(Constants.Scenes.lvl4,this.data);
        //this.scene.launch(Constants.Scenes.lvl4,this.scene);
        //this.scene.stop(Constants.Scenes.lvl1,this.scene);
    }
    playerHitdoor2()
    {
        this.scene.start(Constants.Scenes.lvl1_2,this.data);
        //this.scene.launch(Constants.Scenes.lvl1_2,this.scene);
        //this.scene.stop(Constants.Scenes.lvl1,this.scene);
    }
    doublejump_enabled(){
        if(this.data.doubleJump > 0){
            this.player.setVelocityY(-400);
            setTimeout(() => {  this.inAir = true; }, 100);
            this.sound.play(Constants.SFX.jump);
            this.player.anims.play('jump',true);
            this.jump_count = 2;
            //this.data.doubleJump -= 1;
        }
    }
    collectcoin (player, coin){
        coin.disableBody(true, true);

        // this.crewels += 1;
        
        this.data.crewels += 1;
        this.coinCount.setText('crewels: ' + this.data.crewels);
        console.log(this.data.crewels);
        // play coin collection sound
        this.sound.play(Constants.SFX.coin);
    }

    pause(){
        this.scene.launch(Constants.Scenes.pause,this.scene);
        // console.log(this.scene);
        this.scene.pause();
    }
    transition(){
        //this.scene.launch(Constants.Scenes.lvl1_2,this.scene);
        //this.scene.stop(Constants.Scenes.lvl1,this.scene);
        
    }
}