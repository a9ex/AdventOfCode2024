import fs from "node:fs";

const input = fs.readFileSync("./input").toString().split("\n");
const partIndex = input.findIndex((elem) => elem === "");
let result = 0;

const pageOrderings = input.slice(0, partIndex).map((page) => page.split("|"));
const pageNumbers = input
  .slice(partIndex + 1)
  .filter((a) => a)
  .map((page) => page.split(","));

const correctsPageOrdering = [];

for (const pageNumber of pageNumbers) {
  let isOk = true;
  for (let i = 0; i < pageNumber.length; i++) {
    const beforePart = pageNumber.slice(0, i);

    for (const pageOrdering of pageOrderings) {
      if (pageOrdering[0] === pageNumber[i] && beforePart.includes(pageOrdering[1])) isOk = false;
    }
  }
  if (isOk) correctsPageOrdering.push(pageNumber);
}

correctsPageOrdering.forEach((page) => (result += parseInt(page[Math.round((page.length - 1) / 2)], 10)));
console.log(result);
