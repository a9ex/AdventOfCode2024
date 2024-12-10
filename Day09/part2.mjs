import fs from "node:fs";
import { console } from "node:inspector";

const input = fs.readFileSync("./input").toString().split("").map(Number);

const disk = [];
const done = new Set();
let fileId = 0;
let result = 0;

input.forEach((number, index) => disk.push(...Array(number).fill(index % 2 === 0 ? fileId++ : ".")));

const findBlockSpace = (index) => {
  let spaceAvailable = 0;
  while (disk[index] === ".") {
    spaceAvailable++;
    index++;
  }
  return spaceAvailable;
};

for (let i = disk.length - 1; i >= 0; i--) {
  const fragment = disk[i];
  if (fragment !== "." && !done.has(fragment)) {
    const fileSize = disk.filter((frag) => frag === fragment).length;
    disk.every((val, index) => {
      if (index > i) return false;
      if (val === "." && findBlockSpace(index) >= fileSize) {
        for (let j = 0; j < fileSize; j++) {
          disk[index + j] = disk[i - j];
          disk[i - j] = ".";
        }
      }
      return true;
    });
    done.add(fragment);
  }
}

disk.forEach((fragment, index) => (fragment !== "." ? (result += fragment * index) : null));
console.log(result);
