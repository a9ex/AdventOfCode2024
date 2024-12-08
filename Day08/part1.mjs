import fs from "node:fs";

const input = fs
  .readFileSync("./input")
  .toString()
  .split("\n")
  .filter((a) => a)
  .map((line) => line.split(""));

const antennas = {};
let antinodes = [];

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (input[i][j] !== ".") {
      antennas[input[i][j]] ? antennas[input[i][j]].push([i, j]) : (antennas[input[i][j]] = [[i, j]]);
    }
  }
}

for (const frequency in antennas) {
  for (const antennaLoc of antennas[frequency]) {
    for (let i = 0; i < antennas[frequency].length; i++) {
      if (antennas[frequency][i][0] === antennaLoc[0] && antennas[frequency][i][1] === antennaLoc[1]) continue;

      const vector = [antennas[frequency][i][0] - antennaLoc[0], antennas[frequency][i][1] - antennaLoc[1]];
      const antinode = [antennas[frequency][i][0] + vector[0], antennas[frequency][i][1] + vector[1]];

      antinodes.push(antinode);
    }
  }
}

antinodes = antinodes.filter((antinode) => antinode[0] >= 0 && antinode[0] < input.length && antinode[1] >= 0 && antinode[1] < input[0].length);

antinodes.forEach((antinode) => (input[antinode[0]][antinode[1]] = "#"));

console.log(input.flat().filter((item) => item === "#").length);
