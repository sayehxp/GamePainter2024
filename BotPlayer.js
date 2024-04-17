import { Player } from "./Player.js";
export class BotPlayer extends Player {
    constructor(gameBoard, x, y, name, color) {
        
        super(gameBoard, x, y, name, color);

        this.randomDirections = ["left", "up", "right", "down", "upleft", "upright", "downright", "downleft"];
        this.randomTime = [25, 50, 75, 100, 125, 150];
        this.botDuration = 0;
        this.botDirection = "";
        this.oppositeDirection = {
            left: 'right',
            right: 'left',
            up: 'down',
            down: 'up',
            upleft: 'downright',
            upright: 'downleft',
            downright: 'upleft'
        }
    }

    update() {
        this.boundaries();
        this.giftRecognize();
        if (this.gameBoard.gift.points.x) {
            this.giftAutoPilot()
        } else {
            this.autoDrive();
        }
    }

    giftAutoPilot() {
        if (this.x >= this.gameBoard.gift.points.x && this.x <= this.gameBoard.gift.points.x + this.gameBoard.gift.size) {
            if (this.y < this.gameBoard.gift.points.y) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }
        }
        else if (this.y >= this.gameBoard.gift.points.y && this.y <= this.gameBoard.gift.points.y + this.gameBoard.gift.size) {
            if (this.x < this.gameBoard.gift.points.x) {
                this.x += this.speed;
            } else {
                this.x -= this.speed;
            }
        }
        else {
            if (this.y < this.gameBoard.gift.points.y) {
                this.y += this.speed;
            } else {
                this.y -= this.speed;
            }

            if (this.x < this.gameBoard.gift.points.x) {
                this.x += this.speed;
            } else {
                this.x -= this.speed;
            }
        }



    }
    autoDrive() {
        var maxLeft = this.x == this.radius;
        var maxDown = this.y == this.gameBoard.height - this.radius;
        var maxUp = this.y == this.radius;
        var maxRight = this.x == this.gameBoard.width - this.radius;



        if (this.botDuration != 0) {

            if (maxLeft && this.botDirection.includes('left')) {
                this.botDuration = 1
                // console.log('max', this.botDirection, this.botDuration)
            }
            if (maxDown && this.botDirection.includes('down')) {
                this.botDuration = 1
                // console.log('max', this.botDirection, this.botDuration)
            }

            if (maxUp && this.botDirection.includes('up')) {
                this.botDuration = 1
                // console.log('max', this.botDirection, this.botDuration)
            }

            if (maxRight && this.botDirection.includes('right')) {
                this.botDuration = 1
                // console.log('max', this.botDirection, this.botDuration)
            }

        }


        if (this.botDuration > 0) {
            switch (this.botDirection) {
                case "right":
                    this.x += this.speed
                    break;
                case "left":
                    this.x -= this.speed;
                    break;
                case "up":
                    this.y -= this.speed;
                    break;
                case "down":
                    this.y += this.speed;
                    break;

                case "upleft":
                    this.y -= this.speed;
                    this.x -= this.speed
                    break;
                case "upright":
                    this.y -= this.speed;
                    this.x += this.speed
                    break;
                case "downright":
                    this.y += this.speed;
                    this.x += this.speed
                    break;
                case "downleft":
                    this.y += this.speed;
                    this.x -= this.speed
                    break;
                default:
                    break;
            }

            this.botDuration -= 1;

        } else {
            this.POSTBotmOVE();
        }
    }
    POSTBotmOVE() {
        this.botDirection = this.randomDirection(this.botDirection)
        this.botDuration = this.randomDuration()

    }
    randomDirection(prevDirection) {
        // console.log('prev direction', prevDirection)
        var direction = this.randomDirections[Math.floor(Math.random() * this.randomDirections.length)];
        if (prevDirection.includes(direction) || prevDirection == this.oppositeDirection[direction]) {
            return this.randomDirection(prevDirection)
        } else {
            // console.log('new direction == ', direction)
            return direction;
        }
    }
    randomDuration() {
        var duration = this.randomTime[Math.floor(Math.random() * this.randomTime.length)];
        return duration;
    }



}