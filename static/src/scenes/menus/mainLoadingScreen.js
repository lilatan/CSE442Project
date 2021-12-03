import { Constants } from "/static/src/Constants.js";

export class mainMenuLoad extends Phaser.Scene {
    constructor(){
        super(Constants.Scenes.mainMenuLoad);
    }

    keySpace;
    preload(){
        this.load.image('background', '/static/src/assets/cyber_city_lvl2.png');
        this.load.image('ground', '/static/src/assets/cyberpunk_platform.png');
        this.load.image('ground4', '/static/src/assets/twirly_platform.png');

        this.load.image('coin', '/static/src/assets/single_coin.png');

        this.load.image('spike', '/static/src/assets/spikes.png');
        this.load.image('wall', '/static/src/assets/stone_wall1.png');
        this.load.image('question_block', '/static/src/assets/question_mark_block.png');
        this.load.image('block', '/static/src/assets/cyberpunk_block.png');
        this.load.image('pillar', '/static/src/assets/pillar.png');

        this.load.video('background1_2', '/static/src/assets/background_1_2.mp4', 'loadeddata', false, true);
        this.load.image('ground1_2', '/static/src/assets/sand_platform.png');

        this.load.video('background2_3', '/static/src/assets/background_2_3.mp4', 'loadeddata', false, true);

        this.load.video('background3_4', '/static/src/assets/background_3_4.mp4', 'loadeddata', false, true);

        this.load.video('boss_background_4', '/static/src/assets/ssbb_background_4.mp4', 'loadeddata', false, true);

        this.load.image('shop', '/static/src/assets/shop.png');
        this.load.image('shield', '/static/src/assets/assets_2/shield.png');

        this.load.spritesheet('player_one_walk', '/static/src/assets/assets_2/walk.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_death', '/static/src/assets/assets_2/death.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_idle_sheet', '/static/src/assets/assets_2/idle.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('player_one_jump', '/static/src/assets/assets_2/jump.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('big_boy_walk', '/static/src/assets/assets_2/walk_bigboy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('big_boy_attack', '/static/src/assets/assets_2/attack_bigboy.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('big_boy_idle', '/static/src/assets/assets_2/idle_bigboy.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('watcher_attack', '/static/src/assets/assets_2/attack_watcher.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('watcher_idle', '/static/src/assets/assets_2/idle_watcher.png', { frameWidth: 64, frameHeight: 64 });
        this.load.spritesheet('watcher_walk', '/static/src/assets/assets_2/walk_watcher.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('flying_walk', '/static/src/assets/assets_2/flying_alien.png', { frameWidth: 64, frameHeight: 64 });

        this.load.spritesheet('boss_sheet', '/static/src/assets/assets_2/boss_spritesheet.png', { frameWidth: 140, frameHeight:93 });

        this.load.image('detonator', '/static/src/assets/detonator.png');
        this.load.image('dynamite', '/static/src/assets/dynamite.png');
        this.load.spritesheet('explosions', '/static/src/assets/explosions.png', { frameWidth: 64, frameHeight: 64 });

    }
    create(){
        var loading = new Phaser.GameObjects.Text(this, 200,150,'LOADING...', {fill: '#ffffff'});
        loading.setFontSize(72);
        this.add.existing(loading);
        
        // var e = new Date().getTime()+(5*1000);
        // while(new Date().getTime()<=e){}
        
        // loading.setVisible(false);
        var prompt = new Phaser.GameObjects.Text(this, 200,200,'Press SPACE', {fill: '#ffffff'});
        prompt.setFontSize(72);
        this.add.existing(prompt);
        this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.keySpace.on('up',()=>this.next());
    }
    next(){
        this.scene.start(Constants.Scenes.mainMenu);
    }
}