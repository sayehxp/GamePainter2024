export class Keyboard {
    keys = [];
    constructor() {
        window.onkeydown = (evt) => this.keys.push(evt.key);
        window.onkeyup = (evt) => this.keys = this.keys.filter(key => key != evt.key);
    }
}