import { GameBoard } from './GameBoard.js';
import { GameInterface } from './GameInterface.js';
import { GameMenu } from './GameMenu.js';

window.onload = () => {
    localStorage.removeItem('selectedPlayers')
}

const gameInterface = new GameInterface();
const gameMenu = new GameMenu();
const gameBoard = new GameBoard();

gameInterface.show();
document.getElementById('interface-btn').onclick = () => {
    gameInterface.close();
    if (gameInterface.humanQty.innerHTML > 0) {
        gameMenu.show();
    } else {
        gameMenu.close();
        gameBoard.addPlayers([])
        gameBoard.addBots(gameMenu.getBots(gameInterface.botQty.innerHTML))
        gameBoard.show();
        renderFrame()
    }
}

document.getElementById('SelectBtn').onclick = () => {

    gameMenu.selectBtn(gameInterface.humanQty.innerHTML, gameInterface.botQty.innerHTML)

    if (gameMenu.ready) {
        gameMenu.close();
        gameBoard.addPlayers(gameMenu.selectedPlayers)
        gameBoard.addBots(gameMenu.selectedBots)
        gameBoard.show();
        renderFrame()

    }
};



function renderFrame() {
    gameBoard.update();
    gameBoard.draw();
    requestAnimationFrame(renderFrame);

}




gameMenu.close();
gameInterface.close();
gameBoard.addPlayers(['orange' , 'red'])
gameBoard.addBots(gameMenu.getBots(0))
gameBoard.show();
renderFrame()






                                                                                                                                                                        