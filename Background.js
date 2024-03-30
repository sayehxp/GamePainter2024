export class Background {

    constructor(gameBoard, imgId) {
        this.gameBoard = gameBoard;
        this.img =  document.getElementById(imgId)
        this.draw();
    }

    update() {

    }

    draw() {
       
        this.gameBoard.context.drawImage(this.img, 0, 0, this.gameBoard.width, this.gameBoard.height)

    }
}