import { describe, expect, it } from "bun:test";
import { getRelevantEngineNumbers, sumEngineNumbers } from "./day3";
import { getInputForDay } from "./getInput";

const input = await getInputForDay(3);

describe("Part 1", () => {
  const testInput = `
467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598.*
.........8
.......111`;
  it("sums the numbers correctly", () => {
    expect(sumEngineNumbers(testInput)).toBe(4369);
  });

  it("gets the correct numbers", () => {
    expect(getRelevantEngineNumbers(testInput)).toEqual([
      467, 35, 633, 617, 592, 755, 664, 598, 8,
    ]);
  });

  it("calculates the correct result", () => {
    expect(sumEngineNumbers(input)).toBe(552284);
  });
});
