import fs from "node:fs";

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((line) => line.split(":"))
  .map((line) => [
    line[0],
    line[1]
      .split(" ")
      .filter((a) => a)
      .map(Number),
  ]);

const answers = [];
let result = 0;

for (const line of input) {
  answers.push(line[1][0]);
  for (let i = 1; i < line[1].length; i++) {
    for (let answer of JSON.parse(JSON.stringify(answers))) {
      answer = answers.shift();
      answers.push(answer + line[1][i]);
      answers.push(answer * line[1][i]);
    }
  }
  if (answers.filter((answer) => answer === Number(line[0])).length) result += Number(line[0]);
  answers.length = 0;
}

console.log(result);
