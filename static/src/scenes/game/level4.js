import { Constants } from "/static/src/Constants.js"
// import { pause } from "../menus/pausemenu.js";
export class level4 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl4);
    }
    player;
    coin;
    platforms;
    cursors;
    //door1;
    door2;
    crewels = 0;
    coinCount;
    lifeCount;
    totalCoin = 12;
    spikes;
    spike;
    increasingspike;
    zoom;
    jump_count = 0;
    vid;
    boss;
    boss_claw1;
    boss_claw2;
    boss_claw3;
    genie;
    target;
    fireball;
    check_if_present1 = false;
    check_if_present2 = false;

    keyW;
    keyA;
    keyS;
    keyD;
    keyE;

    keyESC;
    //testing level transition
    keyP;

    data;
    bossHealth;

    inAir;
    invincible;
    shieldStatus;

    init(data){
        this.data = data;
        this.data.currentLevel = this.scene;
        this.invincible = false;
        this.shieldStatus = this.data.shield;
    }

    preload(){

        // this.load.image('ground4', '/static/src/assets/twirl_platform.png');
        // this.load.image('coin', '/static/src/assets/single_coin.png');
        //this.load.image('bosshealth', 'static/src/assets/images/healthbar.png');
        // this.load.image('spike', '/static/src/assets/spikes.png');
        // this.load.spritesheet('player_one_walk', '/static/src/assets/assets_2/walk.png', { frameWidth: 64, frameHeight: 64 });
        // this.load.spritesheet('player_one_death', '/static/src/assets/assets_2/death.png', { frameWidth: 64, frameHeight: 64 });
        // this.load.spritesheet('player_one_idle_sheet', '/static/src/assets/assets_2/idle.png', { frameWidth: 64, frameHeight: 64 });
        // this.load.spritesheet('player_one_jump', '/static/src/assets/assets_2/jump.png', { frameWidth: 64, frameHeight: 64 });

       // this.load.video('boss_background_4', '/static/src/assets/ssbm_background_4.mp4', 'loadeddata', false, true);
    //    this.load.video('boss_background_4', '/static/src/assets/ssbb_background_4.mp4', 'loadeddata', false, true);

        //--------------BOSS SPRITE SHEET-----------
        this.load.spritesheet('boss_sheet', '/static/src/assets/assets_2/boss_spritesheet.png', { frameWidth: 140, frameHeight:93 });
        this.load.spritesheet('genie_sheet', '/static/src/assets/assets_2/genie_sheet.png', { frameWidth: 240, frameHeight: 240 }); //this is for genie character
        //--------BOSS SPRITE SHEET----------------
        //fire_ball_spritesheet
        this.load.spritesheet('fireball_sheet', '/static/src/assets/assets_2/fireball_spritesheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('small_fire_sheet', '/static/src/assets/assets_2/small_fireball_sheet.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('explosion1', '/static/src/assets/assets_2/explosion1.png', { frameWidth: 64, frameHeight: 64 });

        // this.load.image('shield', '/static/src/assets/assets_2/shield.png');
        // this.load.image('detonator', '/static/src/assets/detonator.png');
        // this.load.image('dynamite', '/static/src/assets/dynamite.png');
        // this.load.spritesheet('explosions', '/static/src/assets/explosions.png', { frameWidth: 64, frameHeight: 64 });
    }

    create(){
        this.bossHealth = 100;
        console.log("im at level 4");
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //testing level transition
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyP.on('up',()=>this.transition());

        this.keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.keyE.on('up', () => this.damage());
        this.keyE.enabled = false;
        

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyESC.on('up',()=>this.pause());

        //target
        this.target = this.physics.add.staticGroup();
        this.target.create(400,100, null).setScale(0.1).refreshBody();



        this.vid = this.add.video(400, 300, 'boss_background_4');
        this.vid.play(true);
        this.vid.setPaused(false);

        // this.add.image(400, 300, 'background4');

        this.platforms = this.physics.add.staticGroup();
        //this.spikes = this.physics.add.staticGroup();

        //PLATFORMS FOR FLOOR
        this.platforms.create(90,  588, 'ground4').setScale(1.5).refreshBody();
        this.platforms.create(280, 588, 'ground4').setScale(1.5).refreshBody();
        this.platforms.create(470, 588, 'ground4').setScale(1.5).refreshBody();
        this.platforms.create(660, 588, 'ground4').setScale(1.5).refreshBody();
        this.platforms.create(850, 588, 'ground4').setScale(1.5).refreshBody();

        //PLATFORMS FOR PLAYER TO JUMP ON
        this.platforms.create(100, 230, 'ground4').setScale(0.75).refreshBody();//left boss dmg platform
        this.platforms.create(700, 280, 'ground4').setScale(0.75).refreshBody();//right boss dmg platform
      
      //  this.platforms.create(100, 330, 'ground4').setScale(0.75).refreshBody();//left
        this.platforms.create(100, 430, 'ground4').setScale(0.75).refreshBody();//left

       // this.platforms.create(700, 380, 'ground4').setScale(0.75).refreshBody();
        this.platforms.create(700, 480, 'ground4').setScale(0.75).refreshBody();
       
        this.tutmp1 = this.physics.add.image(199,470, 'ground4').setScale(.35,.45); //create moving platforms for tutorial part 2.
        this.tutmp2 = this.physics.add.image(601,330, 'ground4').setScale(.35,.45); 
        
        this.tutmp1.setImmovable(true)
        this.tutmp2.setImmovable(true)

        this.tutmp1.body.allowGravity = false; //set them to not allow gravity. 
        this.tutmp2.body.allowGravity = false; 
       

        // this.spikes.create(400, 500, 'spike');



        this.detonator = this.physics.add.image(450, 500, 'detonator');
        this.detonator.body.moves = false;
        this.detonator.body.setAllowGravity(false);
        this.bombText = new Phaser.GameObjects.Text(this, 350, 400, 'Press E', { fill: '#ffffff' });
        this.bombText.setFontSize(24);
        this.add.existing(this.bombText);
        this.detonator.depth = 1;
        this.bombText.depth = 1;
        this.detonator.setScale(0.1);

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

        //BOSS CODE START
        this.boss = this.physics.add.sprite(650,110, 'boss_sheet');
        this.boss.setImmovable(true);
        this.boss.body.allowGravity = false;

        var rand_xx = Phaser.Math.Between(this.player.x - 100, this.player.x + 100);
        var rand_yy = Phaser.Math.Between(this.player.y - 0, this.player.y - 25);
        var rand_aaa = Phaser.Math.Between(100, 200);

        this.anims.create({
            key: 'boss_idle',
            frames: this.anims.generateFrameNumbers('boss_sheet', { frames: [0,1,2,3,4,5,6,7] }),
            frameRate: 8,
            repeat: -1,

        });
        this.anims.create({
            key: 'boss_attack',
            frames: this.anims.generateFrameNumbers('boss_sheet', { frames: [16,17,18,19,20,21,22,23,24,25] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_hurt',
            frames: this.anims.generateFrameNumbers('boss_sheet', { frames: [26,27,28] }),
            frameRate: 3,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_death',
            frames: this.anims.generateFrameNumbers('boss_sheet', { frames: [29,30,31,32,33,34,35,36,37,38] }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'boss_cast',
            frames: this.anims.generateFrameNumbers('boss_sheet', { frames: [39,40,41,42,43,44,45,46,47] }),
            frameRate: 9,
            repeat: -1
        });

        this.anims.create({
            key: 'boss_spell',
            frames: this.anims.generateFrameNumbers('boss_sheet', { frames: [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63] }),
            frameRate: 16,
        });

        this.boss.setScale(2.5,2.5);
        //BOSS FIGHT EVENT TIMERS
        this.time.addEvent({delay: 1200, callback: this.boss_fight1, callbackScope: this, loop: true});//boss
        this.time.addEvent({delay: 1200, callback: this.boss_fight2, callbackScope: this, loop: true});
        this.time.addEvent({delay: 1200, callback: this.boss_fight3, callbackScope: this, loop: true});
        
        //BOSS CODE END
        //genie CODE START
        this.genie = this.physics.add.sprite(100,100, 'genie_sheet');
        this.genie.setImmovable(true);
        this.genie.body.allowGravity = false;

        this.anims.create({
            key: 'genie_idle',
            frames: this.anims.generateFrameNumbers('genie_sheet', { frames: [0,1,2,3,4,5,6] }),
            frameRate: 7,
            repeat: -1,

        });
        this.anims.create({
            key: 'genie_cast',
            frames: this.anims.generateFrameNumbers('genie_sheet', { frames: [7,8,9,10,11,12,13,14,15,16,17,18,19] }),
            frameRate: 13,
           // repeat: -1
        });
        this.anims.create({
            key: 'genie_range',
            frames: this.anims.generateFrameNumbers('genie_sheet', { frames: [12,13,14,15,16,17,18,19,20] }),
            frameRate: 15,
            repeat: -1
        });
        this.anims.create({
            key: 'genie_melee',
            frames: this.anims.generateFrameNumbers('genie_sheet', { frames: [21,22,23,24,25,26,27] }),
            frameRate: 18,
            repeat: -1
        });
        this.anims.create({
            key: 'genie_something',
            frames: this.anims.generateFrameNumbers('genie_sheet', { frames: [28,29,30,31,32,33,34] }),
            frameRate: 21,
            repeat: -1
        });

        this.anims.create({
            key: 'genie_laser',
            frames: this.anims.generateFrameNumbers('genie_sheet', { frames: [35,36,37,38,39,40,41,42,43,44,45,46,47,48] }),
            frameRate: 6,
        });
        this.anims.create({
            key: 'genie_armor',
            frames: this.anims.generateFrameNumbers('genie_sheet', { frames: [49,50,51,52,53,54,55,56,57,58,59] }),
            frameRate: 5,
        });
        this.anims.create({
            key: 'genie_death',
            frames: this.anims.generateFrameNumbers('genie_sheet', { frames: [60,61,62,63,64,65,66,67,68,69,70,71,72,73] }),
            frameRate: 22,
        });
        this.anims.create({
            key: 'genie_fireball',
            frames: this.anims.generateFrameNumbers('fireball_sheet', { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,141,5,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]}),
            frameRate: 60,
            repeat: -1
        });
        this.anims.create({
            key: 'genie_small_fire',
            frames: this.anims.generateFrameNumbers('small_fire_sheet', { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,141,5,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59]}),
            frameRate: 60,
            repeat: -1
        });
        this.anims.create({
            key: 'genie_explosion',
            frames: this.anims.generateFrameNumbers('explosion1', { frames: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,141,5,16,17,18,19]}),
            frameRate: 20,
            repeat: -1
        });

        this.genie.setScale(0.75,0.75);
        //GENIE FIRE BALL TIMERERRRRRRRRRRRR
        this.time.addEvent({delay: 3000, callback: this.genie_fight1, callbackScope: this, loop: true}); //for genie
        //genie CODE END
        this.physics.add.collider(this.player, this.tutmp1);
        this.physics.add.collider(this.player, this.tutmp2);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.coin = this.physics.add.group({
            key: 'coin',
            repeat: 0,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.coin.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });

        this.coinCount = this.add.text(16, 16, 'crewels:' + this.data.crewels, { fontSize: '12px', fill: '#000' });
        this.level4Text = this.add.text( 16,24, 'Level 4', { fontSize: '12px', fill: '#000' });
        this.lifeCount = this.add.text(16, 32, 'lives: ' + this.data.lives, { fontSize: '12px', fill: '#000' });
        this.bossHealthDisplay = this.add.text(16, 40, 'Boss Health: ' + this.bossHealth + '%', { fontSize: '12px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.coin, this.platforms);
        this.physics.add.collider(this.player, this.movingPlatform);
        this.physics.add.collider(this.player, this.movingPlatformHorizontal);

        this.physics.add.overlap(this.player, this.coin, this.collectcoin, null, this);

        this.physics.add.overlap(this.player, this.detonator);

        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(1.0);

        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null, this);

        if (this.shieldStatus === 1) {
            this.shield = this.physics.add.image(100, 460, 'shield');
            this.shield.body.moves = false;
            this.shield.body.setAllowGravity(false);
            this.shield.setAlpha(0.5);
        }
    }
    boss_fight1(){
        if(this.boss_claw1){
            this.boss_claw1.destroy();
        }
        var rand_xx = Phaser.Math.Between(this.player.x - 200, this.player.x + 200);
        var rand_yy = Phaser.Math.Between(this.player.y + 30, this.player.y + 100);
        if(rand_xx < this.player.x){
            rand_xx -= 75;
        }
        if(rand_xx > this.player.x){
            rand_xx += 75;
        }
        if(rand_yy < this.player.y){
            rand_yy -= 50;
        }
        if(rand_yy > this.player.y){
            rand_yy += 50;
        }

        var rand_aaa = Phaser.Math.Between(0, 4);
        this.boss_claw1 = this.physics.add.sprite(rand_xx,rand_yy, 'boss_sheet');
       this.boss_claw1.setSize(15,52,false);
       this.boss_claw1.body.offset.x=60;
       this.boss_claw1.body.offset.y=30;
        this.boss_claw1.setImmovable(true);
        this.boss_claw1.body.allowGravity = false;
        this.boss_claw1.anims.play('boss_spell', true);
        if(this.boss_claw1.x < this.player.x && rand_aaa == 4){
            this.boss_claw1.setAngle(-90);
            this.boss_claw1.setSize(52,15,false);
            this.boss_claw1.body.offset.x=60;
            this.boss_claw1.body.offset.y=40;
        }
        if(this.boss_claw1.x > this.player.x && rand_aaa == 4){
            this.boss_claw1.setAngle(90);
            this.boss_claw1.setSize(52,15,false);
            this.boss_claw1.body.offset.x=30;
            this.boss_claw1.body.offset.y=40;
        }
        this.boss_claw1.setScale(1.5,1.5);
        this.physics.add.overlap(this.player, this.boss_claw1, this.playerHitSpike,null, this);
    }
    boss_fight2(){
        if(this.boss_claw2){
            this.boss_claw2.destroy();
        }
        var rand_xx = Phaser.Math.Between(this.player.x - 300, this.player.x + 300);
        var rand_yy = Phaser.Math.Between(this.player.y + 30, this.player.y + 60);
        if(rand_xx < this.player.x){
            rand_xx -= 75;
        }
        if(rand_xx > this.player.x){
            rand_xx += 75;
        }
        if(rand_xx < this.player.y){
            rand_yy -= 75;
        }
        if(rand_xx > this.player.y){
            rand_yy += 75;
        }

        var rand_aaa = Phaser.Math.Between(0, 4);
        this.boss_claw2 = this.physics.add.sprite(rand_xx,rand_yy, 'boss_sheet');
        this.boss_claw2.setSize(15,52,false);
        this.boss_claw2.body.offset.x=60;
        this.boss_claw2.body.offset.y=30;
        this.boss_claw2.setImmovable(true);
        this.boss_claw2.body.allowGravity = false;
        this.boss_claw2.anims.play('boss_spell', true);
        if(this.boss_claw2.x < this.player.x && rand_aaa == 4){
            this.boss_claw2.setAngle(-90);
            this.boss_claw2.setSize(52,15,false);
            this.boss_claw2.body.offset.x=60;
            this.boss_claw2.body.offset.y=40;
        }
        if(this.boss_claw2.x > this.player.x && rand_aaa == 4){
            this.boss_claw2.setAngle(90);
            this.boss_claw2.setSize(52,15,false);
            this.boss_claw2.body.offset.x=30;
            this.boss_claw2.body.offset.y=40;
        }
        this.boss_claw2.setScale(1.5,1.5);
        this.physics.add.overlap(this.player, this.boss_claw2, this.playerHitSpike,null, this);
    }
    boss_fight3(){
        if(this.boss_claw3){
            this.boss_claw3.destroy();
        }
        var rand_xx = Phaser.Math.Between(this.player.x - 400, this.player.x + 400);
        var rand_yy = Phaser.Math.Between(this.player.y + 30, this.player.y + 60);
        if(rand_xx < this.player.x){
            rand_xx -= 75;
        }
        if(rand_xx > this.player.x){
            rand_xx += 75;
        }
        if(rand_xx < this.player.y){
            rand_yy -= 75;
        }
        if(rand_xx > this.player.y){
            rand_yy += 75;
        }

        var rand_aaa = Phaser.Math.Between(0, 4);
        this.boss_claw3 = this.physics.add.sprite(rand_xx,rand_yy, 'boss_sheet');
        this.boss_claw3.setSize(15,52,false);
        this.boss_claw3.body.offset.x=60;
        this.boss_claw3.body.offset.y=30;
        this.boss_claw3.setImmovable(true);
        this.boss_claw3.body.allowGravity = false;
        this.boss_claw3.anims.play('boss_spell', true);
        if(this.boss_claw3.x < this.player.x && rand_aaa == 4){
            this.boss_claw3.setAngle(-90);
            this.boss_claw3.setSize(52,15,false);
            this.boss_claw3.body.offset.x=60;
            this.boss_claw3.body.offset.y=40;
        }
        if(this.boss_claw3.x > this.player.x && rand_aaa == 4){
            this.boss_claw3.setAngle(90);
            this.boss_claw3.setSize(52,15,false);
            this.boss_claw3.body.offset.x=30;
            this.boss_claw3.body.offset.y=40;
        }
        this.boss_claw3.setScale(1.5,1.5);
        this.physics.add.overlap(this.player, this.boss_claw3, this.playerHitSpike,null, this);
        // add shield to scene (if purchased)
        

        

    }
    genie_fight1(){
        if(this.fireball){
            this.check_if_present1 = false;
            this.fireball.destroy();
        }
        this.fireball = this.physics.add.sprite(100,100, 'fireball_sheet');
        this.fireball.setSize(10,10,false);
        this.fireball.body.offset.x=15;
        this.fireball.body.offset.y=22;
        this.fireball.setGravity(0,-700);
       // this.fireball.body.allowGravity = false;
        this.fireball.anims.play('genie_fireball', true);
        this.check_if_present1 = true;
        this.fireball.setScale(1.5,1.5);
       // this.physics.accelerateToObject(this.fireball, this.target);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell1,null, this);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell2,null, this);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell3,null, this);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell4,null, this);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell5,null, this);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell6,null, this);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell7,null, this);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell8,null, this);
        this.physics.add.overlap(this.fireball, this.target, this.explosion_spell9,null, this);
    }
    explosion_spell1(){
        if(this.small_fire1){
            this.check_if_present2 = false;
            this.small_fire1.destroy();
            
        }
        this.small_fire1 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire1.setSize(30,30,false);
        this.small_fire1.body.offset.x=20;
        this.small_fire1.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire1.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire1.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire1.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire1, this.target);
        this.physics.add.overlap(this.small_fire1, this.player, this.playerHitSpike,null, this);
        
        
   
    }
    explosion_spell2(){
        if(this.small_fire2){
            this.check_if_present2 = false;
            this.small_fire2.destroy();
        }
        this.small_fire2 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire2.setSize(30,30,false);
        this.small_fire2.body.offset.x=20;
        this.small_fire2.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire2.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire2.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire2.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire2, this.target);
        this.physics.add.overlap(this.small_fire2, this.player, this.playerHitSpike,null, this);
       
    }
    explosion_spell3(){
        if(this.small_fire3){
            this.check_if_present2 = false;
            this.small_fire3.destroy();
        }
        this.small_fire3 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire3.setSize(30,30,false);
        this.small_fire3.body.offset.x=20;
        this.small_fire3.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire3.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire3.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire3.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire3, this.target);
        this.physics.add.overlap(this.small_fire3, this.player, this.playerHitSpike,null, this);
    
    }
    explosion_spell4(){
        if(this.small_fire4){
            this.check_if_present2 = false;
            this.small_fire4.destroy();
        }
        this.small_fire4 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire4.setSize(30,30,false);
        this.small_fire4.body.offset.x=20;
        this.small_fire4.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire4.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire4.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire4.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire4, this.target);
        this.physics.add.overlap(this.small_fire4, this.player, this.playerHitSpike,null, this);
        
    }
    explosion_spell5(){
        if(this.small_fire5){
            this.check_if_present2 = false;
            this.small_fire5.destroy();
        }
        this.small_fire5 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire5.setSize(30,30,false);
        this.small_fire5.body.offset.x=20;
        this.small_fire5.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire5.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire5.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire5.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire5, this.target);
        this.physics.add.overlap(this.small_fire5, this.player, this.playerHitSpike,null, this);
       
    }
    explosion_spell6(){
        if(this.small_fire6){
            this.check_if_present2 = false;
            this.small_fire6.destroy();
        }
        this.small_fire6 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire6.setSize(30,30,false);
        this.small_fire6.body.offset.x=20;
        this.small_fire6.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire6.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire6.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire6.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire6, this.target);
        this.physics.add.overlap(this.small_fire6, this.player, this.playerHitSpike,null, this);
       
    }
    explosion_spell7(){
        if(this.small_fire7){
            this.check_if_present2 = false;
            this.small_fire7.destroy();
        }
        this.small_fire7 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire7.setSize(30,30,false);
        this.small_fire7.body.offset.x=20;
        this.small_fire7.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire7.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire7.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire7.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire7, this.target);
        this.physics.add.overlap(this.small_fire7, this.player, this.playerHitSpike,null, this);
       
    }
    explosion_spell8(){
        if(this.small_fire8){
            this.check_if_present2 = false;
            this.small_fire8.destroy();
        }
        this.small_fire8 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire8.setSize(30,30,false);
        this.small_fire8.body.offset.x=20;
        this.small_fire8.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire8.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire8.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire8.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire8, this.target);
        this.physics.add.overlap(this.small_fire8, this.player, this.playerHitSpike,null, this);
       
    }
    explosion_spell9(){
        if(this.small_fire9){
            this.check_if_present2 = false;
            this.small_fire9.destroy();
            this.fireball.destroy();
        }
        this.small_fire9 = this.physics.add.sprite(400,100, 'fireball_sheet');
        this.small_fire9.setSize(30,30,false);
        this.small_fire9.body.offset.x=20;
        this.small_fire9.body.offset.y=20;
        var rand_num = Phaser.Math.Between(-170, 170);
        this.small_fire9.setGravity(rand_num,-500);
       // this.fireball.body.allowGravity = false;
        this.small_fire9.anims.play('genie_fireball', true);
        this.check_if_present2 = true;
        this.small_fire9.setScale(0.5,0.5);
       
       // this.physics.accelerateToObject(this.small_fire9, this.target);
        this.physics.add.overlap(this.small_fire9, this.player, this.playerHitSpike,null, this);
     
    }


    update(){
        //moving platform1
        if(this.tutmp1.x < 200)
        {
            this.tutmp1.setVelocityX(50);
        }
       if(this.tutmp1.x > 600)
        {
            this.tutmp1.setVelocityX(-50);
        }
        //moving platform 2
        if(this.tutmp2.x < 200)
        {
            this.tutmp2.setVelocityX(50);
        }
       if(this.tutmp2.x > 600)
        {
            this.tutmp2.setVelocityX(-50);
        }
        
        
        if(this.check_if_present1 == true){
            if(this.fireball.x < 310)
            {
                this.fireball.setVelocityX(200);
            }  
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
        }
        else //else
        {
            this.player.setVelocityX(0); 
            this.player.anims.play('idle',true);
        }

        const isJumpJustDownc =  Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const isJumpJustDownw = Phaser.Input.Keyboard.JustDown(this.keyW);
        // jump
        if (this.cursors.up.isDown && this.player.body.touching.down || this.keyW.isDown && this.player.body.touching.down) //if
        {
            //Phaser.Input.Keyboard.JustDown(this.cursors.up)
            //this.player.body.onFloor()
            //this.player.body.touching.down
            this.player.setVelocityY(-400);
            setTimeout(() => {  this.inAir = true; }, 100);
            this.sound.play(Constants.SFX.jump);
            this.player.anims.play('jump',true);
            this.jump_count = 1;
          // this.player.anims.play('jump', this.player)
        }
        //for double jump
        if((isJumpJustDownc && (!this.player.body.touching.down && this.jump_count < 2)) || isJumpJustDownw && (!this.player.body.touching.down && this.jump_count < 2)){
            this.doublejump_enabled();
        }
        //reset jump counter
        if(this.player.body.touching.down){
            this.jump_count = 0;
        }
        // landing sound
        if (this.inAir && this.player.body.touching.down) {
            this.inAir = false;
            this.sound.play(Constants.SFX.land);
        }

        if (this.cursors.down.isDown || this.keyS.isDown) //if
        {
            this.player.setVelocityY(170);
           // this.player.anims.play('jump',true);
         
        }
      //******************************************boss code start *******************************************
        var boss_died = false;

        if(boss_died != true)
        {
            this.boss.anims.play('boss_cast', true);
            if(this.check_if_present1 != true){
                this.genie.anims.play('genie_idle', true);
            }
            if(this.check_if_present1 == true){
                this.genie.anims.play('genie_cast', true);
            }
        }
      //********************************************boss code end*************************************

        this.coinCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-60);
        this.level4Text.setPosition(this.player.body.position.x-75, this.player.body.position.y-70);
        this.lifeCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-80);
        this.bossHealthDisplay.setPosition(this.player.body.position.x-75, this.player.body.position.y-90);

        //When player hits a lever, decrease bossHealth by a certain amt
        // if (lever hit) { this.bossHealth -= 10; }
        // If player defeats the boss, go to graveyard game-over scene
        if (this.bossHealth === 0) {
            this.data.crewels += 500;
            this.scene.start(Constants.Scenes.nameInput, [this.data.crewels, this.scene]);
        }

    

        // update shield position
        if (this.shieldStatus === 1) {
            this.shield.x = this.player.x;
            this.shield.y = this.player.y + 17;
        }

        if (!this.detonator.body.touching.none) {
            this.bombText.setVisible(true);
            this.keyE.enabled = true;
            console.log("touching\n");
        } else {
            this.bombText.setVisible(false);
            this.keyE.enabled = false;
            // console.log("touching\n");
        }


    }
     playerHitdoor2()
     {
         this.scene.start(Constants.Scenes.lvl1,this.data);
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

        this.data.crewels += 1;
        this.coinCount.setText('crewels: ' + this.data.crewels);

        // play coin collection sound
        this.sound.play(Constants.SFX.coin);
    }
    pause(){
        this.scene.launch(Constants.Scenes.pause,this.scene);
        // console.log(this.scene);
        this.scene.pause();
    }
    damage(){
        this.bossHealth-=25;
        this.bossHealthDisplay.setText('Boss Health: ' + this.bossHealth + '%');
    }
}