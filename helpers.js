import fs from "fs";

export const getInput = (file) =>
    fs.readFileSync(file, "utf8", (err, input) => {
        if (err) return console.log(err);
        return input;
    });
