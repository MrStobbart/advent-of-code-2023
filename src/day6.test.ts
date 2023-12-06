import { describe, expect, it } from "bun:test";
import {
  calculateResultPart1,
  countWinningCombinations,
  parseGames,
} from "./day6";
import { getInputForDay } from "./getInput";

const testInput = `Time:      7  15   30
Distance:  9  40  200`;

const input = await getInputForDay(6);

describe("Part 1", () => {
  it("parses the input correctly to games", () => {
    expect(parseGames(testInput)).toEqual([
      { distanceToBeat: 9, duration: 7 },
      { distanceToBeat: 40, duration: 15 },
      { distanceToBeat: 200, duration: 30 },
    ]);
  });

  it.each([
    {
      game: { distanceToBeat: 9, duration: 7 },
      numberOfWinningCombinations: 4,
    },
    {
      game: { distanceToBeat: 40, duration: 15 },
      numberOfWinningCombinations: 8,
    },
    {
      game: { distanceToBeat: 200, duration: 30 },
      numberOfWinningCombinations: 9,
    },
  ])(
    "calculates the correct number of winning combinations for a game",
    ({ game, numberOfWinningCombinations }) => {
      expect(countWinningCombinations(game)).toBe(numberOfWinningCombinations);
    }
  );

  it("calculates the correct test result", () => {
    expect(calculateResultPart1(testInput)).toBe(288);
  });

  it("calculates the correct result", () => {
    expect(calculateResultPart1(input)).toBe(1731600);
  });
});
