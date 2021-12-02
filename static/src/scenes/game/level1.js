import { Constants } from "/static/src/Constants.js"

export class level1 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl1);
    }
    player;
    coin;
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
    paused = false;

    init(data){
        this.data = data;
        this.invincible = false;
        this.data.currentLevel = "1";
        this.data.crewels = 0;
        this.timeElapsed = 0;
        this.shieldStatus = this.data.shield;
    }

    preload(){
        this.load.image('background1', '/static/src/assets/cyber_city_lvl2.png');
        this.load.image('ground1', '/static/src/assets/cyberpunk_platform.png');
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
        this.load.image('wall2', '/static/src/assets/stone_wall1.png');
        this.load.image('question_block2', '/static/src/assets/question_mark_block.png');

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

       this.door2 = this.physics.add.staticGroup();
       this.door2.create(862, 300, null).setScale(4).refreshBody();
       this.door2.create(862, 400, null).setScale(4).refreshBody();
       this.door2.create(862, 500, null).setScale(4).refreshBody();
        
        
        this.add.image(400, 300, 'background1');

        this.platforms = this.physics.add.staticGroup();
       // this.pillar = this.physics.add.staticGroup();
        this.spikes = this.physics.add.group();
        


        this.platforms.create(400, 630, 'ground1').setScale(2).refreshBody();

   

        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //tutorial level part 1: jumping and basic movement 
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        this.platforms.create(25,500,'ground1').setScale(.25).refreshBody(); 
        this.platforms.create(100, 400, 'ground1').setScale(.15, .25).refreshBody(); 
        this.platforms.create(25, 300, 'ground1').setScale(.15, .25).refreshBody(); 
        this.platforms.create(100, 200, 'ground1').setScale(.15, .25).refreshBody(); 


         //possible future task: change color of the text 

         this.add.text(16,530, 'Follow the Arrows!', { fontSize: '12px', fill: '#fff' }).setScrollFactor(1);
         this.add.text(16,550, 'Use keys a or d to move left or right!' , { fontSize: '12px', fill: '#fff' }).setScrollFactor(1);
 
         //want vertical text for jump as in press w to jump then an arrow upwards. 
         //get an asset for upwards arrows
         this.add.text(10,410, 'press w to jump ' , { fontSize: '12px', fill: '#fff' }).setScrollFactor(1);
         this.add.text(10,426, 'w to jump and press' , { fontSize: '12px', fill: '#fff' }).setScrollFactor(1);
         this.add.text(10,442, ' \'a\' or \'d\' to control the direction' , { fontSize: '12px', fill: '#fff' }).setScrollFactor(1);
         this.add.text(10,458, 'of the jump' , { fontSize: '12px', fill: '#fff' }).setScrollFactor(1);

        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //tutorial level part 1: end
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

         //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //tutorial level part 2:  introduce moving platforms 
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        this.tutmp1 = this.physics.add.image(168,200, 'ground1').setScale(.15,.25); //create moving platforms for tutorial part 2.
        this.tutmp2 = this.physics.add.image(500,200, 'ground1').setScale(.15,.25); 
        
        this.tutmp1.setImmovable(true)
        this.tutmp2.setImmovable(true)

        this.tutmp1.body.allowGravity = false; //set them to not allow gravity. 
        this.tutmp2.body.allowGravity = false;  


        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
        //tutorial level part 2:  introduce moving platforms 
        //--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

       
        this.spike1 = this.spikes.create(450, 500, 'spike1').body.setAllowGravity(false);

        this.player = this.physics.add.sprite(100, 450, 'player_one_idle');
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

        this.coinCount = this.add.text( 16,16, 'crewels:' + this.data.crewels, { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);
        this.level1Text = this.add.text( 16,24, 'Level 1', { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);
        this.lifeCount = this.add.text(16, 32, 'lives: ' + this.data.lives, { fontSize: '12px', fill: '#fff' }).setScrollFactor(0);

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.coin, this.platforms);
        this.physics.add.collider(this.player, this.tutmp1);
        this.physics.add.collider(this.player, this.tutmp2);
    
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
        this.physics.add.overlap(this.player, this.door2, this.playerHitdoor2,null, this);


        this.question_block = this.physics.add.image(400, 100, 'question_block2');
        this.question_block.setImmovable(true);
        this.question_block.body.allowGravity = false;

        this.wall = this.physics.add.image(740, 550, 'wall2').setScale(.75).refreshBody();
        this.wall.setImmovable(true);
        this.wall.body.allowGravity = false;

        this.tempwallvar = this.physics.add.staticGroup();
        for (var x = 1; x < 8; x++ ) { 
            this.ycord = 550 - (x * 70);
            this.tempwallvar.create(740,this.ycord,'wall2').setScale(1).refreshBody(); 
        }
        this.physics.add.overlap(this.player, this.question_block, this.playerHitQuestionBlock,null, this);
        this.physics.add.collider(this.player, this.wall);
        this.physics.add.collider(this.player, this.tempwallvar);

        // set start time
        this.startTime = new Date();

    }

    update(){
       this.moveplatformhorizontal(this.tutmp1, 170, 300, 30)        

        if (this.spike1.y <= 100) { 
            this.increasingspike1 = true ;

        } 
        if (this.spike1.y >= 300) { 
            this.increasingspike1 = false ;
            // console.log("test");
        }
        if (this.increasingspike1 === true) {
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
    moveplatformhorizontal(obj, bound1, bound2,speed) { 

        if(obj.x <= bound1) { 

            // console.log("this1")
            obj.setVelocityX(speed);

        } else if (obj.x >= bound2) {
            // console.log("this2")
    
            obj.setVelocityX(-1 * speed);

        }
        // console.log(obj.x)

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

                // game ends if lives hit zero
                if (this.data.lives === 0) {
                    this.updateTimeElapsed();

                    // switch scene to graveyard
                    this.scene.start(Constants.Scenes.nameInput, this.data);
                }
            }
        }
    }
    playerHitdoor2()
    {
        this.updateTimeElapsed();

        // update score
        this.data.score += 50;

        // switch scene to next level
        this.scene.start(Constants.Scenes.lvl1_2,this.data);
        
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

    playerHitQuestionBlock(player, question_block, wall){
        this.wall.destroy();
        this.question_block.destroy();
        // play coin collection sound
        this.sound.play(Constants.SFX.coin);
    }

    updateTimeElapsed(){
        // update time elapsed
        this.endTime = new Date();
        this.data.timeElapsed += Math.round((this.endTime - this.startTime) / 1000);
        console.log(this.data.timeElapsed + " seconds");
    }
}
