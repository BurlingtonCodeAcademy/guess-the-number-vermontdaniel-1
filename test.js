function randomInteger(min, max) {
    let range = max - min + 1;
    return min + Math.floor(Math.random() * range);
}

console.log(randomInteger(1, 5));