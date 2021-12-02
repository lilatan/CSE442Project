import { Constants } from "/static/src/Constants.js"

export class level4 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl4);
    }
    player;
    coin;
    platforms;
    cursors;
    door2;
    crewels = 0;
    coinCount;
    lifeCount;
    spikes;
    spike4;
    zoom;
    jump_count = 0;
    vid;
    boss;
    boss_claw1;
    boss_claw2;
    boss_claw3;

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
    paused = false;

    init(data){
        this.data = data;
        this.data.currentLevel = "4";
        this.invincible = false;
        this.shieldStatus = this.data.shield;
        this.timeElapsed = 0;
    }

    preload(){

        this.load.image('ground4', '/static/src/assets/twirl_platform.png');
        this.load.image('coin4', '/static/src/assets/single_coin.png');
        this.load.image('spike4', '/static/src/assets/spikes.png');
        this.load.spritesheet('player_one_walk', '/static/src/assets/assets_2/walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_death', '/static/src/assets/assets_2/death.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_idle_sheet', '/static/src/assets/assets_2/idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_jump', '/static/src/assets/assets_2/jump.png', { frameWidth: 64, frameHeight: 64 });

       // this.load.video('boss_background_4', '/static/src/assets/ssbm_background_4.mp4', 'loadeddata', false, true);
       this.load.video('boss_background_4', '/static/src/assets/ssbb_background_4.mp4', 'loadeddata', false, true);

        //--------------BOSS SPRITE SHEET-----------
        this.load.spritesheet('boss_sheet', '/static/src/assets/assets_2/boss_spritesheet.png', { frameWidth: 140, frameHeight:93 });
        //--------BOSS SPRITE SHEET----------------

        this.load.image('shield', '/static/src/assets/assets_2/shield.png');
        this.load.image('detonator', '/static/src/assets/detonator.png');
        this.load.image('dynamite', '/static/src/assets/dynamite.png');
        this.load.spritesheet('explosions', '/static/src/assets/explosions.png', { frameWidth: 64, frameHeight: 64 });
    }

    create(){
        // restart level once to ensure there is no gravity bug
        if (this.data.restarted_level_4 === false) {
            this.data.restarted_level_4 = true;
            this.scene.start(Constants.Scenes.lvl4,this.data);
        }

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

        this.vid = this.add.video(400, 300, 'boss_background_4');
        this.vid.play(true);
        this.vid.setPaused(false);

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(90,  588, 'ground4').setScale(1.5).refreshBody();
        this.platforms.create(280, 588, 'ground4').setScale(1.5).refreshBody();
        this.platforms.create(470, 588, 'ground4').setScale(1.5).refreshBody();
        this.platforms.create(660, 588, 'ground4').setScale(1.5).refreshBody();
        this.platforms.create(850, 588, 'ground4').setScale(1.5).refreshBody();

        // this.platforms.create(150, 300, 'ground4').setScale(0.5).refreshBody();
        // this.platforms.create(400, 230, 'ground4').setScale(0.5).refreshBody();
        // this.platforms.create(100, 400, 'ground4');
        // this.platforms.create(700, 450, 'ground4');
        // this.platforms.create(550, 150, 'ground4');
        // this.platforms.create(25, 125, 'ground4');
        // this.spikes.create(400, 500, 'spike4');

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

        // this.boss_claw = this.physics.add.group({
        //     key: 'boss_sheet',
        //     immovable: true,
        //     allowGravity: false,
        //     repeat: 2,
        //     setXY: { x: rand_xx, y: rand_yy, stepX: rand_aaa }
        // });

        // this.boss_claw.children.iterate(function (child) {
        //      this.boss_claw.anims.playAnimation('boss_spell', true);
        //  });



        // this.boss_claw = this.physics.add.sprite(rand_xx,rand_yy, 'boss_sheet');
        // this.boss_claw.setImmovable(true);
        // this.boss_claw.body.allowGravity = false;
        // this.boss_claw.setScale(1.5,1.5);

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
        this.time.addEvent({delay: 1500, callback: this.boss_fight1, callbackScope: this, loop: true});
        this.time.addEvent({delay: 1500, callback: this.boss_fight2, callbackScope: this, loop: true});
        this.time.addEvent({delay: 1500, callback: this.boss_fight3, callbackScope: this, loop: true});
        //BOSS CODE END

        this.cursors = this.input.keyboard.createCursorKeys();

        this.coin = this.physics.add.group({
            key: 'coin4',
            repeat: 0,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.coin.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });

        this.coinCount = this.add.text(16, 16, 'crewels:' + this.data.crewels, { fontSize: '12px', fill: '#fff' });
        this.level4Text = this.add.text( 16,24, 'Level 4', { fontSize: '12px', fill: '#fff' });
        this.lifeCount = this.add.text(16, 32, 'lives: ' + this.data.lives, { fontSize: '12px', fill: '#fff' });
        this.bossHealthDisplay = this.add.text(16, 40, 'Boss Health: ' + this.bossHealth + '%', { fontSize: '12px', fill: '#fff' });

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

        // add shield to scene (if purchased)
        if (this.shieldStatus === 1) {
            this.shield = this.physics.add.image(100, 460, 'shield');
            this.shield.body.moves = false;
            this.shield.body.setAllowGravity(false);
            this.shield.setAlpha(0.5);
        }

        //line below doesn't work for overlap for some reason
       // this.physics.add.collider(this.boss_claw, this.platforms);
       // this.physics.add.overlap(this.player, this.boss_claw, this.playerHitSpike,null, this);
       // this.physics.add.collider(this.player, this.boss_claw, this.playerHitSpike,null, this);

        // set start time
        this.startTime = new Date();

    }
    //this.time.addEvent({delay: 100, callback: this.hover_enabled, callbackScope: this, loop: false});
    boss_fight1(){
        if(this.boss_claw1){
            this.boss_claw1.destroy();
        }
        var rand_xx = Phaser.Math.Between(this.player.x - 200, this.player.x + 200);
        var rand_yy = Phaser.Math.Between(this.player.y + 30, this.player.y + 100);
        if(rand_xx < this.player.x){
            rand_xx -= 50;
        }
        if(rand_xx > this.player.x){
            rand_xx += 50;
        }
        if(rand_xx < this.player.y){
            rand_yy -= 50;
        }
        if(rand_xx > this.player.y){
            rand_yy += 50;
        }

        var rand_aaa = Phaser.Math.Between(0, 4);
        this.boss_claw1 = this.physics.add.sprite(rand_xx,rand_yy, 'boss_sheet');
       this.boss_claw1.setSize(33,52,false);
       this.boss_claw1.body.offset.x=52;
       this.boss_claw1.body.offset.y=30;
        this.boss_claw1.setImmovable(true);
        this.boss_claw1.body.allowGravity = false;
        this.boss_claw1.anims.play('boss_spell', true);
        if(this.boss_claw1.x < this.player.x && rand_aaa == 4){
            this.boss_claw1.setAngle(-90);
            this.boss_claw1.setSize(52,33,false);
            this.boss_claw1.body.offset.x=60;
            this.boss_claw1.body.offset.y=32;
        }
        if(this.boss_claw1.x > this.player.x && rand_aaa == 4){
            this.boss_claw1.setAngle(90);
            this.boss_claw1.setSize(52,33,false);
            this.boss_claw1.body.offset.x=30;
            this.boss_claw1.body.offset.y=25;
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
            rand_xx -= 50;
        }
        if(rand_xx > this.player.x){
            rand_xx += 50;
        }
        if(rand_xx < this.player.y){
            rand_yy -= 50;
        }
        if(rand_xx > this.player.y){
            rand_yy += 50;
        }

        var rand_aaa = Phaser.Math.Between(0, 4);
        this.boss_claw2 = this.physics.add.sprite(rand_xx,rand_yy, 'boss_sheet');
        this.boss_claw2.setSize(33,52,false);
        this.boss_claw2.body.offset.x=52;
        this.boss_claw2.body.offset.y=30;
        this.boss_claw2.setImmovable(true);
        this.boss_claw2.body.allowGravity = false;
        this.boss_claw2.anims.play('boss_spell', true);
        if(this.boss_claw2.x < this.player.x && rand_aaa == 4){
            this.boss_claw2.setAngle(-90);
            this.boss_claw2.setSize(52,33,false);
            this.boss_claw2.body.offset.x=60;
            this.boss_claw2.body.offset.y=32;
        }
        if(this.boss_claw2.x > this.player.x && rand_aaa == 4){
            this.boss_claw2.setAngle(90);
            this.boss_claw2.setSize(52,33,false);
            this.boss_claw2.body.offset.x=30;
            this.boss_claw2.body.offset.y=25;
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
            rand_xx -= 50;
        }
        if(rand_xx > this.player.x){
            rand_xx += 50;
        }
        if(rand_xx < this.player.y){
            rand_yy -= 50;
        }
        if(rand_xx > this.player.y){
            rand_yy += 50;
        }

        var rand_aaa = Phaser.Math.Between(0, 4);
        this.boss_claw3 = this.physics.add.sprite(rand_xx,rand_yy, 'boss_sheet');
        this.boss_claw3.setSize(33,52,false);
        this.boss_claw3.body.offset.x=52;
        this.boss_claw3.body.offset.y=30;
        this.boss_claw3.setImmovable(true);
        this.boss_claw3.body.allowGravity = false;
        this.boss_claw3.anims.play('boss_spell', true);
        if(this.boss_claw3.x < this.player.x && rand_aaa == 4){
            this.boss_claw3.setAngle(-90);
            this.boss_claw3.setSize(52,33,false);
            this.boss_claw3.body.offset.x=60;
            this.boss_claw3.body.offset.y=32;
        }
        if(this.boss_claw3.x > this.player.x && rand_aaa == 4){
            this.boss_claw3.setAngle(90);
            this.boss_claw3.setSize(52,33,false);
            this.boss_claw3.body.offset.x=30;
            this.boss_claw3.body.offset.y=25;
        }
        this.boss_claw3.setScale(1.5,1.5);
        this.physics.add.overlap(this.player, this.boss_claw3, this.playerHitSpike,null, this);
    }
    update(){
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
        else
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
            //this.boss_claw = this.physics.add.sprite(rand_xx,rand_yy, 'boss_sheet');
           // this.boss_claw.children.iterate(function (child) {
               // this.boss_claw.anims.play('boss_spell', true);
          //  });
         //   this.boss_claw.anims.play('boss_spell', true);
            this.boss.anims.play('boss_cast', true);
        }
      //********************************************boss code end*************************************

        this.coinCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-60);
        this.level4Text.setPosition(this.player.body.position.x-75, this.player.body.position.y-70);
        this.lifeCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-80);
        this.bossHealthDisplay.setPosition(this.player.body.position.x-75, this.player.body.position.y-90);

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

        // reset startTime if pause menu was opened
        if (this.paused) {
            this.paused = false;
            this.startTime = new Date();
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

                // game ends if lives hit zero
                if (this.data.lives === 0) {
                    this.updateTimeElapsed();

                    // switch scene to graveyard
                    this.scene.start(Constants.Scenes.nameInput, this.data);
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
        this.updateTimeElapsed();
        this.paused = true;
        this.scene.launch(Constants.Scenes.pause,this.scene);
        // console.log(this.scene);
        this.scene.pause();
    }
    damage(){
        this.bossHealth-=25;
        this.bossHealthDisplay.setText('Boss Health: ' + this.bossHealth + '%');

        console.log(this.bossHealth + "% BOSS HP LEFT....");

        // If player defeats the boss, go to endgame scene
        if (this.bossHealth === 0) {
            this.updateTimeElapsed();

            // Add remaining crewels to score with a multiplier
            this.data.score += this.data.crewels * 10
            // Score Multiplier, finish boss => score multiplied by 4
            this.data.score *= 4;

            // switch scene to next level
            this.scene.start(Constants.Scenes.endgame, this.data);
        }
    }

    updateTimeElapsed(){
        // update time elapsed
        this.endTime = new Date();
        this.data.timeElapsed += Math.round((this.endTime - this.startTime) / 1000);
        console.log(this.data.timeElapsed + " seconds");
    }
}