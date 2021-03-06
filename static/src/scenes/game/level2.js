import { Constants } from "/static/src/Constants.js"

export class level2 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl2);
    }

    xcord; 
    ycord; 
    player;
    bigboy_enemy;
    bigboy_speed = 100;
    watcher_enemy;
    rotation_watcher;
    question_block;
    wall;
    block;
    coin;
    tempwallvar;
    //door1;
    door2;
    platforms;
    cursors;
    crewels;
    coinCount;
    lifeCount;
    totalCoin = 12;
    spikes;
    zoom;
    jump_count = 0;

    keyW;
    keyA;
    keyS;
    keyD;

    keyESC;
    //testing level transition
    keyP;

    inAir;
    invincible;
    shieldStatus;
    paused = false;

    init(data){
        this.data = data;
        this.data.currentLevel = this.scene;
        this.invincible = false;
        this.shieldStatus = this.data.shield;
        this.data.currentLevel = "2";
        this.timeElapsed = 0;
    }

    preload(){
    }

    create(){
        // restart level once to ensure there is no gravity bug
        if (this.data.restarted_level_2 === false) {
            this.data.restarted_level_2 = true;
            this.scene.start(Constants.Scenes.lvl2,this.data);
        }
        console.log("im at level 2");
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        //testing level transition
        this.keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        this.keyP.on('up',()=>this.transition());
        

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyESC.on('up',()=>this.pause());

       this.door2 = this.physics.add.staticGroup();
      // this.door2.create(862, 300, null).setScale(4).refreshBody();
      // this.door2.create(862, 400, null).setScale(4).refreshBody();
       this.door2.create(862, 600, null).setScale(4).refreshBody();
        

        this.add.image(400, 300, 'background');

        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();
        //this.question_block = this.physics.add.staticGroup();
        this.block = this.physics.add.staticGroup();
       // this.wall = this.physics.add.staticGroup();

        this.platforms.create(200, 600, 'ground').setScale(1).refreshBody();
        this.platforms.create(400, 600, 'ground').setScale(1).refreshBody();
        this.platforms.create(600, 600, 'ground').setScale(1).refreshBody();

    
        // //climb up sprites.
        // for (var x = 0; x < 5; x++) {
        //     this.xcord = 500-(x*100);
        //     this.ycord = 200+(x*70);
        //     this.platforms.create(this.xcord, this.ycord, 'ground').setScale(.25).refreshBody();
        // }

        // ------------------MOVING PLATFORMS-----------------------------
        this.movingPlatform1 = this.physics.add.image(500,200, 'ground').setScale(.15,.25);
        this.movingPlatform1.setImmovable(true);
        this.movingPlatform1.body.allowGravity = false;

        this.movingPlatform2 = this.physics.add.image(400,270, 'ground').setScale(.15,.25);
        this.movingPlatform2.setImmovable(true);
        this.movingPlatform2.body.allowGravity = false;

        this.movingPlatform3 = this.physics.add.image(300,340, 'ground').setScale(.15,.25);
        this.movingPlatform3.setImmovable(true);
        this.movingPlatform3.body.allowGravity = false;

        this.movingPlatform4 = this.physics.add.image(200,410, 'ground').setScale(.15,.25);
        this.movingPlatform4.setImmovable(true);
        this.movingPlatform4.body.allowGravity = false;

        this.movingPlatform5 = this.physics.add.image(100,480, 'ground').setScale(.15,.25);
        this.movingPlatform5.setImmovable(true);
        this.movingPlatform5.body.allowGravity = false;
        
        //top floor. 
        for (var x = 0; x < 7; x++) {

            this.xcord = x * 50;
            this.platforms.create(this.xcord, 130, 'ground').setScale(.25).refreshBody();

        }
        

       // this.spikes.create(300, 100, 'spike');

        //add question block that player has to get 
        // this.block.create(230,131, 'block').setScale(0.5).refreshBody();
        this.question_block = this.physics.add.image(75, 110, 'question_block');
        this.question_block.setImmovable(true);
        this.question_block.body.allowGravity = false;

        this.tempwallvar = this.physics.add.staticGroup();
        for (var x = 1; x < 8; x++ ) { 
            this.ycord = 550 - (x * 70);
            this.tempwallvar.create(740,this.ycord,'wall').setScale(1).refreshBody(); 
        }
     //this.physics.add.collider(this.player, this.tempwallvar);
        

        
        this.wall = this.physics.add.image(740, 550, 'wall').setScale(1).refreshBody();
        this.wall.setImmovable(true);
        this.wall.body.allowGravity = false;

        //--- PLAYER CODE BELOW----------
        this.player = this.physics.add.sprite(50, 450, 'player_one_idle');
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
            frameRate: 10,
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
        this.bigboy_enemy.setSize(33,42,false);
        this.bigboy_enemy.body.offset.x=15;
        this.bigboy_enemy.body.offset.y=22;
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
        this.bigboy_enemy.setScale(1.2,1.2);
        //this.bigboy_enemy.velocity.x = 100; //doesn't work
        //--------------------------BIG BOY CODE ABOVE-----------------------------------


        //-----------------WATCH CODE BELOW-----------------------------------------------
        this.watcher_enemy = this.physics.add.sprite(500, 300, 'watcher_idle');
        this.watcher_enemy.setGravity(0,-700);
        this.watcher_enemy.setSize(16,16,false);
        this.rotation_watcher = Phaser.Math.Angle.Between(0,0, this.player.x, this.player.y);
        this.anims.create({
            key: 'attack_watcher',
            frames: this.anims.generateFrameNumbers('watcher_walk', { frames: [0, 1, 2, 3, 4, 5 ,6, 7, 8] }),
            frameRate: 9,
            repeat: -1, 
        });
        this.watcher_enemy.setScale(1.5,1.5);
        this.watcher_enemy.setCollideWorldBounds(true);
        //-----------------WATCH CODE ABOVE-----------------------------------------------


        this.cursors = this.input.keyboard.createCursorKeys();

        this.coin = this.physics.add.group({
            key: 'coin',
            repeat: 8,//this.totalCoin-1,
            setXY: { x: 30, y: 0, stepX: 75 }
        });

        this.coin.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });

        this.coinCount = this.add.text(14, 16, 'crewels: ' + this.data.crewels, { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);
        this.level2Text = this.add.text( 16,24, 'Level 2', { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);
        this.lifeCount = this.add.text(16, 32, 'lives: ' + this.data.lives, { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);

        this.coinCount.setPosition(200, 150);
        this.level2Text.setPosition(200, 170);
        this.lifeCount.setPosition(200, 190);

        //----COLLIDER CODE----
        this.physics.add.collider(this.bigboy_enemy, this.platforms);
        this.physics.add.collider(this.bigboy_enemy, this.wall);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.block);
        this.physics.add.collider(this.player, this.wall);

        // collider (moving platform and player)
        this.physics.add.collider(this.player, this.movingPlatform1);
        this.physics.add.collider(this.player, this.movingPlatform2);
        this.physics.add.collider(this.player, this.movingPlatform3);
        this.physics.add.collider(this.player, this.movingPlatform4);
        this.physics.add.collider(this.player, this.movingPlatform5);

        // collider (moving platform and coins)
        // this.physics.add.collider(this.coin, this.movingPlatform1);
        // this.physics.add.collider(this.coin, this.movingPlatform2);
        // this.physics.add.collider(this.coin, this.movingPlatform3);
        // this.physics.add.collider(this.coin, this.movingPlatform4);
        // this.physics.add.collider(this.coin, this.movingPlatform5);

        this.physics.add.collider(this.player, this.tempwallvar);

      //  this.physics.add.collider(this.player, this.watcher_enemy);
       // this.physics.add.collider(this.bigboy_enemy, this.player);
        this.physics.add.collider(this.coin, this.platforms);
        this.physics.add.collider(this.wall, this.platforms);
        this.physics.add.collider(this.question_block, this.platforms);

        this.physics.add.overlap(this.player, this.coin, this.collectcoin, null, this);

        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);
       
        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.bigboy_enemy, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.watcher_enemy, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.question_block, this.playerHitQuestionBlock,null, this);

        this.physics.add.overlap(this.player, this.door2, this.playerHitdoor2,null, this);``

        // add shield to scene (if purchased)
        if (this.shieldStatus === 1) {
            this.shield = this.physics.add.image(100, 460, 'shield');
            this.shield.body.moves = false;
            this.shield.body.setAllowGravity(false);
            this.shield.setAlpha(0.5);
        }

        // set start time
        this.startTime = new Date();
    }

    update(){

        // -----------------------UPDATE MOVING PLATFORMS-----------------
        this.moveplatformhorizontal(this.movingPlatform1, 501, 600, 50);
        this.moveplatformhorizontal(this.movingPlatform2, 401, 500, 30);
        this.moveplatformhorizontal(this.movingPlatform3, 301, 400, 50);
        this.moveplatformhorizontal(this.movingPlatform4, 201, 300, 30);
        this.moveplatformhorizontal(this.movingPlatform5, 101, 200, 50);

    

        //-----------------PLAYER ANIMATION BELOW-------------------------------------------------
        var idle = false;

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
            // this.player.anims.play('idle',true);
            idle = true;
        }
        const isJumpJustDownc =  Phaser.Input.Keyboard.JustDown(this.cursors.up);
        const isJumpJustDownw = Phaser.Input.Keyboard.JustDown(this.keyW);
        // jump
        if (this.cursors.up.isDown && this.player.body.onFloor() || this.keyW.isDown && this.player.body.onFloor()) //if
        {
            this.player.setVelocityY(-400);
            setTimeout(() => {  this.inAir = true; }, 100);
            this.sound.play(Constants.SFX.jump);
            this.player.anims.play('jump',true);
            idle = false;
            this.jump_count = 1;
        }
        if((isJumpJustDownc && (!this.player.body.onFloor() && this.jump_count < 2)) || isJumpJustDownw && (!this.player.body.onFloor() && this.jump_count < 2)){
            this.doublejump_enabled();
        }
        if(this.player.body.onFloor()){
            this.jump_count = 0;
        }


        // landing sound
        if(!this.player.body.onFloor()){
            setTimeout(() => {  this.inAir = true; }, 100);
        }
        if (this.inAir && this.player.body.onFloor()) {
            this.inAir = false;
            this.sound.play(Constants.SFX.land);
        }

        if (this.cursors.down.isDown || this.keyS.isDown) //if
        {
            this.player.setVelocityY(170); 
        }  
        if(idle&& this.player.body.onFloor()){
            this.player.anims.play('idle',true);
        }
    //-----------------PLAYER ANIMATION ABOVE------------------------------------------------------------

    //-----------------BIG BOY ANIMATION BELOW-----------------------------------------------------------
    // if(this.bigboy_enemy.body.velocity.x > 0 && this.bigboy_enemy.x < 300 || this.bigboy_enemy.body.velocity.x < 0 && this.bigboy_enemy.x > 700){
    //       this.bigboy_speed *= -1;
    //   }
    //  if(this.bigboy_enemy.x = 500){
    // this.bigboy_enemy.setVelocityX(100);  
    //  }
       if(this.bigboy_enemy.x < 400)
        {
            this.bigboy_enemy.setVelocityX(100);
            this.bigboy_enemy.anims.play('left_boy', true);
            this.bigboy_enemy.flipX = false;
        }
       if(this.bigboy_enemy.x > 650)
        {
            this.bigboy_enemy.setVelocityX(-100);
            this.bigboy_enemy.anims.play('right_boy', true);
            this.bigboy_enemy.flipX = true;

        }
       // if(this.bigboy_enemy.x > 650 || this.bigboy_enemy.x < 649)
       // {
        //  this.bigboy_enemy.setVelocityX(0);
       //   this.bigboy_enemy.anims.play('attack_boy', true);
      //  }
    //-------------------BIG BOY ANIMATION ABOVE ------------------------------------------------------------

    //-------WATCHER ANIMATION BELOW-------
        this.physics.accelerateToObject(this.watcher_enemy, this.player, 80);
        if(this.watcher_enemy.x > this.player.x){
            this.watcher_enemy.anims.play('attack_watcher', true);
            this.watcher_enemy.flipX = true;
            this.watcher_enemy.body.offset.x=30;
            this.watcher_enemy.body.offset.y=22;    
        }
        if(this.watcher_enemy.x < this.player.x){
            this.watcher_enemy.anims.play('attack_watcher', true);
            this.watcher_enemy.flipX = false;
            this.watcher_enemy.body.offset.x=15;
            this.watcher_enemy.body.offset.y=22;
        }
    //---------WATCHER ANIMATION ABOVE------

        // this.coinCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-60);
        // // if(this.keyESC.isDown){
        // //     this.scene.pause();
        // //     this.scene.launch(Constants.Scenes.pause);
        // // }
        // this.level2Text.setPosition(this.player.body.position.x-75, this.player.body.position.y-70);
        // this.lifeCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-80);
        // // if(this.crewels==this.totalCoin){
        //     // this.scene.pause();
        //     // this.scene.launch(Constants.Scenes.nameInput, this.scene);
        //     console.log(this.scene.key)
        //     this.scene.start(Constants.Scenes.nameInput, [this.crewels, this.scene]);
        // }

        // update shield position
        if (this.shieldStatus === 1) {
            this.shield.x = this.player.x;
            this.shield.y = this.player.y + 17;
        }

        // reset startTime if pause menu was opened
        if (this.paused) {
            this.paused = false;
            this.startTime = new Date();
        }

    }

    //function to handle moving platforms horizontally.
    //takes a platform object and two bounds, where bound1 = min y val and bound2 = max y val.
    //it also takes a speed value which is the velocity to move by.
    //would lke to move this method to constants when organizing.
    moveplatformhorizontal(obj, bound1, bound2, speed) {

        if(obj.x <= bound1) {

            // console.log("this1")
            obj.setVelocityX(speed);

        } else if (obj.x >= bound2) {
            // console.log("this2")

            obj.setVelocityX(-1 * speed);

        }
        // console.log(obj.x)
    }

    // playerHitdoor1()
    // {
    //     this.scene.start(Constants.Scenes.lvl1_2,this.data);
    // }
    playerHitdoor2()
    {
        this.updateTimeElapsed();

        // update score
        this.data.score += 100;

        // switch scene to next level
        this.scene.start(Constants.Scenes.lvl2_3,this.data);
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
            // this.data.doubleJump -= 1;
        }
    }

    collectcoin (player, coin){
        coin.disableBody(true, true);

        this.data.crewels += 1;
        this.coinCount.setText('crewels: ' + this.data.crewels);

        // play coin collection sound
        this.sound.play(Constants.SFX.coin);
    }
    playerHitQuestionBlock(player, question_block, wall){
        // wall.disableBody(true,true);
        //  question_block.disableBody(true,true);
        this.wall.destroy();
        this.question_block.destroy();
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
    // bigboy_ATTACK()
    //{
    //  this.bigboy_enemy.body.setSize(this.player.width/1,this.player.height/1,true);
    //  this.bigboy_enemy.body.setSize(64,64,true);
    //}

    updateTimeElapsed(){
        // update time elapsed
        this.endTime = new Date();
        this.data.timeElapsed += Math.round((this.endTime - this.startTime) / 1000);
        console.log(this.data.timeElapsed + " seconds");
    }
}