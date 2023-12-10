import { describe, expect, it } from "bun:test";
import { getInputForDay } from "./getInput";
import {
  TyleMap,
  countStepsThroughTheLoop,
  getNewPositionForConnection,
  parseInputToMap,
} from "./day10";

const testInput1 = `.....
.S-7.
.|.|.
.L-J.
.....`;

const testInput2 = `..F7.
.FJ|.
SJ.L7
|F--J
LJ...`;

const input = await getInputForDay(10);

describe("Part 1", () => {
  it.each([
    { input: testInput1, steps: 4 },
    { input: testInput2, steps: 8 },
    { input: input, steps: 6842 },
  ])(
    "calculats the correct number of steps through the pipes to the farthest point",
    ({ input, steps }) => {
      expect(countStepsThroughTheLoop(parseInputToMap(input))).toBe(steps);
    }
  );

  it.each([
    {
      input: testInput1,
      expectedMap: [
        [".", ".", ".", ".", "."],
        [".", "S", "-", "7", "."],
        [".", "|", ".", "|", "."],
        [".", "L", "-", "J", "."],
        [".", ".", ".", ".", "."],
      ],
    },
    {
      input: testInput2,
      expectedMap: [
        [".", ".", "F", "7", "."],
        [".", "F", "J", "|", "."],
        ["S", "J", ".", "L", "7"],
        ["|", "F", "-", "-", "J"],
        ["L", "J", ".", ".", "."],
      ],
    },
  ])(
    "calculats the correct number of steps through the pipes to the farthest point",
    ({ input, expectedMap }) => {
      expect(parseInputToMap(input)).toEqual(expectedMap as TyleMap);
    }
  );

  describe("getNewPositionForConnection", () => {
    it("creates a new position correctly", () => {
      expect(
        getNewPositionForConnection("east", { line: 1, index: 1 })
      ).toEqual({ newPosition: { line: 1, index: 2 }, from: "west" });
    });
  });
});
