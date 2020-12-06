import { getInput } from "../helpers.js";

const input = getInput("./day-5/input.txt");

const boardingPasses = input.split("\n");

const getSeatID = (boardingPass) => {
    const row = { min: 0, max: 127 };
    const col = { min: 0, max: 7 };
    for (const char of boardingPass) {
        if (char === "F")
            row.max = Math.floor(row.min + (row.max - row.min) / 2);
        if (char === "B")
            row.min = Math.ceil(row.max - (row.max - row.min) / 2);
        if (char === "L")
            col.max = Math.floor(col.min + (col.max - col.min) / 2);
        if (char === "R")
            col.min = Math.ceil(col.max - (col.max - col.min) / 2);
    }
    return row.min * 8 + col.min;
};

const getAllSeatIDs = (arr) => {
    let seatIDsArray = [];
    arr.forEach((el, i) => {
        seatIDsArray[i] = getSeatID(el);
    });
    return seatIDsArray;
};

const getHighestSeatID = (arr) => {
    let highestSeatID = 0;
    for (const boardingPass of arr) {
        const currentSeatID = getSeatID(boardingPass);
        if (highestSeatID < currentSeatID) highestSeatID = currentSeatID;
    }
    return highestSeatID;
};

const getMySeatID = (pbArr) => {
    const highestSeatID = getHighestSeatID(pbArr);
    const seatIDsArray = getAllSeatIDs(pbArr);

    for (let i = 0; i < highestSeatID; i++) {
        const currentID = seatIDsArray.find((id) => id === i);
        if (!currentID) {
            const upperID = seatIDsArray.find((id) => id === i + 1);
            const lowerID = seatIDsArray.find((id) => id === i - 1);
            if (upperID && lowerID) return lowerID + 1;
        }
    }
};

// part 1
const highestSeatID = getHighestSeatID(boardingPasses);
console.log("highestSeatID:", highestSeatID);
// part 2
const mySeatID = getMySeatID(boardingPasses);
console.log("mySeatID:", mySeatID);
