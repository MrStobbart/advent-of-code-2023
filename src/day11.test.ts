import { describe, expect, it } from "bun:test";
import {
  expandInput,
  getGalaxyPositions,
  getShortestPathBetweenPositions,
  inputTo2dArray,
  sumPositionDistances,
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
    expect(expandInput(inputTo2dArray(testInput))).toEqual(
      inputTo2dArray(testInputExpanded)
    );
  });

  it("expands the input correctly", () => {
    expect(getGalaxyPositions(expandInput(inputTo2dArray(testInput)))).toEqual([
      { column: 4, row: 0 },
      { column: 9, row: 1 },
      { column: 0, row: 2 },
      { column: 8, row: 5 },
      { column: 1, row: 6 },
      { column: 12, row: 7 },
      { column: 9, row: 10 },
      { column: 0, row: 11 },
      { column: 5, row: 11 },
    ]);
  });

  it.each([
    {
      position1: { column: 6, row: 1 },
      position2: { column: 11, row: 5 },
      distance: 9,
    },
    {
      position1: { column: 0, row: 3 },
      position2: { column: 1, row: 7 },
      distance: 5,
    },
    {
      position1: { column: 6, row: 1 },
      position2: { column: 6, row: 1 },
      distance: 0,
    },
  ])(
    "getShortestPathBetweenPositions",
    ({ position1, position2, distance }) => {
      expect(getShortestPathBetweenPositions(position1, position2)).toBe(
        distance
      );
    }
  );

  it("sums the galaxy distances correctly for the testInput", () => {
    const positions = getGalaxyPositions(
      expandInput(inputTo2dArray(testInput))
    );
    expect(sumPositionDistances(positions)).toBe(374);
  });

  it("sums the galaxy distances correctly", () => {
    const positions = getGalaxyPositions(expandInput(inputTo2dArray(input)));
    expect(sumPositionDistances(positions)).toBe(10313550);
  });
});

describe("part2", () => {
  it("sums the galaxy distances correctly for the testInput", () => {
    const positions = getGalaxyPositions(
      expandInput(inputTo2dArray(testInput))
    );
    expect(sumPositionDistances(positions)).toBe(374);
  });
});
