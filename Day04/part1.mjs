import fs from "node:fs";

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((line) => line.split(""));

const toFind = ["X", "M", "A", "S"];
let result = 0;

const checkWord = (i, j, index = 1, direction = null) => {
  const patterns = [
    { i: i - 1, j, direction: "UP" },
    { i: i + 1, j, direction: "DOWN" },
    { i, j: j + 1, direction: "RIGHT" },
    { i, j: j - 1, direction: "LEFT" },
    { i: i - 1, j: j - 1, direction: "UP_LEFT" },
    { i: i - 1, j: j + 1, direction: "UP_RIGHT" },
    { i: i + 1, j: j - 1, direction: "DOWN_LEFT" },
    { i: i + 1, j: j + 1, direction: "DOWN_RIGHT" },
  ];

  if (index == 4) return result++;

  for (const pattern of patterns) {
    if (input[pattern.i]?.[pattern.j] === toFind[index] && (direction === pattern.direction || !direction))
      checkWord(pattern.i, pattern.j, index + 1, pattern.direction);
  }
};

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === toFind[0]) {
      checkWord(i, j);
    }
  }
}

console.log(result);
