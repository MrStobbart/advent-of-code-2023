import { describe, expect, it } from "bun:test";
import { getInputForDay } from "./getInput";
import {
  createNextSequences,
  getNextValueInSequence,
  getPreviousValueInSequence,
  parseSequences,
} from "./day9";

const testInput = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

const input = await getInputForDay(9);

describe("Part 1", () => {
  it("Parses the testInput correctly", () => {
    expect(parseSequences(testInput)).toBe(114);
  });

  it("Gets the next value in a sequence correctly", () => {
    expect(getNextValueInSequence([10, 13, 16, 21, 30, 45])).toBe(68);
  });

  it.each([
    {
      sequence: [0, 3, 6, 9, 12, 15],
      expectedSequences: [
        [0, 3, 6, 9, 12, 15],
        [3, 3, 3, 3, 3],
        [0, 0, 0, 0],
      ],
    },
    {
      sequence: [1, 3, 6, 10, 15, 21],
      expectedSequences: [
        [1, 3, 6, 10, 15, 21],
        [2, 3, 4, 5, 6],
        [1, 1, 1, 1],
        [0, 0, 0],
      ],
    },
    {
      sequence: [10, 13, 16, 21, 30, 45],
      expectedSequences: [
        [10, 13, 16, 21, 30, 45],
        [3, 3, 5, 9, 15],
        [0, 2, 4, 6],
        [2, 2, 2],
        [0, 0],
      ],
    },
  ])(
    "Creates the next sequences correctly",
    ({ sequence, expectedSequences }) => {
      expect(createNextSequences([sequence])).toEqual(expectedSequences);
    }
  );

  it("calculates the input correctly", () => {
    expect(parseSequences(input)).toBe(1930746032);
  });
});

describe("Part 2", () => {
  it("Parses the testInput correctly", () => {
    expect(parseSequences(testInput, getPreviousValueInSequence)).toBe(2);
  });

  it("Gets the previous value in a sequence correctly", () => {
    expect(getPreviousValueInSequence([10, 13, 16, 21, 30, 45])).toBe(5);
  });

  it("calculates the correct result", () => {
    expect(parseSequences(input, getPreviousValueInSequence)).toBe(1154);
  });
});
