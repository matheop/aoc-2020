const fs = require("fs");

let input = fs.readFileSync("./input.txt", "utf8", function (err, input) {
    if (err) {
        return console.log(err);
    }
    return input;
});

input = input.split("\n");

// possibilité d'amélioration :
// itération sur les éléments du tableau
const createMap = (arr, x = 1) => {
    // we need nb of chars by line
    const defaultLength = arr[0].length;
    //part1: we want 3 * 323 + 1 = 970 chars (nb of squared covered by line * nb of lines + first position)
    //part2: x * 323 + 1
    let minLength = arr.length * x + 1; // 970
    let totalLength = 0;
    let factor = 0;
    while (totalLength < minLength) {
        totalLength += defaultLength;
        factor++;
    }
    let map = [];
    arr.forEach((str, i) => {
        arr[i] = str.repeat(factor);
        map[i] = arr[i].split("");
    });

    return map;
};

const countTrees_1 = (arr) => {
    const slopeHeight = arr.length;
    let index = 0;
    let trees = 0;
    for (let i = 0; i < slopeHeight; i++) {
        if (arr[i][index] === "#") trees++;
        index += 3;
    }

    return trees;
};

const countTrees_2 = (arr, x = 1, y = 1) => {
    const slopeHeight = arr.length;
    let index = 0;
    let trees = 0;
    for (let i = 0; i < slopeHeight; i += y) {
        if (arr[i][index] === "#") trees++;
        index += x;
    }
    return trees;
};

const map = createMap(input);

// part 1
console.log(countTrees_1(map));
// part 2
const total =
    countTrees_2(map) *
    countTrees_2(createMap(input, 3), 3, 1) *
    countTrees_2(createMap(input, 5), 5, 1) *
    countTrees_2(createMap(input, 7), 7, 1) *
    countTrees_2(createMap(input, 1), 1, 2);
console.log(total);
