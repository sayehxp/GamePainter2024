import { BotPlayer } from "./BotPlayer.js";


export class TinyBot extends BotPlayer {
    constructor(gameBoard, player, x, y, botId) {

        super(gameBoard, x, y, `bot${botId}`, player.color);

        this.player = player;
        this.size = 20
        this.radius = this.size / 2;
        this.playerShadow.style.width = `${this.size}px`
        this.playerImage.src = player.playerImage.src

        this.playerImage.classList.add('rotation')

        this.playerImage.style.width = `${this.size}px`
        this.playerImage.style.height = `${this.size}px`;

        this.playerShadow.style.display = `none`

        this.intervalBot;
        this.playerImage.style.top = `${this.y - this.playerImage.clientHeight / 2}px`;
        this.playerImage.style.left = `${this.x - this.playerImage.clientWidth / 2 + 5}px`;
    }

    start() {
        this.intervalBot = setInterval(() => {
            this.update();
            this.draw();
        }, 10)
    }


    stop() {
        // this.playerImage.style.display = `none`
        this.playerImage.style.transitionDuration = '0.5s'
        this.playerImage.style.opacity = `0`
        clearInterval(this.intervalBot);
        //remove botId
    }


}


