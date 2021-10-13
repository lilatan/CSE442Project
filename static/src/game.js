import { leaderboard } from "./scenes/menus/leaderboard.js";
import { mainMenu } from "./scenes/menus/mainmenu.js";


var config = {
    width:1000,
    height:800,
    backgroundColor: 0x000000,
    // transparent: true,
    scene:[mainMenu,leaderboard]
}
var crewel = new Phaser.Game(config);