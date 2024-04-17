
export class GameInterface {
    constructor() {
        this.humanQty = document.querySelector('#humanQty');
        this.forwardH = document.querySelector('#forwardHumanArrow');
        this.backH = document.querySelector('#backHumanArrow');
        this.botQty = document.querySelector('#botQty');
        this.forwardB = document.querySelector('#forwardBotArrow');
        this.backB = document.querySelector('#backBotArrow');
        this.selectBtn = document.querySelector('#interface-btn');
        this.min = 0;
        this.max = 3;

        //____________________Human listeners_________________
        this.forwardH.onclick = () => {
            const value = +this.humanQty.innerHTML;
            (value < this.max) ? this.humanQty.innerHTML = value + 1 : null
        }
        this.backH.onclick = () => {
            const value = +this.humanQty.innerHTML;
            (value > this.min) ? this.humanQty.innerHTML = value - 1 : null
        }
        //____________________Bot listeners_________________
        this.forwardB.onclick = () => {
            const value = +this.botQty.innerHTML;
            (value < this.max) ? this.botQty.innerHTML = value + 1 : null
        }
        this.backB.onclick = () => {
            const value = +this.botQty.innerHTML;
            (value > this.min) ? this.botQty.innerHTML = value - 1 : null
        }





    }

    close() {
        document.getElementById('interface').style.display = 'none';
    }

    show() {
        document.getElementById('interface').style.display = 'flex';
    }
}



