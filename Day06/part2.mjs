// trashy code - brutforce part 2

import fs from "node:fs";

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((line) => line.split(""));

const deepCloneInput = () => JSON.parse(JSON.stringify(input));

const directions = [
  { guard: "^", y: -1, x: 0 },
  { guard: ">", y: 0, x: 1 },
  { guard: "v", y: 1, x: 0 },
  { guard: "<", y: 0, x: -1 },
];

const guardPosition = [
  input.findIndex((predicate) => predicate.findIndex((item) => ![".", "#"].includes(item)) > 0),
  input.find((predicate) => predicate.find((item) => ![".", "#"].includes(item))).findIndex((pred) => ![".", "#"].includes(pred)),
];
const deepClonePosition = () => JSON.parse(JSON.stringify(guardPosition));
const passages = [];
let loop = 0;

const guardDirection = input[guardPosition[0]][guardPosition[1]];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[0].length; j++) {
    console.log(`Starting ${i} ${j}`);
    const inputCopy = deepCloneInput();
    const guardPositionCopy = deepClonePosition();
    let guardDirectionCopy = guardDirection;

    if ([".", "#"].includes(inputCopy[i][j])) inputCopy[i][j] = "#";

    while (
      guardPositionCopy[0] >= 0 &&
      guardPositionCopy[0] < inputCopy.length &&
      guardPositionCopy[1] >= 0 &&
      guardPositionCopy[1] < inputCopy[0].length
    ) {
      const guardY = guardPositionCopy[0];
      const guardX = guardPositionCopy[1];

      if (inputCopy[guardY][guardX] === "#") {
        guardPositionCopy[0] -= directions.find((dir) => dir.guard === guardDirectionCopy).y;
        guardPositionCopy[1] -= directions.find((dir) => dir.guard === guardDirectionCopy).x;
        guardDirectionCopy = directions.at(directions.findIndex((dir) => dir.guard === guardDirectionCopy) + 1)?.guard ?? directions[0].guard;
      }

      if (
        passages.filter(
          (passage) => passage.x === guardPositionCopy[1] && passage.y === guardPositionCopy[0] && passage.direction === guardDirectionCopy
        ).length > 0
      ) {
        loop++;
        break;
      }
      passages.push({ y: guardPositionCopy[0], x: guardPositionCopy[1], direction: guardDirectionCopy });
      inputCopy[guardPositionCopy[0]][guardPositionCopy[1]] = "X";
      guardPositionCopy[0] += directions.find((dir) => dir.guard === guardDirectionCopy).y;
      guardPositionCopy[1] += directions.find((dir) => dir.guard === guardDirectionCopy).x;
    }
    passages.length = 0;
  }
}

console.log(loop);
