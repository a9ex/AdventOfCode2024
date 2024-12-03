import fs from "node:fs";

const input = fs.readFileSync("./input").toString();

const mul = [...input.matchAll(/mul\((\d+),(\d+)\)/g)];

const result = mul
  .map((val) => val[1] * val[2])
  .reduce((prev, acc) => prev + acc, 0);

console.log(result);
