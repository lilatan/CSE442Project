import { leaderboard } from "./scenes/menus/leaderboard.js";
import { mainMenu } from "./scenes/menus/mainmenu.js";
import { optionsMenu } from "./scenes/menus/options.js";
import { loadGame } from "./scenes/menus/loadgamemenu.js";
import { controlsScene } from "./scenes/menus/controls.js";
import { pauseMenu } from "./scenes/menus/pausemenu.js";
import { mainMenuLoad } from "./scenes/menus/mainLoadingScreen.js";
import { nameInput } from "./scenes/menus/nameInput.js";
import { level1 } from "./scenes/game/level1.js";
//figure out way to not import every single scene in here

var config = {
    // width:800,
    // height:600,
    backgroundColor: 0x000000,
    // transparent: true,
    scene:[mainMenuLoad, mainMenu, leaderboard, optionsMenu, loadGame, controlsScene, pauseMenu, nameInput, level1],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 700},
            debug: false
        }
    },
    audio:{
        disableWebAudio: true
    },
    dom: {
        createContainer: true
    },
    scale: {
        mode: Phaser.Scale.FIT,
        width:800,
        height:600,
        min: {
            width: 800,
            height: 600
        },
        autoCenter: Phaser.Scale.CENTER_BOTH
    }
}
var crewel = new Phaser.Game(config);

