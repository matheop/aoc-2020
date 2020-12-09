import { getInput } from "../helpers.js";

const input = getInput("./day-9/input.txt");

const createNumbers = (txt) => {
    let arr = txt.split("\n");

    arr.forEach((el, i) => (arr[i] = +el));

    return arr;
};

// part 1
const findNumber = (arr, preamble) => {
    let pl = new Array();
    let nb_list = new Array();
    let exception = 0;

    for (let i = 0; i < preamble; i++) pl.push(arr[i]);
    for (let i = preamble; i < arr.length; i++) nb_list.push(arr[i]);

    let sum = true;
    while (sum) {
        let sum = false;
        const nb = nb_list[0];

        for (let i = 0; i < pl.length; i++) {
            for (let j = 0; j < pl.length; j++) {
                if (pl[i] + pl[j] === nb && pl[i] !== pl[j]) {
                    sum = true;
                    break;
                } else exception = nb;
            }
            if (sum) break;
        }

        if (!sum) {
            break;
        } else {
            pl.shift();
            pl.push(nb_list[0]);
            nb_list.shift();
        }
    }
    return exception;
};

const findEW = (arr, invalid) => {
    const set = new Array();
    let k = 0;
    while (arr[k] !== invalid) {
        set[k] = arr[k];
        k++;
    }

    for (let i = set.length - 1; i > 0; i--) {
        if (set[i] + set[i - 1] < invalid) {
            let j = 1;
            let sum = 0;
            let contiguous_set = new Array(set[i], set[i - j]);
            while (sum < invalid) {
                j++;
                contiguous_set.push(set[i - j]);
                sum = contiguous_set.reduce((acc, val) => acc + val);
            }
            if (sum === invalid)
                return (
                    Math.min(...contiguous_set) + Math.max(...contiguous_set)
                );
        }
    }
};

const test = `35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576`;

const numbers = createNumbers(input);

// part 1
const invalid_nb = findNumber(numbers, 25);
console.log("1:", invalid_nb);

// part 2
const encryption_weakness = findEW(numbers, invalid_nb);
console.log("2:", encryption_weakness);
