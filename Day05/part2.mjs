import fs from "node:fs";
import { resourceLimits } from "node:worker_threads";

const input = fs.readFileSync("./input").toString().split("\n");
const partIndex = input.findIndex((elem) => elem === "");
let result = 0;

const pageOrderings = input.slice(0, partIndex).map((page) => page.split("|"));
const pageNumbers = input
  .slice(partIndex + 1)
  .filter((a) => a)
  .map((page) => page.split(","));

const resortedPageNumbers = [];

let isOk = false;
while (!isOk) {
  isOk = true;
  for (const [index, pageNumber] of pageNumbers.entries()) {
    for (let i = 0; i < pageNumber.length; i++) {
      const beforePart = pageNumber.slice(0, i);

      for (const pageOrdering of pageOrderings) {
        if (pageOrdering[0] === pageNumber[i] && beforePart.includes(pageOrdering[1])) {
          [pageNumber[i - 1], pageNumber[i]] = [pageNumber[i], pageNumber[i - 1]];
          if (!resortedPageNumbers.includes(index)) resortedPageNumbers.push(index);
          isOk = false;
        }
      }
    }
  }
}

resortedPageNumbers.forEach(
  (i) => (result += parseInt(pageNumbers[i][Math.round((pageNumbers[i].length - 1) / 2)], 10))
);
console.log(result);
