import { getInput } from "../helpers.js";

const input = getInput("./day-7/input.txt");

const createRules = (listOfRules, keepNumbers = false) => {
    listOfRules = listOfRules.split("\n");
    const rules = new Map();
    for (let i = 0; i < listOfRules.length; i++) {
        const rule = keepNumbers
            ? listOfRules[i].split(/\sbags contain\s|\sbags?,\s|\sbags?\./g)
            : listOfRules[i].split(
                  /\sbags contain \d+\s|\sbags?,\s\d+\s|\sbags?\./g
              );
        // mapping
        rules.set(rule[0], rule.slice(1, rule.length - 1));
    }
    return rules;
};

// part 0 - wrong exercice --'
const countDistinctBagsInOneSpecificBag = (rules, color) => {
    let colors = new Array(); // improvement: Set() instead of Array()
    const bagColor = rules.get(color);

    if (bagColor)
        for (const bag of bagColor) {
            colors.push(bag);
            colors = colors.concat(
                countDistinctBagsInOneSpecificBag(rules, bag)
            );
        }

    return colors;
};

// part 1
const countBagsContainingOneBag = (list, graal) => {
    let bagsList = new Array(); // improvement: Set() instead of Array()

    for (const [bag, content] of list) {
        if (content.includes(graal)) {
            bagsList.push(bag);
            bagsList = bagsList.concat(countBagsContainingOneBag(list, bag));
        }
    }

    return bagsList;
};

// part 2
const countAllBagsInOneBag = (rules, graal) => {
    let counter = 0;
    const bagColor = rules.get(graal);

    if (bagColor)
        for (let bag of bagColor) {
            bag = bag.split(/\s(.+)?/);
            bag.pop();
            if (bag[0] !== "no")
                counter +=
                    +bag[0] + +bag[0] * countAllBagsInOneBag(rules, bag[1]);
        }

    return counter;
};

const rules = createRules(input);

const rulesWithNb = createRules(input, true);

// part 0
const bagsInSG = countDistinctBagsInOneSpecificBag(rules, "shiny gold");
console.log("0:", new Set(bagsInSG).size);

// part 1
const bags = countBagsContainingOneBag(rules, "shiny gold");
console.log("1:", new Set(bags).size);

// part 2
const count = countAllBagsInOneBag(rulesWithNb, "shiny gold");
console.log("2:", count);
