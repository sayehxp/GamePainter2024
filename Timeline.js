export class TimeLine {

    constructor() {
        this.time = 0;
        this.Units = document.getElementById('timeline_units');
        this.init()

    }

    init() {
        for (let i = 0; i < 20; i++) {
            this.Units.innerHTML += '<li></li>'
        }
    }


    update() {
        if (this.time < 2000) {
            this.time++;
        }
    }



    draw() {

        if (this.time % 100 == 0 && this.time < 2000) {
            var LIs = this.Units.children;
            var li = Array.from(LIs).find((li) =>
                (!li.classList.contains('active') && !li.classList.contains('activeGift'))
            )


            if (this.time % 500 == 0) {
                li.classList.add('activeGift');
            } else {
                li.classList.add('active')
            }
        }
    }




}