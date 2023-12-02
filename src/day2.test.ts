import { describe, expect, it } from "bun:test";
import { addGameIds, getNumberToAddForGame } from "./day2";
import { input } from "./day2Input";

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
    expect(addGameIds(input)).toBe(1);
  });
});
