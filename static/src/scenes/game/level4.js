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
    door1;
    door2;
    crewels = 0;
    coinCount;
    lifeCount;
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
    bossHealth = 100;

    inAir;
    invincible;

    init(data){
        this.data = data;
        this.invincible = false;
    }

    preload(){
        this.load.image('background4', '/static/src/assets/sand_gw2.png');
        this.load.image('ground4', '/static/src/assets/sand_platform.png');
        this.load.image('coin4', '/static/src/assets/single_coin.png');
        //this.load.image('bosshealth', 'static/src/assets/images/healthbar.png');
        this.load.image('spike4', '/static/src/assets/spikes.png');
        this.load.spritesheet('player_one_walk', '/static/src/assets/assets_2/walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_death', '/static/src/assets/assets_2/death.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_idle_sheet', '/static/src/assets/assets_2/idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_jump', '/static/src/assets/assets_2/jump.png', { frameWidth: 64, frameHeight: 64 });
    }

    create(){

        console.log("im at level 4");
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

        this.add.image(400, 300, 'background4');

        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground4').setScale(2).refreshBody();

        this.platforms.create(150, 300, 'ground4').setScale(0.5).refreshBody();
        this.platforms.create(400, 230, 'ground4').setScale(0.5).refreshBody();
        this.platforms.create(100, 400, 'ground4');
        this.platforms.create(700, 450, 'ground4');
        this.platforms.create(550, 150, 'ground4');
        this.platforms.create(25, 125, 'ground4');

        this.spikes.create(400, 500, 'spike4');

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

        this.cursors = this.input.keyboard.createCursorKeys();

        this.coin = this.physics.add.group({
            key: 'coin4',
            repeat: this.totalCoin-1,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.coin.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });

        this.coinCount = this.add.text(16, 16, 'crewels:' + this.data.crewels, { fontSize: '12px', fill: '#000' });
        this.level4Text = this.add.text( 16,24, 'Level 4', { fontSize: '12px', fill: '#000' });
        this.lifeCount = this.add.text(16, 32, 'lives: ' + this.data.lives, { fontSize: '12px', fill: '#000' });
        this.bossHealth = this.add.text(16, 40, 'Boss Health: ' + this.bossHealth + '%', { fontSize: '12px', fill: '#000' });
        this.crewels = 0;

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.coin, this.platforms);

        this.physics.add.overlap(this.player, this.coin, this.collectcoin, null, this);

        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.setZoom(2);
       
        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null, this);
        this.physics.add.overlap(this.player, this.door1, this.playerHitdoor1,null, this);
        this.physics.add.overlap(this.player, this.door2, this.playerHitdoor2,null, this);

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
         
          //  player.scale.setTo(-1,1);
        }
        else //else
        {
            this.player.setVelocityX(0); 
            this.player.anims.play('idle',true);
         
        }

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
         
          // this.player.anims.play('jump', this.player)
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
        this.coinCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-60);
        this.level4Text.setPosition(this.player.body.position.x-75, this.player.body.position.y-70);
        this.lifeCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-80);


    }
    playerHitdoor1()
    {
        this.scene.start(Constants.Scenes.lvl3_4,this.data);
    }
    playerHitdoor2()
    {
        this.scene.start(Constants.Scenes.lvl1,this.data);
    }
    playerHitSpike(){
        if (!this.invincible) {
            // invincibility frame
            this.invincible = true;
            setTimeout(() => {  this.invincible = false; }, 500);

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
    transition(){
        // this.scene.start(Constants.Scenes.lvl1,this.data);
        
    }
}