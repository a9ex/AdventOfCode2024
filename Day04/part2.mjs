import fs from "node:fs";

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((line) => line.split(""));

const toFind = ["X", "M", "A", "S"];
let result = 0;

const checkWord = (i, j) => {
  const pattern1 = [
    input[i - 1]?.[j - 1] === "M" && input[i + 1]?.[j + 1] === "S",
    input[i - 1]?.[j - 1] === "S" && input[i + 1]?.[j + 1] === "M",
  ];
  const pattern2 = [
    input[i - 1]?.[j + 1] === "M" && input[i + 1]?.[j - 1] === "S",
    input[i - 1]?.[j + 1] === "S" && input[i + 1]?.[j - 1] === "M",
  ];

  if (pattern1.includes(true) && pattern2.includes(true)) return result++;
};

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === toFind[2]) {
      checkWord(i, j);
    }
  }
}

console.log(result);
