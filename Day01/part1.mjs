import fs from "node:fs";

const input = fs.readFileSync("./input").toString();
const lines = input.split("\n").map((line) => line.split("   "));

const firstList = lines
  .map((line) => line.at(0))
  .sort((a, b) => a - b)
  .filter((a) => a);

const secondList = lines
  .map((line) => line.at(1))
  .sort((a, b) => a - b)
  .filter((a) => a);

console.log(
  firstList
    .map((item, i) => Math.abs(item - secondList.at(i)))
    .reduce((acc, curr) => acc + curr, 0)
);
