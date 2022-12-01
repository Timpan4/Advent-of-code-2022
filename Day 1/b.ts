export const x = ""; // used to trick the compiler into thinking this is a module

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

function sortCountedGroups(countedGroups: countedGroup[]) {
    return countedGroups.sort((a, b) => a.total - b.total);
}

function returnTopXCountedGroups(countedGroups: countedGroup[], x: number) {
    return countedGroups.slice(countedGroups.length - x);
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

function combineCountedGroupsItemsTotal(groups: countedGroup[]) {
    let finalTotal = 0;
    for (const group of groups) {
        finalTotal += group.total;
    }
    return finalTotal;
}

const formatedGroups = loopThroughGroups(groups, countTotal);
console.log("formatedGroups", formatedGroups);
const sortedFormatedGroups = sortCountedGroups(formatedGroups);
console.log("sortedFormatedGroups", sortedFormatedGroups);
const top3FormatedGroups = returnTopXCountedGroups(sortedFormatedGroups, 3);
console.log("top3FormatedGroups", top3FormatedGroups);

console.log(combineCountedGroupsItemsTotal(top3FormatedGroups));

// console.log(input);
// console.log(separateGroups(input)[0]);
