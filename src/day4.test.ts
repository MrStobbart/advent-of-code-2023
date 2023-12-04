import { describe, expect, it } from "bun:test";
import {
  calculateEndNumberOfScratchcards,
  calculateScratchcardsValue,
  countWinningNumbers,
  getNumberOfMathingNumbersForCard,
  getWinningNumbersAndMyNumbers,
} from "./day4";
import { getInputForDay } from "./getInput";

const testInput = `
Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
`;

const input = await getInputForDay(4);

describe("Part 1", () => {
  it("extracts the numbers correctly", () => {
    expect(
      getWinningNumbersAndMyNumbers(
        "Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1"
      )
    ).toEqual({
      winningNumbers: [1, 21, 53, 59, 44],
      myNumbers: [69, 82, 63, 72, 16, 21, 14, 1],
    });
  });

  it("calculates the scratchcards value correctly", () => {
    expect(calculateScratchcardsValue(testInput)).toBe(13);
  });

  it("counts winning numbers correctly", () => {
    const card = "Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53";
    const { winningNumbers, myNumbers } = getWinningNumbersAndMyNumbers(card);
    expect(countWinningNumbers(winningNumbers, myNumbers)).toBe(4);
    expect(getNumberOfMathingNumbersForCard(card)).toBe(4);
  });

  it("calculates the correct result for part 1", () => {
    expect(calculateScratchcardsValue(input)).toBe(18619);
  });
});

describe("Part 2", () => {
  it("calculates the testInput correctly", () => {
    expect(calculateEndNumberOfScratchcards(testInput)).toBe(30);
  });
  it("calculates the correct result for part 2", () => {
    expect(calculateEndNumberOfScratchcards(input)).toBe(8063216);
  });
});
