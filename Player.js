
const generateImg = (name) => {
    const img = document.createElement('img')
    img.src = `./images/${name}.png`
    img.setAttribute('class', 'playerImg')
    img.setAttribute('id', name + 'img')
    document.body.appendChild(img)
    return img
}

const generateShadow = (name) => {
    const shadow = document.createElement('shadow')
    shadow.setAttribute('class', 'playerShadow')
    shadow.setAttribute('id', `${name}_shadow`)
    document.body.appendChild(shadow)
    return shadow
}

export class Player {

    constructor(gameBoard, x, y, name, color) {
        this.gameBoard = gameBoard;
        this.context = gameBoard.context
        this.name = name;
        this.color = color;
        this.defaultSpeed = 3.25;
        this.speed = 3.25;
        this.y = y;
        this.x = x;
        this.radius = 25;
        this.defaultRadius = 25;
        this.width = this.radius * 2;
        this.height = this.radius * 2;
        this.playerImage = generateImg(name);
        this.playerShadow = generateShadow(name)
        this.playerGift = undefined;
    }


    update(keys) {
        this.drive(keys);
        this.boundaries();
        this.giftRecognize();
        this.crashRecognize();
    }

    drive(keys) {
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
    }
    boundaries() {
        /*          max right   (→)             */
        if (this.x + this.radius > this.gameBoard.width) {
            this.x = this.gameBoard.width - this.radius;
        }
        /*          max left    (←)             */
        if (this.x < this.radius) {
            this.x = this.radius;
        }
        /*          max down    (↓)             */
        if ((this.y + this.radius) > this.gameBoard.height) {
            this.y = this.gameBoard.height - this.radius;
        }
        /*          max up     (↑)              */
        if (this.y < this.radius) {
            this.y = this.radius;
        }
    }
    giftRecognize() {

        const giftBody = {
            x: this.gameBoard.gift.points.x,
            y: this.gameBoard.gift.points.y,
            size: this.gameBoard.gift.size,
            border: this.gameBoard.gift.size / 3
        }
        const isMatch = mathcGift(giftBody, this.x, this.y)
        if (isMatch) {

            playGiftSound();
            switch (this.gameBoard.gift.selectedGift) {
                case 'speed':
                    this.speed = 5;
                    this.playerGift = 'speed'
                    break;
                case 'crawlers':
                    this.playerGift = 'crawlers';
                    for (const key in this.gameBoard.players) {
                        const player = this.gameBoard.players[key]
                        if (player.name != this.name) {
                            //top
                            this.gameBoard.addTinyBot(this, this.x, this.y - this.radius * 2, 4);
                            //right
                            this.gameBoard.addTinyBot(this, this.x + this.radius * 2, this.y, 1);
                            //bottom
                            this.gameBoard.addTinyBot(this, this.x, this.y + this.radius * 2, 3);
                            //left
                            this.gameBoard.addTinyBot(this, this.x - this.radius * 2, this.y, 2);

                        }
                    }

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

                    break;
                case 'big':
                    this.playerGift = 'big';
                    this.radius = this.defaultRadius * 1.5;
                    this.playerImage.style.transitionDuration = '1s'
                    this.playerImage.style.transitionProperty = 'scale'
                    this.playerImage.style.scale = 1.25;
                    break;
                default:

                    break;
            }


            this.gameBoard.gift.clear()
            delete this.gameBoard.gift.points.x
            delete this.gameBoard.gift.points.y

        }
    }
    crashRecognize() {

        for (const key in this.gameBoard.players) {
            const player = this.gameBoard.players[key]
            if (player.name != this.name) {

                const body = {
                    x: player.x,
                    y: player.y,
                    size: player.radius,
                    border: player.radius * 1.5
                }

                const isMatch = matchPlayer(body, this.x, this.y);

            }
        }
    }
    draw() {

        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        this.context.closePath();
        this.context.fill();

        this.playerImage.style.top = `${this.y - this.playerImage.clientHeight / 2}px`;
        this.playerImage.style.left = `${this.x - this.playerImage.clientWidth / 2 + 5}px`;

        this.playerShadow.style.top = `${this.y - this.playerImage.clientHeight / 2 + 60}px`;
        this.playerShadow.style.left = `${this.x - this.playerImage.clientWidth / 2 + 18}px`;



    }


}

function matchPlayer(body, x, y) {
    var minX = body.x - body.size - body.border;
    var maxX = body.x + body.size + body.border;

    var minY = body.y - body.size - body.border;
    var maxY = body.y + body.size + body.border;


    const startPoint = (x >= minX) && (x <= maxX);
    const endPoint = (y >= minY) && (y <= maxY)


    return (startPoint && endPoint)
}
function mathcGift(body, x, y) {

    var minX = body.x - body.border;
    var maxX = body.x + body.size + body.border;
    var minY = body.y - body.border;
    var maxY = body.y + body.size + body.border;

    const startPoint = (x >= minX) && (x <= maxX);
    const endPoint = (y >= minY) && (y <= maxY)
    return (startPoint && endPoint)
}
function playGiftSound() {
    document.getElementById('gift_sound').play()
}
function drawBigCircle(ctx, x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.fill();
}


