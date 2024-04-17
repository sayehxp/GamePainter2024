import { Player } from './Player.js';
import { Keyboard } from './Keyboard.js';
import { PlayerControls } from './PlayerControls.js';
import { Background } from './Background.js';
import { Gift } from './Gift.js';
import { TimeLine } from './Timeline.js';
import { BotPlayer } from './BotPlayer.js';
import { TinyBot } from './TinyBot.js';
import { LeaderBoard } from './LeaderBoard.js';
const playerColors = {
    green: 'rgb(0,139,104)',
    blue: 'rgb(64,98,202)',
    purple: 'rgb(157, 132, 213)',
    red: 'rgb(255, 124, 111)',
    orange: 'rgb(236,169,64)',
    brown: 'rgb(162,116,106)',
    black: 'rgb(77,68,88)'
}


export class GameBoard {

    constructor() {
        this.canvas = document.getElementById('canvas1');
        this.canvas.width = window.innerWidth - 10;
        this.canvas.height = window.innerHeight - 50;
        this.context = this.canvas.getContext('2d');
        this.width = this.canvas.width;
        this.height = this.canvas.height;
        this.players = {}
        this.bots = {}
        this.keyboard = new Keyboard();
        this.background = new Background(this, 'offwhite');
        this.gift = new Gift(this, 1, 100);
        this.timeline = new TimeLine();
        this.leaderboard = new LeaderBoard(this, 2000);
    }

    addPlayers(players) {
        players.forEach((player, i) => {
            this.players[`player${i + 1}`] = new Player(this, 100 * i, 100 * i, player, playerColors[player])
        })
    }
    addBots(bots) {
        bots.forEach((bot, i) => {
            this.bots[`bot${i + 1}`] = new BotPlayer(this, 300 * i, 100 * i, bot, playerColors[bot])
        })
    }

    addTinyBot(player, x, y , botId) {
        const tinyBot = new TinyBot(this, player, x, y , botId);

        setTimeout(() => {
            tinyBot.start();
        }, 1000);

        setTimeout(() => {
            tinyBot.stop();
        }, 5000);

    }
    update() {


        if (this.timeline.time < 2000) {
            this.gift.update();
            // this.timeline.update();
            // this.leaderboard.update();
            for (const player in this.players) {
                this.players[player].update(PlayerControls(player));
                this.players[player].giftRecognize();
            }
            for (const bot in this.bots) {
                this.bots[bot].update()
            }





        }
    }
    draw() {
        this.gift.draw();
        // this.timeline.draw();

        for (const player in this.players) {
            this.players[player].draw();
        }

        for (const bot in this.bots) {
            this.bots[bot].draw()
        }


    }


    show() {
        document.getElementById('gameBoard').style.display = "block";
    }
    close() {
        document.getElementById('gameBoard').style.display = "none"
    }
}