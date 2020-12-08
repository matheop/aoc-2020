import { getInput } from "../helpers.js";

const input = getInput("./day-4/input.txt");

// we could also user a Map();
const createPassports = () => {
    let passports = input.split("\n\n");
    passports.forEach((passport, i) => {
        passports[i] = passport.split(/\s|\n/g);

        for (let j = 0; j < passports[i].length; j++) {
            passports[i][j] = passports[i][j].split(":");
        }
        passports[i] = Object.fromEntries(passports[i]);
    });
    return passports;
};

const countValidPassports_1 = (arr) => {
    let valid = 0;
    for (const el of arr) {
        if (
            Object.keys(el).length === 8 ||
            (Object.keys(el).length === 7 && !el.cid)
        )
            valid++;
    }
    return valid;
};

const birthYearIsValid = (b) => 1920 <= b && b <= 2002;

const issueYearIsValid = (i) => 2010 <= i && i <= 2020;

const expirationYearIsValid = (e) => 2020 <= e && e <= 2030;

const heightIsValid = (h) => {
    if (/^\d{3}cm$/.test(h)) {
        const n = h.split("cm");
        return 150 <= +n[0] && +n[0] <= 193;
    } else if (/^\d{2}in$/.test(h)) {
        const n = h.split("in");
        return 59 <= +n[0] && +n[0] <= 76;
    }
    return false;
};

const hairColorIsValid = (h) => /^#([0-9a-fA-F]){6}$/.test(h);

const eyesColorIsValid = (e) => /^(amb|blu|brn|gry|grn|hzl|oth)$/.test(e);

const passportIdIsValid = (p) => /^\d{9}$/.test(p);

const countValidPassports_2 = (arr) => {
    let valid = 0;
    for (const el of arr) {
        if (
            Object.keys(el).length === 8 ||
            (Object.keys(el).length === 7 && !el.cid)
        ) {
            let counter = 0;
            if (birthYearIsValid(+el.byr)) counter++;
            if (issueYearIsValid(+el.iyr)) counter++;
            if (expirationYearIsValid(+el.eyr)) counter++;
            if (heightIsValid(el.hgt)) counter++;
            if (hairColorIsValid(el.hcl)) counter++;
            if (eyesColorIsValid(el.ecl)) counter++;
            if (passportIdIsValid(el.pid)) counter++;
            // console.log("counter:", counter);
            if (counter === 7) valid++;
        }
    }
    return valid;
};

const passports = createPassports(input);

const validPassports_1 = countValidPassports_1(passports); // 233 OK
console.time("passport");
const validPassports_2 = countValidPassports_2(passports); // I get 112, I should have 111 mothafucka
console.timeEnd("passport");

console.log("1:", validPassports_1);
console.log("2:", validPassports_2);

// perl -0ne '$p1="(?=[^!]*byr:)(?=[^!]*iyr:)(?=[^!]*eyr:)(?=[^!]*hgt:)(?=[^!]*hcl:)(?=[^!]*ecl:)(?=[^!]*pid:)";s/\n\n/!/g;$_.="!";s/\n/ /g;s/($p1[^!]*)!/$1Y!/mgo;print "Part 1: ",s/Y//g,"\n";s/((?=[^!]*byr:(?:19[2-9][0-9]|200[012]))(?=[^!]*iyr:20(?:1[0-9]|20))(?=[^!]*eyr:20(?:2[0-9]|30))(?=[^!]*hgt:(?:(?:1[5-8][0-9]|19[0-3])cm|(?:59|6[0-9]|7[0-6])in))(?=[^!]*hcl:\#[0-9a-f])(?=[^!]*ecl:(?:amb|blu|brn|gry|grn|hzl|oth))(?=[^!]*pid:\d{9}\D)[^!]*)!/Y!/mgo;print "Part 2: ",~~y/Y//,"\n";' <input.txt

///
const rules = {
    byr: (e) => +e >= 1920 && +e <= 2002,
    iyr: (e) => +e >= 2010 && +e <= 2020,
    eyr: (e) => +e >= 2020 && +e <= 2030,
    hgt: (e) => {
        if (e.includes("cm")) {
            e = e.replace("cm", "");
            return +e >= 150 && +e <= 193;
        } else if (e.includes("in")) {
            e = e.replace("in", "");
            return +e >= 59 && +e <= 76;
        } else {
            return false;
        }
    },
    hcl: (e) => e.match(/^#(?:[0-9a-fA-F]{6}){1,2}$/) !== null,
    ecl: (e) => ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(e),
    pid: (e) => e.match(/^\d{9}$/) !== null,
    cid: (e) => true,
};
