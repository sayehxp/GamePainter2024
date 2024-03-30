export class Player {

    constructor(gameBoard, x, y, name) {
        this.gameBoard = gameBoard;
        this.name = name;
        this.context = this.gameBoard.context
        this.x = x;
        this.y = y;
        this.speed = 4;
        this.radius = 25
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.playerImage = document.getElementById(name)
    }

    update(keys) {

        //right
        if (this.gameBoard.keyboard.keys.includes(keys.right)) {
            this.x += this.speed;
        }
        //left
        if (this.gameBoard.keyboard.keys.includes(keys.left)) {
            this.x -= this.speed;
        }
        //up
        if (this.gameBoard.keyboard.keys.includes(keys.up)) {
            this.y -= this.speed;
        }
        //down
        if (this.gameBoard.keyboard.keys.includes(keys.down)) {
            this.y += this.speed;
        }
        //most right
        if (this.x + this.radius > this.gameBoard.width) {
            this.x = this.gameBoard.width - this.radius;
        }
        //most left
        if (this.x < this.radius) {
            this.x = this.radius;
        }
        //most down
        if ((this.y + this.radius) > this.gameBoard.height) {
            this.y = this.gameBoard.height - this.radius;
        }
        //most up
        if (this.y < this.radius) {
            this.y = this.radius;
        }

        if (this.gameBoard.keyboard.keys.length) {
            this.recognizeGift()
        }

    }


    recognizeGift() {
        const safeZone = 0;
        //points of gift
        const startPoint = this.x >= this.gameBoard.gift.points.x - safeZone && this.y >= this.gameBoard.gift.points.y - safeZone;
        const endPoint = this.x <= this.gameBoard.gift.points.x + this.gameBoard.gift.size + safeZone && this.y <= this.gameBoard.gift.points.y + this.gameBoard.gift.size + safeZone
        if (startPoint && endPoint) {


            switch (this.gameBoard.gift.selectedGift) {
                case 'speed':
                    this.speed += 3;
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


                default:
                    break;
            }



            delete this.gameBoard.gift.points.x
            delete this.gameBoard.gift.points.y
        }
    }

    draw() {

        this.context.fillStyle = this.name;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();



        this.playerImage.style.top = `${this.y - this.playerImage.clientHeight/2}px`;
        this.playerImage.style.left = `${this.x - this.playerImage.clientWidth/2 }px`;



    }
}


