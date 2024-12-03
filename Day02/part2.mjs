import fs from "node:fs";

const input = fs.readFileSync("./input").toString();

const lines = input
  .split("\n")
  .filter((a) => a)
  .map((line) => line.split(" "));

const delta = [];
let result = 0;

for (let line of lines) {
  delta.push([]);
  const deltaLine = delta.at(-1);

  let ok = false;

  for (let j = 0; j < line.length; j++) {
    const lineCopy = line.filter((_, i) => i !== j);
    for (let i = 0; i < lineCopy.length - 1; i++) {
      deltaLine.push(lineCopy[i] - lineCopy[i + 1]);
    }

    if (
      (deltaLine.every((nbr) => nbr > 0) ||
        deltaLine.every((nbr) => nbr < 0)) &&
      deltaLine.every((nbr) => nbr >= -3 && nbr <= 3 && nbr !== 0)
    ) {
      ok = true;
    }
    deltaLine.length = 0;
  }
  if (ok) result++;
}

console.log(result);
