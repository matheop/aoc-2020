import { getInput } from "../helpers.js";

const input = getInput("./day-6/input.txt");

const createGroupsAnswers = (file) => {
    let groupAnswers = file.split("\n\n");
    groupAnswers.forEach(
        (answers, i) => (groupAnswers[i] = answers.split("\n"))
    );
    return groupAnswers;
};

const countYesAnswers = (arr) => {
    arr = createGroupsAnswers(arr);
    let counter = 0;
    for (const group of arr) {
        let yesAnswers = new Set();
        for (const person of group) {
            for (const answer of person) yesAnswers.add(answer);
        }
        counter += yesAnswers.size;
    }
    return counter;
};

const countUnanimousYesAnswers = (arr) => {
    arr = createGroupsAnswers(arr);
    let counter = 0;
    for (const group of arr) {
        if (group.length === 0) counter += group.length;
        else {
            let filteredArray = group[0].split("");
            for (const person of group)
                filteredArray = filteredArray.filter((a) => person.includes(a));
            counter += filteredArray.length;
        }
    }
    return counter;
};

// part 1
console.log("1:", countYesAnswers(input));
// part 2
console.log("2:", countUnanimousYesAnswers(input));
