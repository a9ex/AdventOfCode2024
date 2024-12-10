import fs from "node:fs";
import { console } from "node:inspector";

const input = fs.readFileSync("./input").toString().split("").map(Number);

const disk = [];
let fileId = 0;
let result = 0;

input.forEach((number, index) => disk.push(...Array(number).fill(index % 2 === 0 ? fileId++ : ".")));

for (let i = disk.length - 1; i >= 0; i--) {
  const fragment = disk[i];
  if (fragment !== ".") {
    const availableFragment = disk.findIndex((fragment) => fragment === ".");
    if (availableFragment === -1) break;
    disk[availableFragment] = fragment;
    disk[i] = ".";
  }
}

disk.filter((a) => a !== ".").forEach((fragment, index) => (result += fragment * index));
console.log(result);
