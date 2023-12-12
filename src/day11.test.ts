import { describe, expect, it } from "bun:test";
import {
  expandInput,
  getGalaxyPositions,
  getShortestPathBetweenPositions,
  inputTo2dArray,
  sumDistance,
} from "./day11";
import { getInputForDay } from "./getInput";

const testInput = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

const testInputExpanded = `....#........
.........#...
#............
.............
.............
........#....
.#...........
............#
.............
.............
.........#...
#....#.......`;

const testInputWithNumbers = `....1........
.........2...
3............
.............
.............
........4....
.5...........
............6
.............
.............
.........7...
8....9.......`;

const input = await getInputForDay(11);

describe("Part 1", () => {
  it("creates the correct 2d array", () => {
    expect(inputTo2dArray(testInput)).toEqual([
      [".", ".", ".", "#", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      ["#", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", "#", ".", ".", "."],
      [".", "#", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "#"],
      [".", ".", ".", ".", ".", ".", ".", ".", ".", "."],
      [".", ".", ".", ".", ".", ".", ".", "#", ".", "."],
      ["#", ".", ".", ".", "#", ".", ".", ".", ".", "."],
    ]);
  });

  it("expands the input correctly", () => {
    expect(expandInput(inputTo2dArray(testInput))).toEqual({
      observation: inputTo2dArray(testInput),
      emptyColumnIndizes: [2, 5, 8],
      emptyRowIndizes: [3, 7],
    });
  });

  it("gets the correct galaxy positions", () => {
    expect(
      getGalaxyPositions(expandInput(inputTo2dArray(testInput)).observation)
    ).toEqual([
      { column: 3, row: 0 },
      { column: 7, row: 1 },
      { column: 0, row: 2 },
      { column: 6, row: 4 },
      { column: 1, row: 5 },
      { column: 9, row: 6 },
      { column: 7, row: 8 },
      { column: 0, row: 9 },
      { column: 4, row: 9 },
    ]);
  });

  it.each([
    {
      position1: { column: 6, row: 1 },
      position2: { column: 11, row: 5 },
      emptyIndizes: { emptyColumnIndizes: [5, 7], emptyRowIndizes: [0, 4] },
      emptyIndexFactor: 1,
      distance: 9,
    },
    {
      position1: { column: 6, row: 1 },
      position2: { column: 11, row: 5 },
      emptyIndizes: { emptyColumnIndizes: [5, 7], emptyRowIndizes: [0, 4] },
      emptyIndexFactor: 10,
      distance: 27,
    },
    {
      position1: { column: 6, row: 1 },
      position2: { column: 11, row: 5 },
      emptyIndizes: { emptyColumnIndizes: [6, 7], emptyRowIndizes: [0, 4] },
      emptyIndexFactor: 100,
      distance: 207,
    },
    {
      position1: { column: 0, row: 3 },
      position2: { column: 1, row: 7 },
      emptyIndizes: { emptyColumnIndizes: [], emptyRowIndizes: [] },
      emptyIndexFactor: 1,
      distance: 5,
    },
    {
      position1: { column: 6, row: 1 },
      position2: { column: 6, row: 1 },
      emptyIndizes: { emptyColumnIndizes: [], emptyRowIndizes: [] },
      emptyIndexFactor: 1,
      distance: 0,
    },
    {
      position1: { column: 3, row: 1 },
      position2: { column: 1, row: 1 },
      emptyIndizes: { emptyColumnIndizes: [2], emptyRowIndizes: [] },
      emptyIndexFactor: 2,
      distance: 3,
    },
    {
      position1: { column: 3, row: 1 },
      position2: { column: 1, row: 1 },
      emptyIndizes: { emptyColumnIndizes: [2], emptyRowIndizes: [] },
      emptyIndexFactor: 1,
      distance: 2,
    },
  ])(
    "getShortestPathBetweenPositions",
    ({ position1, position2, distance, emptyIndizes, emptyIndexFactor }) => {
      expect(
        getShortestPathBetweenPositions(
          position1,
          position2,
          emptyIndizes,
          emptyIndexFactor
        )
      ).toBe(distance);
    }
  );

  it("sums the galaxy distances correctly for the testInput", () => {
    expect(sumDistance(testInput, 2)).toBe(374);
  });

  it("sums the galaxy distances correctly", () => {
    expect(sumDistance(input, 2)).toBe(10313550);
  });
});

describe("part2", () => {
  it("sums the galaxy distances correctly for the testInput (10 times)", () => {
    expect(sumDistance(testInput, 10)).toBe(1030);
  });

  it("sums the galaxy distances correctly for the testInput (100 times)", () => {
    expect(sumDistance(testInput, 100)).toBe(8410);
  });

  it("sums the galaxy distances correctly ", () => {
    expect(sumDistance(input, 1000000)).toBe(611998089572);
  });
});
