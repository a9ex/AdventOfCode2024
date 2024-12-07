import fs from "node:fs";

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((line) => line.split(""));

const directions = [
  { guard: "^", y: -1, x: 0 },
  { guard: ">", y: 0, x: 1 },
  { guard: "v", y: 1, x: 0 },
  { guard: "<", y: 0, x: -1 },
];

const guardPosition = [
  input.findIndex((predicate) => predicate.findIndex((item) => ![".", "#"].includes(item)) > 0),
  input
    .find((predicate) => predicate.find((item) => ![".", "#"].includes(item)))
    .findIndex((pred) => ![".", "#"].includes(pred)),
];

let guardDirection = input[guardPosition[0]][guardPosition[1]];

while (
  guardPosition[0] >= 0 &&
  guardPosition[0] < input.length &&
  guardPosition[1] >= 0 &&
  guardPosition[1] < input[0].length
) {
  const guardY = guardPosition[0];
  const guardX = guardPosition[1];

  if (input[guardY][guardX] === "#") {
    guardPosition[0] -= directions.find((dir) => dir.guard === guardDirection).y;
    guardPosition[1] -= directions.find((dir) => dir.guard === guardDirection).x;
    guardDirection =
      directions.at(directions.findIndex((dir) => dir.guard === guardDirection) + 1)?.guard ?? directions[0].guard;
  }

  input[guardPosition[0]][guardPosition[1]] = "X";
  guardPosition[0] += directions.find((dir) => dir.guard === guardDirection).y;
  guardPosition[1] += directions.find((dir) => dir.guard === guardDirection).x;
}

console.log(input.flat().filter((elem) => elem === "X").length);
