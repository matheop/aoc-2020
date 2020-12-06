const fs = require("fs");

let data = fs.readFileSync("./input.txt", "utf8", (err, data) => {
    if (err) return console.log(err);
    return data;
});

data = data.split("\n");

// ex: 1-3 a: abcd
// => a must be present, btwn 1 and 3 times (included)
// if so, then the pwd is a true one
// returns the number of valid passwords
const checkPasswordValidity_1 = (arr) => {
    let counter = 0;
    arr.forEach((el) => {
        el = el.split(/-| /);
        const min = +el[0];
        const max = +el[1];
        const letter = el[2][0];
        const pwd = el[3].split("");
        // gets number of occurences
        const occurences = pwd.filter((l) => l === letter).length;
        // increments if condition passes
        if (min <= occurences && occurences <= max) counter++;
    });
    return counter;
};

console.time("part1");
console.log("part_1: ", checkPasswordValidity_1(data));
console.timeEnd("part1");

// ---------------

// algo 2
const checkPasswordValidity_2 = (arr) => {
    let counter = 0;
    arr.forEach((el) => {
        el = el.split(/-| /);
        const pos1 = +el[0] - 1;
        const pos2 = +el[1] - 1;
        const letter = el[2][0];
        const pwd = el[3].split("");

        if (
            (pwd[pos1] === letter && pwd[pos2] !== letter) ||
            (pwd[pos1] !== letter && pwd[pos2] === letter)
        )
            counter++;
    });
    return counter;
};

console.time("part2");
console.log("part_2: ", checkPasswordValidity_2(data));
console.timeEnd("part2");
