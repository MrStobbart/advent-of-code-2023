import { describe, expect, it } from "bun:test";
import { getInputForDay } from "./getInput";
import {
  createNextSequences,
  getNextValueInSequence,
  parseSequencesPart1,
} from "./day9";

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const input = await getInputForDay(9);

describe("Part 1", () => {
  it("Parses the testInput correctly", () => {
    expect(parseSequencesPart1(testInput)).toBe(114);
  });

  it("Gets the next value in a sequence correctly", () => {
    expect(getNextValueInSequence([10, 13, 16, 21, 30, 45])).toBe(68);
  });

  it("Creates the next sequences correctly", () => {
    expect(createNextSequences([[10, 13, 16, 21, 30, 45]])).toEqual([
      [10, 13, 16, 21, 30, 45],
      [3, 3, 5, 9, 15],
      [0, 2, 4, 6],
      [2, 2, 2],
      [0, 0],
    ]);
  });

  it("calculates the input correctly", () => {
    expect(parseSequencesPart1(input)).toBe(1930746032);
  });
});
