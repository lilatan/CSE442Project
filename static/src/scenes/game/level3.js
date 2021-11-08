import { Constants } from "/static/src/Constants.js"
// import { pause } from "../menus/pausemenu.js";
export class level3 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl3);
    }
    player;
    bigboy_enemy;
    bigboy_speed = 100;
    watcher_enemy;
    flying_enemy;
    coin;
    door1;
    door2;
    platforms;
    cursors;
    crewels = 0;
    coinCount;
    totalCoin = 12;
    spikes;
    zoom;

    keyW;
    keyA;
    keyS;
    keyD;

    keyESC;
    //testing level transition
    keyP;

    data;


    init(data){
        this.data = data;
    }

    preload(){
        this.load.image('background3', '/static/src/assets/cyber_city_lvl2.png');
        this.load.image('ground3', '/static/src/assets/cyberpunk_platform.png');
        this.load.image('coin3', '/static/src/assets/single_coin.png');
        //this.load.image('player_one', '/static/src/assets/spear_player.png');
        this.load.image('spike3', '/static/src/assets/spikes.png');
         //----PLAYER SPRITE SHEET ---------
        this.load.spritesheet('player_one_walk', '/static/src/assets/assets_2/walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_death', '/static/src/assets/assets_2/death.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_idle_sheet', '/static/src/assets/assets_2/idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_jump', '/static/src/assets/assets_2/jump.png', { frameWidth: 64, frameHeight: 64 });
        //---PLAYER SPRITE SHEET--------
        //---BIG BOY SPRITE SHEET-----
        this.load.spritesheet('big_boy_walk', '/static/src/assets/assets_2/walk_bigboy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('big_boy_attack', '/static/src/assets/assets_2/attack_bigboy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('big_boy_idle', '/static/src/assets/assets_2/idle_bigboy.png', { frameWidth: 64, frameHeight: 64 });
        //---BIG BOY SPRITE SHEET----
        
      
        //----WATCHER SPRITE SHEET-----
        this.load.spritesheet('watcher_attack', '/static/src/assets/assets_2/attack_watcher.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('watcher_idle', '/static/src/assets/assets_2/idle_watcher.png', { frameWidth: 64, frameHeight: 64 });
        //this.load.spritesheet('watcher_walk', '/static/src/assets/assets_2/walk_watcher.png', { frameWidth: 64, frameHeight: 64 });
        //----WATCHER SPRITE SHEET

        //-------FLYING ALIEN SPRITE SHEET----------------------------
       // this.load.image('flying_idle', '/static/src/assets/assets_2/flying_idle.png');
        this.load.spritesheet('flying_walk', '/static/src/assets/assets_2/flying_alien.png', { frameWidth: 64, frameHeight: 64 });

        //-----------FLYING ALIEN SPRITE SHEET--------------------------
    }

    create(){

        
        console.log("im at level 3");
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //testing level transition
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyP.on('up',()=>this.transition());
        

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyESC.on('up',()=>this.pause());
        
        this.door1 = this.physics.add.staticGroup();
        this.door2 = this.physics.add.staticGroup();
        this.door1.create(-63, 290, null).setScale(4).refreshBody();
        this.door1.create(-63, 420, null).setScale(4).refreshBody();
        this.door1.create(-63, 550, null).setScale(4).refreshBody();
        this.door2.create(862, 300, null).setScale(4).refreshBody();
        this.door2.create(862, 400, null).setScale(4).refreshBody();
        this.door2.create(862, 500, null).setScale(4).refreshBody();

        this.add.image(400, 300, 'background3');

        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();

        this.platforms.create(200, 600, 'ground3').setScale(1).refreshBody();
        this.platforms.create(400, 600, 'ground3').setScale(1).refreshBody();
        this.platforms.create(600, 600, 'ground3').setScale(1).refreshBody();

        this.spikes.create(300, 300, 'spike3');

        //--- PLAYER CODE BELOW----------
        this.player = this.physics.add.sprite(100, 450, 'player_one_idle');
        this.player.body.offset.x=15;
        this.player.body.offset.y=32;
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

        //----PLAYER CODE ABOVE-----
        //----BIG BOY CODE BELOW-----
        this.bigboy_enemy = this.physics.add.sprite(500, 400, 'big_boy_idle');
        this.bigboy_enemy.setSize(37,50,false);
        this.bigboy_enemy.body.offset.x=15;
        this.bigboy_enemy.body.offset.y=15;
        this.bigboy_enemy.setVelocityX(100);
        //this.time.addEvent({delay: 100, callback: this.bigboy_ATTACK, callbackScope: this, loop: true});
        this.anims.create({
            key: 'idle_boy',
            frames: this.anims.generateFrameNumbers('big_boy_idle', { frames: [0,1,2,3,4,5] }),
            frameRate: 6,
            repeat: -1,
            
        });
        this.anims.create({
            key: 'left_boy',
            frames: this.anims.generateFrameNumbers('big_boy_walk', { frames: [ 0, 1, 2, 3, 4,  5, 6] }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'right_boy',
            frames: this.anims.generateFrameNumbers('big_boy_walk', { frames: [ 0, 1, 2, 3, 4,  5, 6] }),
            frameRate: 7,
            repeat: -1
        });
        this.anims.create({
            key: 'attack_boy',
            frames: this.anims.generateFrameNumbers('big_boy_attack', { frames: [ 0, 1, 2, 3, 4,  5, 6, 7, 8, 9] }),
            frameRate: 10,
            repeat: -1
        });
        this.bigboy_enemy.setBounce(0.1);
        this.bigboy_enemy.setCollideWorldBounds(true);
        this.bigboy_enemy.setScale(1.5,1.5);
        //this.bigboy_enemy.velocity.x = 100; //doesn't work
        //--------------------------BIG BOY CODE ABOVE-----------------------------------


        //-----------------WATCHER CODE BELOW-----------------------------------------------
       // this.watcher_enemy = this.physics.add.sprite(500, 300, 'watcher_idle');
      //  this.watcher_enemy.setGravity(0,-700);
      //  this.watcher_enemy.setSize(19,19,false);
      //  this.watcher_enemy.body.offset.x=15;
      //  this.watcher_enemy.body.offset.y=22;
     //   this.anims.create({
     //       key: 'attack_watcher',
     //       frames: this.anims.generateFrameNumbers('watcher_attack', { frames: [0, 1, 2, 3, 4, 5 ,6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] }),
     //       frameRate: 17,
     //       repeat: -1, 
     //   });
     //   this.watcher_enemy.setScale(1.5,1.5);
     //   this.watcher_enemy.setCollideWorldBounds(true);
        //-----------------WATCHER CODE ABOVE-----------------------------------------------

        //---------------------------FLYING ALIEN CODE BELOW------------------------
        this.flying_enemy = this.physics.add.sprite(500, 300, 'flying_walk');
        this.flying_enemy.setGravity(0,-700);
        this.flying_enemy.setSize(33,33,false);
        this.flying_enemy.body.offset.x=15;
        this.flying_enemy.body.offset.y=22;
        this.anims.create({
            key: 'flying',
            frames: this.anims.generateFrameNumbers('flying_walk', { frames: [0, 1, 2, 3] }),
            frameRate: 8,
            repeat: -1, 
        });
        this.flying_enemy.setScale(1,1);
        this.flying_enemy.setCollideWorldBounds(true);

        //---------------------------FLYING ALIEN CODE ABOVE

        this.cursors = this.input.keyboard.createCursorKeys();

        this.coin = this.physics.add.group({
            key: 'coin3',
            repeat: 1,//this.totalCoin-1,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.coin.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });

        this.coinCount = this.add.text(16, 16, 'crewels:'+this.data.crewels, { fontSize: '12px', fill: '#000' });

        this.crewels = 0;
        //----COLLIDER CODE----
        this.physics.add.collider(this.bigboy_enemy, this.platforms);
        this.physics.add.collider(this.player, this.platforms);
       // this.physics.add.collider(this.player, this.watcher_enemy);
        this.physics.add.collider(this.player, this.flying_enemy);
        this.physics.add.collider(this.bigboy_enemy, this.player);
        this.physics.add.collider(this.coin, this.platforms);

        this.physics.add.overlap(this.player, this.coin, this.collectcoin, null, this);

      // this.cameras.main.setBounds(0, 0, 800, 600);
      // this.cameras.main.startFollow(this.player);
     // this.cameras.main.setZoom(2);
       
        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.door1, this.playerHitdoor1,null, this);
        this.physics.add.overlap(this.player, this.door2, this.playerHitdoor2,null, this);

    }
    

    update(){

    //-----------------PLAYER ANIMATION BELOW-------------------------------------------------
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
            this.player.setVelocityY(-400);
            this.player.anims.play('jump',true);
        }
        if (this.cursors.down.isDown || this.keyS.isDown) //if
        {
            this.player.setVelocityY(170); 
        }  
    //-----------------PLAYER ANIMATION ABOVE------------------------------------------------------------

    //-----------------BIG BOY ANIMATION BELOW-----------------------------------------------------------
    // if(this.bigboy_enemy.body.velocity.x > 0 && this.bigboy_enemy.x < 300 || this.bigboy_enemy.body.velocity.x < 0 && this.bigboy_enemy.x > 700){
    //       this.bigboy_speed *= -1;
    //   }
    //  if(this.bigboy_enemy.x = 500){
    // this.bigboy_enemy.setVelocityX(100);  
    //  }
       if(this.bigboy_enemy.x < 350)
        {
            this.bigboy_enemy.setVelocityX(100);
            this.bigboy_enemy.anims.play('left_boy', true);
            this.bigboy_enemy.flipX = false;
        }
       if(this.bigboy_enemy.x > 750)
        {
            this.bigboy_enemy.setVelocityX(-100);
            this.bigboy_enemy.anims.play('right_boy', true);
            this.bigboy_enemy.flipX = true;

        }
        //if(this.bigboy_enemy.x > 650 || this.bigboy_enemy.x < 649)
       // {
          //this.bigboy_enemy.setVelocityX(0);
        //  this.bigboy_enemy.anims.play('attack_boy', true);
       // }
    //-------------------BIG BOY ANIMATION ABOVE ------------------------------------------------------------

    //-------WATCHER ANIMATION BELOW-------
      //  this.physics.accelerateToObject(this.watcher_enemy, this.player);
     //   if(this.watcher_enemy.x > this.player.x){
     //       this.watcher_enemy.anims.play('flyng', true);
     //       this.watcher_enemy.flipX = false;
     //   }
     //   if(this.watcher_enemy.x < this.player.x){
     //       this.watcher_enemy.anims.play('flyng', true);
     //       this.watcher_enemy.flipX = true;
     //   }
    //---------WATCHER ANIMATION ABOVE------
    //-------FLYING ALIEN ANIMATION BELOW
    this.physics.accelerateToObject(this.flying_enemy, this.player);
    if(this.flying_enemy.x > this.player.x){
        this.flying_enemy.anims.play('flying', true);
        this.flying_enemy.flipX = false;
    }
    if(this.flying_enemy.x < this.player.x){
        this.flying_enemy.anims.play('flying', true);
        this.flying_enemy.flipX = true;
    }
    //-------FLYING ALIEN ANIMATION ABOVE







        this.coinCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-60);
        // if(this.keyESC.isDown){
        //     this.scene.pause();
        //     this.scene.launch(Constants.Scenes.pause);
        // }
        // if(this.crewels==this.totalCoin){
        //     // this.scene.pause();
        //     // this.scene.launch(Constants.Scenes.nameInput, this.scene);
        //     console.log(this.scene.key)
        //     this.scene.start(Constants.Scenes.nameInput, [this.crewels, this.scene]);
        // }
    }

    playerHitdoor1()
    {
        this.scene.stop(Constants.Scenes.lvl3,this.scene);
        this.scene.launch(Constants.Scenes.lvl2_3,this.data)
    }
    playerHitdoor2()
    {
        this.scene.stop(Constants.Scenes.lvl3, this.scene);
        this.scene.launch(Constants.Scenes.lv3_4,this.data)
    }
    playerHitSpike(){
        this.scene.start(Constants.Scenes.nameInput, [this.data.crewels, this.scene]);
    }

    collectcoin (player, coin){
        coin.disableBody(true, true);
        this.data.crewels += 1;
        this.coinCount.setText('crewels: ' + this.data.crewels);
    }

    pause(){
        this.scene.launch(Constants.Scenes.pause,this.scene);
        // console.log(this.scene);
        this.scene.pause();
    }
    transition(){
        this.scene.launch(Constants.Scenes.lvl3_4,this.data)
        this.scene.stop(Constants.Scenes.lvl3,this.scene);
    }
}