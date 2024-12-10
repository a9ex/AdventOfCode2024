import fs from "node:fs";

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((item) => item.split("").map(Number));

const trailheads = {};
const trailheadScores = [];

function findPaths(coords, toFind = 1, next = []) {
  if (toFind === 10) {
    if (!trailheads[`${coords[0]}.${coords[1]}`]) {
      trailheads[`${coords[0]}.${coords[1]}`] = [next];
    } else {
      if (JSON.stringify(trailheads[`${coords[0]}.${coords[1]}`]).indexOf(JSON.stringify(next)) === -1) {
        trailheads[`${coords[0]}.${coords[1]}`].push(next);
      }
    }
  }
  if (!next.length) next = JSON.parse(JSON.stringify(coords));
  if (input[next[0] - 1]?.[next[1]] === toFind) findPaths(coords, toFind + 1, [next[0] - 1, next[1]]);
  if (input[next[0] + 1]?.[next[1]] === toFind) findPaths(coords, toFind + 1, [next[0] + 1, next[1]]);
  if (input[next[0]]?.[next[1] - 1] === toFind) findPaths(coords, toFind + 1, [next[0], next[1] - 1]);
  if (input[next[0]]?.[next[1] + 1] === toFind) findPaths(coords, toFind + 1, [next[0], next[1] + 1]);
}

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] === 0) {
      findPaths([i, j]);
    }
  }
}

for (const trail in trailheads) {
  trailheadScores.push(trailheads[trail].length);
}

console.log(trailheads);
console.log(trailheadScores.reduce((prev, acc) => prev + acc, 0));
