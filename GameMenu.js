import { PlayerControls } from "./PlayerControls.js";

export class GameMenu {

    constructor() {
        this.players = document.querySelectorAll('.player');
        this.players.forEach(player => player.onclick = (e) => this.playerInSlider(e));
        this.ready = false;
        this.selectedPlayers = [];
        this.selectedBots = [];

    }


    getBots(maxBots) {
        const unSelectedPlayers = Array.from(this.players).filter(player => this.selectedPlayers.includes(player.id) == false).map(e => e.id)
        while (unSelectedPlayers.length > maxBots) {
            //russianRollete
            let random = Math.floor(Math.random() * unSelectedPlayers.length)
            unSelectedPlayers.splice(random, 1)

        }
        return unSelectedPlayers
    }


    selectBtn(maxHumans, maxBots) {

        const activePlayer = document.querySelector('.active');
        let selectedPlayers = getselectedPlayers();
        setselectedPlayers([...selectedPlayers, activePlayer.id])

        setPlayerName(selectedPlayers.length + 2)
        setPlayerKeys(selectedPlayers.length + 2)
        activePlayer.classList.add('selected')
        activePlayer.classList.remove('active')



        if (getselectedPlayers().length == maxHumans) {
            this.ready = true;
            this.selectedPlayers = getselectedPlayers();
            this.selectedBots = this.getBots(maxBots);

        }


        if (getselectedPlayers().length == maxHumans - 1) {
            document.querySelector('#SelectBtn').innerHTML = "Play"
        }


    }


    playerInSlider(event) {
        if (!event.target.classList.contains('selected')) {
            //disable all players
            const players = document.querySelectorAll('.player');
            players.forEach(player => {
                player.classList.remove('active')
            });
            //set Active to current
            event.target.classList.add('active');
            //_____________________________________
            setPainterImg(event.target.id);
            setBodyBG(event.target.id);
            setPlayerColor(event.target.id)
            //_______________________________-
        }
    }



    show() {
        document.querySelector('#gameMenu').style.display = "block"
    }
    close() {
        document.querySelector('#gameMenu').style.display = "none"
    }
}


function getselectedPlayers() {
    let selectedPlayers = localStorage.getItem('selectedPlayers');
    if (selectedPlayers) {
        selectedPlayers = JSON.parse(selectedPlayers)
    } else {
        selectedPlayers = []
    }
    return selectedPlayers
}
function setselectedPlayers(value) {
    localStorage.setItem('selectedPlayers', JSON.stringify(value))
}

function setPlayerColor(id) {
    document.querySelector('#playerColor').innerHTML = `${id}`;
}

function setPlayerName(name) {
    document.querySelector('#playerName').innerHTML = `player ${name}`;
}
function setPlayerKeys(name) {
    const playerKeys = PlayerControls(`player${name}`);
    console.log(name)
    for (const key in playerKeys) {
        document.getElementById(key).innerHTML = playerKeys[key]
    }
}
function setPainterImg(id) {
    document.querySelector('#selectedPainterImage').src = `images/${id}.png`;
}
function setBodyBG(id) {

    const gradinetBG = {
        blue: `radial-gradient(circle, rgba(123,152,237,1) 5%, rgba(211,211,211,1) 95%)`,
        green: `radial-gradient(circle, rgba(123, 237, 159, 1) 5%, rgba(211, 211, 211, 1) 95%)`,
        orange: `radial-gradient(circle, rgba(237,190,123,1) 5%, rgba(211,211,211,1) 95%)`,
        purple: `radial-gradient(circle, rgba(147,119,204,1) 5%, rgba(211,211,211,1) 95%)`,
        brown: `radial-gradient(circle, rgba(233,165,150,1) 5%, rgba(211,211,211,1) 95%)`,
        red: `radial-gradient(circle, rgba(255,124,146,1) 5%, rgba(211,211,211,1) 95%)`,
        black: `radial-gradient(circle, rgba(102,97,109,1) 5%, rgba(211,211,211,1) 95%)`,
    }

    document.querySelector('.gameMenu').style.background = gradinetBG[id]
}



