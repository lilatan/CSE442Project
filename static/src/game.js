import { leaderboard } from "./scenes/menus/leaderboard.js";
import { mainMenu } from "./scenes/menus/mainmenu.js";
import { optionsMenu } from "./scenes/menus/options.js";
import { controlsScene } from "./scenes/menus/controls.js";
import { pauseMenu } from "./scenes/menus/pausemenu.js";
import { mainMenuLoad } from "./scenes/menus/mainLoadingScreen.js";
import { nameInput } from "./scenes/menus/nameInput.js";
import { level1 } from "./scenes/game/level1.js";
import { level2 } from "./scenes/game/level2.js";
import { level3 } from "./scenes/game/level3.js";
import { level4 } from "./scenes/game/level4.js";
import { level1_2 } from "./scenes/game/level1_2.js";
import { level2_3 } from "./scenes/game/level2_3.js";
import { level3_4 } from "./scenes/game/level3_4.js";
import { levelsMenu } from "./scenes/menus/levelsMenu.js"
import { audioMenu } from "./scenes/menus/options_audio.js";
import { shop } from "./scenes/game/shop.js";


import { Constants } from "./Constants.js";

var config = {
    // width:800,
    // height:600,
    backgroundColor: 0x000000,
    // transparent: true,
    scene:[
        mainMenuLoad,
        mainMenu,
        leaderboard,
        optionsMenu,
        audioMenu,
        controlsScene,
        pauseMenu,
        nameInput,
        level1,
        level2,
        level3,
        level4,
        levelsMenu,
        shop,
        level1_2,
        level2_3,
        level3_4
       
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 700},
            debug: true
        }
    },
    audio:{
        disableWebAudio: true,
        volume: 5,
        music: Constants.BGM.default
    },
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        width:800, //800
        height:600, //600
        min: {
            width: 800,
            height: 600
        },
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}
var crewel = new Phaser.Game(config);
// crewel.config.audio.volume = 0.05;

