export function PlayerControls(playerName) {
    switch (playerName) {
        case 'player1':
            return { up: 'ArrowUp', right: 'ArrowRight', down: 'ArrowDown', left: 'ArrowLeft' };
        case 'player2':
            return { up: 'w', right: 'd', down: 's', left: 'a' }
        case 'player3':
            return { up: 'y', right: 'j', down: 'h', left: 'g' }
    }

}