import { getInput } from "../helpers.js";

const input = getInput("./day-8/input.txt");

const createInstructions = (arr) => {
    let instructions = arr.split("\n");
    instructions.forEach((ins, i) => {
        instructions[i] = ins.split(/\s/);
        instructions[i][1] = instructions[i][1].split(/(\+|-)/);
        instructions[i][1].shift();
        instructions[i][1][1] = +instructions[i][1][1];
    });
    return instructions;
};

// part 1
const getAccumulatorValue = (instructions) => {
    let acc = 0;

    let i = 0;
    let executedIns = new Set();
    while (i < instructions.length) {
        if (executedIns.has(i)) break;
        else executedIns.add(i);

        const instr = instructions[i];
        const ins = instr[0]; // nop | acc | jmp
        const op = instr[1]; // [(+ | -), number]

        if (ins === "acc") {
            op[0] === "+" ? (acc += op[1]) : (acc -= op[1]);
            i++;
        } else if (ins === "jmp") {
            op[0] === "+" ? (i += op[1]) : (i -= op[1]);
        } else i++;
    }
    return acc;
};

// part 2
const getFinalAccumulatorValue = (instructions) => {
    let acc = 0;
    let i = 0;
    let alreadySwitchedOp = new Set();

    while (i < instructions.length - 1) {
        i = 0;
        acc = 0;
        let executedIns = new Set();
        let firstPassage = true;

        while (i < instructions.length) {
            if (executedIns.has(i)) break;
            else executedIns.add(i); // push each new instr in the array

            const instr = instructions[i];
            let ins = instr[0]; // nop | acc | jmp
            const op = instr[1]; // [(+ | -), number]

            if (ins === "acc") {
                op[0] === "+" ? (acc += op[1]) : (acc -= op[1]);
                i++;
            } else if (ins === "nop" || ins === "jmp") {
                if (!alreadySwitchedOp.has(i) && firstPassage) {
                    if (ins === "jmp") ins = "nop";
                    else ins = "jmp";
                    firstPassage = false;
                    alreadySwitchedOp.add(i);
                }

                if (ins === "jmp") {
                    op[0] === "+" ? (i += op[1]) : (i -= op[1]);
                } else if (ins === "nop") {
                    i++;
                }
            }
        }
    }

    return acc;
};

const test = `nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6`;

const ins = createInstructions(test);

// part 1
const acc = getAccumulatorValue(ins);
console.log("1:", acc);
// part 2
const finalAcc = getFinalAccumulatorValue(ins);
console.log("2:", finalAcc);
