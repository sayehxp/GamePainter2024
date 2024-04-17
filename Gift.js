export class Gift {
    constructor(gameboard, count, duration) {
        this.gameboard = gameboard
        this.duration = duration;
        this.gifts = ['spot'];
        this.gifts = ['spot', 'speed', 'crawlers', 'big'];
        this.selectedGift = '';
        this.size = 80;
        this.points = {};
        this.effect = 'effect'
        this.count = count;
        this.timer = 0;
    }


    update() {
        if (this.count > 0) {
            this.timer++;
        }
    }

    draw() {
        if (this.timer == this.duration && this.count > 0) {

            this.points.x = randomPoints(this.gameboard.width, this.size);
            this.points.y = randomPoints(this.gameboard.height, this.size);
            this.selectedGift = this.gifts[randomIndex(this.gifts.length)];

            this.clear()


            setTimeout(() => {
                drawImage(this.effect, this.points.x - 10, this.points.y - 10, this.size + 20, 'frame')
                drawImage(this.selectedGift, this.points.x, this.points.y, this.size, 'gift')
            }, 200);


            this.timer = 0;
            this.count--;
        }
    }


    clear() {
        this.gifts.forEach(gift => clearImage(gift))
        clearImage(this.effect)
    }

}



const clearImage = (id) => {
    const img = document.getElementById(id);
    img.style.display = 'none';
    img.classList.remove('bounce-in-fwd')
    img.classList.remove('effect');
}



const drawImage = (id, x, y, size, type) => {
    const img = document.getElementById(id);
    img.style.left = x + 'px';
    img.style.top = y + 'px';
    img.style.objectFit = 'contain'
    img.style.width = size + 'px';
    img.style.height = size + 'px';
    img.style.position = 'absolute';
    img.style.zIndex = '2';
    img.style.display = 'block';
    img.classList.add('bounce-in-fwd')
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

