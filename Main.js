import { Player } from './Player.js';
import { Keyboard } from './Keyboard.js';
import { PlayerControls } from './PlayerControls.js';
import { Background } from './Background.js';
import { Gift } from './Gift.js';
import { TimeLine } from './Timeline.js';
import { BotPlayer } from './BotPlayer.js';



class GameBoard {

    constructor(width, height, context) {
        this.width = width;
        this.height = height;
        this.context = context;
        this.players = {
            // player1: new Player(this, 100, 100, 'green', "#008b68"),
            player2: new Player(this, 200, 100, 'blue', '#4062ca'),
            player3: new Player(this, 300, 100, 'yellow', '#8061bb')
        }
        this.keyboard = new Keyboard();
        this.background = new Background(this, 'offwhite');
        this.gift = new Gift(this, 20, 3 * 100);
        this.timeline = new TimeLine();
        this.botPlayer = new BotPlayer(this, 400, 100, 'green', '#008b68');

    }

    update() {
        this.gift.update();
        this.timeline.update();
        for (const player in this.players) {
            this.players[player].update(PlayerControls(player));
            this.players[player].recognizeGift();
        }
        this.botPlayer.update()
    }


    draw() {
        this.gift.draw();
        this.timeline.draw();
        for (const player in this.players) {
            this.players[player].draw();
        }
        this.botPlayer.draw();

    }

}





const canvas = document.getElementById('canvas1');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth - 10;
canvas.height = window.innerHeight - 50;

const gameBoard = new GameBoard(canvas.width, canvas.height, context);
function renderFrame() {
    gameBoard.update();
    gameBoard.draw();
    requestAnimationFrame(renderFrame);

}




renderFrame();

