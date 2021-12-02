export class dataFile {

    crewels;
    doubleJump;
    dash;
    wallJump;
    currentLevel;
    lives;
    shield;
    restarted_level_2;
    restarted_level_3;
    restarted_level_4;
    score;

    constructor(){
        this.score = 0;
        this.crewels = 0;
        this.doubleJump = 0;
        this.dash = 0;
        this.wallJump = 0;
        this.lives = 1;
        this.shield = 0;
        this.restarted_level_2 = false;
        this.restarted_level_3 = false;
        this.restarted_level_4 = false;
    }
}