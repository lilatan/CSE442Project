import { leaderboard } from "./scenes/menus/leaderboard.js";
import { mainMenu } from "./scenes/menus/mainmenu.js";
import { optionsMenu } from "./scenes/menus/options.js";
import { loadGame } from "./scenes/menus/loadgamemenu.js";
import { pauseMenu } from "./scenes/menus/pausemenu.js";
// import { mainMenuLoad } from "./scenes/menus/mainLoadingScreen.js";
import { level1 } from "./scenes/game/level1.js";
//figure out way to not import every single scene in here

var config = {
    width:800,
    height:600,
    backgroundColor: 0x000000,
    // transparent: true,
    scene:[mainMenu, leaderboard, optionsMenu, loadGame,pauseMenu, level1],
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
}
var crewel = new Phaser.Game(config);
