//@ts-check
const bgRows = {
    green: `background: #17a985af;`,
    blue: `background: #5697e1af;`,
    red: `background: #ff627caf;`,
    orange: `background: #e69726af;`,
    brown: `background: #96675faf;`,
    black: `background: #545454af;`,
    purple: `background: #9479cdaf;`,
    yellow: `background: #fbee90af;`
}
const addResultRow = (name) => {
    const htmlCode = `
    <div class='row' style='${bgRows[name]}'>
    <div class="icon"><img src="./images/${name}.png"></div>
    <div class="name">${name} color</div>
    <div class="percentage" id="${name}_percentage">0%</div>
    <div>prize</div>
    </div>`
    document.getElementById('leaderBoard').innerHTML += (htmlCode);
}

export class LeaderBoard {

    constructor(gameboard, duration) {
        this.gameboard = gameboard;
        this.context = document.getElementById('canvas1').getContext('2d', { willReadFrequently: true });
        this.leaderBoard = document.getElementById('leaderBoard');
        this.colorsLog = {};
        this.playersResult = [];
        this.duration = duration;
    }





    update() {

        if (this.gameboard.timeline.time == this.duration) {

            for (let x = 0; x < this.gameboard.width; x++) {
                for (let y = 0; y < this.gameboard.height; y++) {
                    const pixelData = this.context.getImageData(x, y, 1, 1).data
                    const pixelColor = `rgb(${pixelData[0]},${pixelData[1]},${pixelData[2]})`
                    this.colorsLog[pixelColor] = this.colorsLog[pixelColor] + 1 || 0;
                }
            }

            setTimeout(() => {
                this.draw();
            }, 500);

        }

    }

    draw() {


        // Real Players
        for (const player in this.gameboard.players) {

            const name = this.gameboard.players[player].name
            addResultRow(name)

            const color = this.gameboard.players[player].color.replaceAll(" ", "")
            let percentage = this.colorsLog[color] / (this.gameboard.width * this.gameboard.height)
            percentage = Math.floor(percentage * 100)
            this.playersResult.push({ name: name, percentage })
        }

        // Bot Players
        for (const bot in this.gameboard.bots) {
            const botName = this.gameboard.bots[bot].name
            const botColor = this.gameboard.bots[bot].color.replaceAll(" ", "")

            let percentage = this.colorsLog[botColor] / (this.gameboard.width * this.gameboard.height)
            percentage = Math.floor(percentage * 100)
            addResultRow(botName)
            this.playersResult.push({ name: botName, percentage })
        }


        this.showLeadderBoard()
        this.percentageAnimation(this.playersResult)


    }

    hideLeaderBoard() {
        setTimeout(() => {
            this.leaderBoard.classList.remove('visible');
        }, 2000);
    }

    showLeadderBoard() {
        this.leaderBoard.classList.add('visible');
    }


    percentageAnimation(players_Scores) {

        /* players_Scores = {
            blue : 50,
            red:90,
            yellow:100
        }*/


        var counter = 0;
        var interval = setInterval(() => {
            let percentageEle = document.getElementById(players_Scores[0].name + '_percentage');
            percentageEle.innerHTML = counter + '%';
            counter++;


            if (counter > players_Scores[0].percentage) {
                clearInterval(interval);

                players_Scores.shift(); // remove firsr
                if (players_Scores.length) {
                    //recursion
                    this.percentageAnimation(players_Scores)
                } else {
                    //exit
                    this.hideLeaderBoard()
                }
            }
        }, 50);

    }
}






