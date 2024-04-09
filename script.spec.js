//@ts-check
var randomDirection = ["left", "up", "right", "down"];
var oppositeDirection = {
    left: 'right',
    right: 'left',
    up: 'down',
    down: 'up'
}

function getOpposite(direction) {
    return oppositeDirection[direction]

}
function GETrandomDirection(prevDirection, prevDirection2 = null) {


    var direction = randomDirection[Math.floor(Math.random() * randomDirection.length)];

    if (
        prevDirection == direction ||
        prevDirection == getOpposite(direction) ||
        prevDirection2 == direction
    ) {
        return GETrandomDirection(prevDirection, prevDirection2)
    } else {


        console.log('new direction == ', direction)
        return direction;
    }


}

console.log(GETrandomDirection('right'))