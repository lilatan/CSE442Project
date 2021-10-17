import { Constants } from "../../Constants.js";

export class nameInput extends Phaser.Scene{
    constructor(){
        super(Constants.Scenes.nameInput);
    }
    score;
    level;
    username;
    element;
    init(data){//[Score, Game Scene]
        this.score = data[0];
        this.level = data[1];
    }
    preload(){
        this.load.html('nameform', '/static/src/assets/html/nameform.html');
    }
    create(){
        this.scene.bringToTop();
        var prompt = this.add.text(300,100, "Enter your name", {fill: '#ffffff', fontSize: 48});
        this.element = this.add.dom(200, 400).createFromCache('nameform');
        this.element.addListener('click');
        this.element.on('click', ()=>this.getUsername());
    }

    getUsername(event){
        if(event.target.name ==='enterButton'){
            this.username = this.element.getChildByName('nameField');
            if(this.username !==''){
                this.element.removeListener('click');
                this.send_leaderboard_entry(this.username, this.score, this.level.key);
                this.scene.stop(this.level.key);
                this.scene.start(Constants.Scenes.leaderboard);
            }
        }
    }
    send_leaderboard_entry(name, score, level){
        var xhr = new XMLHttpRequest();
        xhr.open("POST", '/update-leaderboard', true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({
            name: name,
            score: score,
            level: level
        }));
    }
}