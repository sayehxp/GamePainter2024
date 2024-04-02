import { TimeLine } from "./Timeline.js";
import { bot1 } from './BotMoves.js';


export class Player {

    constructor(gameBoard, x, y, name, color, isBot = false) {
        this.gameBoard = gameBoard;
        this.name = name;
        this.context = this.gameBoard.context
        this.x = x;
        this.y = y;
        this.speed = 3.25;
        this.radius = 25
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.playerImage = document.getElementById(name);
        this.playerShadow = document.getElementById(`${name}_shadow`);
        this.playerGift = undefined;
        this.color = color;
        this.isBot = isBot;
        this.eventLog = {};
        this.timeline = new TimeLine();

    }



    update(keys) {
        if (this.timeline.time < 2000) {
            this.timeline.update()
        }
        if (!this.isBot) {
            this.HumanDrive(keys)
        } else {
            this.BotDrive()
        }


        this.recognizeGift()

        //max right →
        if (this.x + this.radius > this.gameBoard.width) {
            this.x = this.gameBoard.width - this.radius;
        }
        //max left ←
        if (this.x < this.radius) {
            this.x = this.radius;
        }
        //max down ↓
        if ((this.y + this.radius) > this.gameBoard.height) {
            this.y = this.gameBoard.height - this.radius;
        }
        //max up ↑
        if (this.y < this.radius) {
            this.y = this.radius;
        }




    }
    HumanDrive(keys) {
        this.eventLog[this.timeline.time] = this.gameBoard.keyboard.keys
        if (this.gameBoard.keyboard.keys.includes(keys.right)) {
            this.x += this.speed;
        }
        if (this.gameBoard.keyboard.keys.includes(keys.left)) {
            this.x -= this.speed
        }
        if (this.gameBoard.keyboard.keys.includes(keys.up)) {
            this.y -= this.speed
        }
        if (this.gameBoard.keyboard.keys.includes(keys.down)) {
            this.y += this.speed
        }


        if (this.timeline.time >= 2000) {
            console.log(this.eventLog);

        }
    }

    BotDrive() {
 
        //    var keys =  this.gameBoard.keyboard.keys = (bot1[this.timeline.time])
        //  console.log(keys)
        //     if (this.gameBoard.keyboard.keys.includes(keys.right)) {
        //         this.x += this.speed;
        //     }
        //     if (this.gameBoard.keyboard.keys.includes(keys.left)) {
        //         this.x -= this.speed
        //     }
        //     if (this.gameBoard.keyboard.keys.includes(keys.up)) {
        //         this.y -= this.speed
        //     }
        //     if (this.gameBoard.keyboard.keys.includes(keys.down)) {
        //         this.y += this.speed
        //     }
    

        // this.x += this.speed;

        // if (Math.floor(Math.random() * 2)) {

        // }

        // //max right
        // if (this.x + this.radius > this.gameBoard.width) {
        //     this.x = this.gameBoard.width - this.radius;
        // }
    }



    recognizeGift() {
        const safeZone = 0;
        //points of gift
        const startPoint = this.x >= this.gameBoard.gift.points.x - safeZone && this.y >= this.gameBoard.gift.points.y - safeZone;
        const endPoint = this.x <= this.gameBoard.gift.points.x + this.gameBoard.gift.size + safeZone && this.y <= this.gameBoard.gift.points.y + this.gameBoard.gift.size + safeZone
        if (startPoint && endPoint) {
            document.getElementById('gift_sound').play()

            switch (this.gameBoard.gift.selectedGift) {
                case 'speed':
                    this.speed += 2.5;
                    this.playerGift = 'speed'
                    this.gameBoard.gift.clear()
                    break;
                case 'slow':
                    //   this.gameBoard.player1.speed -= 2
                    //   this.gameBoard.player2.speed -= 2
                    //   this.speed += 2;

                    //   setTimeout(() => {
                    //     this.gameBoard.player1.speed += 2
                    //     this.gameBoard.player2.speed += 2
                    //     this.speed -= 2;
                    //   }, 5500);
                    break;
                case 'spot':
                    this.playerGift = 'spot';


                    var yy = this.y
                    if (yy + 200 >= this.gameBoard.height) {
                        yy -= (yy + 200) - this.gameBoard.height
                    }
                    if (yy - 200 <= 0) {
                        yy -= (yy - 200)
                    }


                    drawBigCircle(this.context, this.x, yy, 200, this.color)



                    this.gameBoard.gift.clear()
                    break;

                default:
                    break;
            }



            delete this.gameBoard.gift.points.x
            delete this.gameBoard.gift.points.y
        }
    }

    draw() {

        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();

        if (this.playerGift == 'speed') {
            document.getElementById('electric').style.top = `${this.y - this.playerImage.clientHeight / 2}px`;
            document.getElementById('electric').style.left = `${this.x - this.playerImage.clientWidth / 2}px`;
        }
        this.playerImage.style.top = `${this.y - this.playerImage.clientHeight / 2}px`;
        this.playerImage.style.left = `${this.x - this.playerImage.clientWidth / 2 + 5}px`;


        this.playerShadow.style.top = `${this.y - this.playerImage.clientHeight / 2 + 60}px`;
        this.playerShadow.style.left = `${this.x - this.playerImage.clientWidth / 2 + 18}px`;



    }


}

function drawBigCircle(ctx, x, y, size, color) {

    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();

}
// function drawHeart(ctx, x, y, width, height, color) {




//     ctx.save();
//     ctx.beginPath();
//     var topCurveHeight = height * 0.3;
//     ctx.moveTo(x, y + topCurveHeight);
//     // top left curve
//     ctx.bezierCurveTo(
//         x, y,
//         x - width / 2, y,
//         x - width / 2, y + topCurveHeight
//     );

//     // bottom left curve
//     ctx.bezierCurveTo(
//         x - width / 2, y + (height + topCurveHeight) / 2,
//         x, y + (height + topCurveHeight) / 2,
//         x, y + height
//     );

//     // bottom right curve
//     ctx.bezierCurveTo(
//         x, y + (height + topCurveHeight) / 2,
//         x + width / 2, y + (height + topCurveHeight) / 2,
//         x + width / 2, y + topCurveHeight
//     );

//     // top right curve
//     ctx.bezierCurveTo(
//         x + width / 2, y,
//         x, y,
//         x, y + topCurveHeight
//     );

//     ctx.closePath();
//     ctx.fillStyle = color;
//     ctx.fill();
//     ctx.restore();

// }


