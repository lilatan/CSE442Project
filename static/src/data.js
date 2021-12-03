export class dataFile {

    crewels = 0;
    doubleJump;
    dash;
    wallJump;
    currentLevel;
    lives;
    shield;
    restarted_level_2;

    constructor(){
        this.crewels = 0;
        this.doubleJump = 0;
        this.dash = 0;
        this.wallJump = 0;
        this.lives = 1;
        this.shield = 0;
        this.restarted_level_2 = false;
    }
}