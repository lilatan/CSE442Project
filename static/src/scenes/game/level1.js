import { Constants } from "/static/src/Constants.js"
// import { pause } from "../menus/pausemenu.js";
export class level1 extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.lvl1);
    }
    player;
    coin;
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


    init(){

    }

    preload(){
        this.load.image('background', '/static/src/assets/sand_gw2.png');
        this.load.image('ground', '/static/src/assets/sand_platform.png');
        this.load.image('coin', '/static/src/assets/single_coin.png');
        this.load.image('player_one', '/static/src/assets/spear_player.png');
        this.load.image('spike', '/static/src/assets/spikes.png');
    }

    create(){

        console.log("im at level 1");
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        this.keyESC.on('up',()=>this.pause());
        
        

        this.add.image(400, 300, 'background');

        this.platforms = this.physics.add.staticGroup();
        this.spikes = this.physics.add.staticGroup();

        this.platforms.create(400, 568, 'ground').setScale(2).refreshBody();

        this.platforms.create(150, 300, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(400, 230, 'ground').setScale(0.5).refreshBody();
        this.platforms.create(100, 400, 'ground');
        this.platforms.create(700, 450, 'ground');
        this.platforms.create(550, 150, 'ground');
        this.platforms.create(25, 125, 'ground');

        this.spikes.create(400, 500, 'spike');

        this.player = this.physics.add.sprite(100, 450, 'player_one');

        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.coin = this.physics.add.group({
            key: 'coin',
            repeat: this.totalCoin-1,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.coin.children.iterate(function (child) {

            child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.4));

        });

        this.coinCount = this.add.text(16, 16, 'crewels: 0', { fontSize: '12px', fill: '#000' });

        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.coin, this.platforms);

        this.physics.add.overlap(this.player, this.coin, this.collectcoin, null, this);

        this.cameras.main.setBounds(0, 0, 800, 600);
        this.cameras.main.startFollow(this.player);
<<<<<<< Updated upstream
        this.cameras.main.setZoom(3);
       
        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null, this);

=======
        this.cameras.main.setZoom(1.5);
        this.physics.add.overlap(this.player, this.spikes, this.playerHitSpike,null,this)
        this.increasing = false 
        
>>>>>>> Stashed changes
    }

    update(){
        if (this.cursors.left.isDown || this.keyA.isDown)
        {
            this.player.setVelocityX(-200);

         
        }
        else if (this.cursors.right.isDown || this.keyD.isDown)
        {
            this.player.setVelocityX(200);
        }
        else
        {
            this.player.setVelocityX(0); 
        }

        if (this.cursors.up.isDown && this.player.body.touching.down || this.keyW.isDown && this.player.body.touching.down)
        {
            this.player.setVelocityY(-400);
        }
        if (this.cursors.down.isDown || this.keyS.isDown)
        {
            this.player.setVelocityY(170);
        }
        this.coinCount.setPosition(this.player.body.position.x-75, this.player.body.position.y-60);
        // if(this.keyESC.isDown){
        //     this.scene.pause();
        //     this.scene.launch(Constants.Scenes.pause);
        // }
        if(this.crewels==this.totalCoin){
            // this.scene.pause();
            // this.scene.launch(Constants.Scenes.nameInput, this.scene);
            console.log(this.scene.key)
            this.scene.start(Constants.Scenes.nameInput, [this.crewels, this.scene]);
        }
    }

    playerHitSpike(){
        this.scene.start(Constants.Scenes.nameInput, [this.crewels, this.scene]);
    }

    collectcoin (player, coin){
        coin.disableBody(true, true);

        this.crewels += 1;
        this.coinCount.setText('crewels: ' + this.crewels);
    }

    pause(){
        this.scene.launch(Constants.Scenes.pause,this.scene);
        // console.log(this.scene);
        this.scene.pause();
    }
}
