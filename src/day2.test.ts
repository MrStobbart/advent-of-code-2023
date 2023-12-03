import { describe, expect, it } from "bun:test";
import {
  addGameIds,
  calculateGamePower,
  calculatePart2Result,
  getMinimumNumberOfCubes,
  getNumberToAddForGame,
} from "./day2";
import { getInputForDay } from "./getInput";

const input = await getInputForDay(2);

describe("Part 1", () => {
  it.each([
    {
      input: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      numberToAdd: 1,
    },
    {
      input: "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
      numberToAdd: 2,
    },
    {
      input:
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
      numberToAdd: 0,
    },
    {
      input:
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
      numberToAdd: 0,
    },
    {
      input: "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      numberToAdd: 5,
    },
    {
      input: "Game 6: 13 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      numberToAdd: 0,
    },
    {
      input: "Game 17: 12 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      numberToAdd: 17,
    },
  ])("Game $input has number to add $numberToAdd", ({ input, numberToAdd }) => {
    expect(getNumberToAddForGame(input)).toBe(numberToAdd);
  });

  it("calculates the testdata correctly", () => {
    expect(
      addGameIds(`
Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`)
    ).toBe(8);
  });

  it("calculates the correct result", () => {
    expect(addGameIds(input)).toBe(2256);
  });
});

describe("Part 2", () => {
  it.each([
    {
      input: "Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green",
      minimumNumberOfCubes: { red: 4, green: 2, blue: 6 },
      expectedGamePower: 48,
    },
    {
      input: "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue",
      minimumNumberOfCubes: { red: 1, green: 3, blue: 4 },
      expectedGamePower: 12,
    },
    {
      input:
        "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red",
      minimumNumberOfCubes: { red: 20, green: 13, blue: 6 },
      expectedGamePower: 1560,
    },
    {
      input:
        "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red",
      minimumNumberOfCubes: { red: 14, green: 3, blue: 15 },
      expectedGamePower: 630,
    },
    {
      input: "Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green",
      minimumNumberOfCubes: { red: 6, green: 3, blue: 2 },
      expectedGamePower: 36,
    },
    {
      input: "Game 17: 12 red",
      minimumNumberOfCubes: { red: 12, green: 0, blue: 0 },
      expectedGamePower: 0,
    },
  ])(
    "Get minimum number of dice",
    ({ input, minimumNumberOfCubes, expectedGamePower }) => {
      expect(getMinimumNumberOfCubes(input)).toEqual(minimumNumberOfCubes);
      expect(calculateGamePower(input)).toEqual(expectedGamePower);
    }
  );

  it("calculates the correct result for part 2", () => {
    expect(calculatePart2Result(input)).toBe(74229);
  });
});
