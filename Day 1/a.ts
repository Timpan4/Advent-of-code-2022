export const x = ""; // used to trick the compiler into thinking this is a module

// The jungle must be too overgrown and difficult to navigate in vehicles or access from the air; the Elves' expedition traditionally goes on foot. As your boats approach land, the Elves begin taking inventory of their supplies. One important consideration is food - in particular, the number of Calories each Elf is carrying (your puzzle input).

// The Elves take turns writing down the number of Calories contained by the various meals, snacks, rations, etc. that they've brought with them, one item per line. Each Elf separates their own inventory from the previous Elf's inventory (if any) by a blank line.

// For example, suppose the Elves finish writing their items' Calories and end up with the following list:

// 1000
// 2000
// 3000

// 4000

// 5000
// 6000

// 7000
// 8000
// 9000

// 10000
// This list represents the Calories of the food carried by five Elves:

// The first Elf is carrying food with 1000, 2000, and 3000 Calories, a total of 6000 Calories.
// The second Elf is carrying one food item with 4000 Calories.
// The third Elf is carrying food with 5000 and 6000 Calories, a total of 11000 Calories.
// The fourth Elf is carrying food with 7000, 8000, and 9000 Calories, a total of 24000 Calories.
// The fifth Elf is carrying one food item with 10000 Calories.
// In case the Elves get hungry and need extra snacks, they need to know which Elf to ask: they'd like to know how many Calories are being carried by the Elf carrying the most Calories. In the example above, this is 24000 (carried by the fourth Elf).

// Find the Elf carrying the most Calories. How many total Calories is that Elf carrying?

import fs from "fs";

// read input from "./input.txt" using FS
const input = fs.readFileSync("./input.txt", "utf8");

interface group {
    items: string[];
    position: number;
}
interface countedGroup {
    total: number;
    position: number;
}

// function separateGroups(input: string) {
//     return input.split("\r\n\r\n").map((group) => group.split("\r\n"));
// }
function separateGroups(input: string) {
    return input.split("\r\n\r\n").map((group, position) => {
        //return object with group and the position of the group
        return {
            items: group.split("\r\n"),
            position,
        };
    });
}

const groups = separateGroups(input);

function countTotal(group: group): countedGroup {
    let total = 0;
    for (const item of group.items) {
        total += +item;
    }
    return {
        total,
        position: group.position,
    };
}

function loopThroughGroups(groups: group[], functionToRun: (any: any) => any) {
    const final: any[] = [];
    for (const group of groups) {
        final.push(functionToRun(group));
    }
    return final;
}

function returnHighest(countedGroups: countedGroup[]) {
    let highest = 0;
    let highestIndex = 0;
    // for of with index
    for (const [index, countedGroup] of countedGroups.entries()) {
        if (countedGroup.total > highest) {
            highest = countedGroup.total;
            highestIndex = index;
        }
    }
    return countedGroups[highestIndex];
}

let result = loopThroughGroups(groups, countTotal);

console.log(returnHighest(result));

// console.log([input]);
// console.log(separateGroups(input)[0]);

// oneliner because why not
let res = input
    .split("\r\n\r\n")
    .map((group) => group.split("\r\n").reduce((a, b) => +a + +b, 0))
    .reduce((a, b) => Math.max(a, b), 0);

console.log("res", res);
