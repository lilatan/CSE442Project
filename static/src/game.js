import { leaderboard } from "./scenes/menus/leaderboard.js";
import { mainMenu } from "./scenes/menus/mainmenu.js";
import { optionsMenu } from "./scenes/menus/options.js";
import { loadGame } from "./scenes/menus/loadgamemenu.js";
//figure out way to not import every single scene in here

var config = {
    width:1000,
    height:800,
    backgroundColor: 0x000000,
    // transparent: true,
    scene:[mainMenu, leaderboard, optionsMenu, loadGame]
}
var crewel = new Phaser.Game(config);
