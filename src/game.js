import { leaderboard } from "./scenes/menus/leaderboard";
import { mainMenu } from "./scenes/menus/mainmenu";

var config = {
    width:1000,
    height:800,
    backgroundColor: 0x000000,
    scene:[mainMenu, leaderboard]
}
var game = new Phaser.Game(config);
