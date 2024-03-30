//@ts-check
export class Gift {
    constructor(gameboard, count, duration) {
        this.gameboard = gameboard
        this.count = count;
        this.duration = duration;
        this.gifts = ['speed', 'speed', 'speed'];
        this.effect = 'effect'
        this.size = 100;
        this.selectedGift = '';
        this.points = {};
        this.timer = 0;
    }


    update() {
        if (this.count > 0) {
            this.timer++;
            this.points.x = randomPoints(this.gameboard.width, this.size);
            this.points.y = randomPoints(this.gameboard.height, this.size);
            this.selectedGift = this.gifts[randomIndex(this.gifts.length)];
        }

    }


    draw() {
        if (this.timer == this.duration && this.count > 0) {
            
            this.clear();

            setTimeout(() => {
                drawImage(this.effect, this.points.x, this.points.y, this.size)
                drawImage(this.selectedGift, this.points.x, this.points.y, this.size)
            }, 500);

            this.timer = 0;
            this.count--;

        }
    }


    clear() {
       
        clearImage(this.effect)
        clearImage(this.selectedGift)
        
    }

}


export const drawImage = (id, x, y, size) => {
    const img = document.getElementById(id);
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.width = size + 'px';
    img.style.height = size + 'px';
    img.style.position = 'absolute';
    img.style.zIndex = '2';
    img.style.display = 'block';
    img?.classList.add('bounce-in-fwd')
}
export const clearImage = (id) => {

    const img = document.getElementById(id);
    img?.classList.remove('bounce-in-fwd')
    img?.classList.remove('effect');
    img.style.display = 'none';

}
export const randomIndex = (max) => {
    return Math.floor(Math.random() * max);
}
export const randomPoints = (max, size) => {
    var random = (Math.random() * max);
    if (random >= size && random <= (max - size)) {

        return random;
    } else {
        return randomPoints(max, size)
    }
}