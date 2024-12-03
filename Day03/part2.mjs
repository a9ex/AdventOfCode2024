import fs from "node:fs";

const input = fs.readFileSync("./input").toString();
let result = 0;

const mul = [...input.matchAll(/mul\((\d+),(\d+)\)|(do\(\))|(don't\(\))/g)];

const list = mul.map((val) =>
  Number.isNaN(parseInt(val[1], 10))
    ? val[0] === "do()"
      ? null
      : undefined
    : val[1] * val[2]
);

let isEnabled = true;

for (let item of list) {
  if (item === null) isEnabled = true;
  if (item === undefined) isEnabled = false;
  if (isEnabled) result += item;
}

console.log(result);
