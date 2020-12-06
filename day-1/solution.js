const fs = require("fs");
// import * as fs from "fs";

const data = fs.readFileSync("./input.txt", "utf8", function (err, data) {
    if (err) return console.log(err);
    return data;
});

console.log(data);

let arr = data.split("\n").map((n) => +n);

// finds the two numbers that sum 2020 and multiplies them together
const part_1 = (arr) => {
    for (const a of arr) {
        for (const b of arr) if (a + b === 2020) return a * b;
    }
};

// find the three numbers making 2020 by addition and multiply them together
const part_2 = (arr) => {
    for (const a of arr) {
        for (const b of arr) {
            if (a + b < 2020)
                for (const c of arr) if (a + b + c === 2020) return a * b * c;
        }
    }
};

const solution_1 = part_1(arr);
console.log("1:", solution_1);
const solution_2 = part_2(arr);
console.log("2:", solution_2);
