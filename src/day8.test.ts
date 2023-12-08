import { describe, expect, it } from "bun:test";
import {
  navigateInput,
  navigateInputLikeAGhost,
  parseInput,
  parseNode,
} from "./day8";
import { getInputForDay } from "./getInput";

const testInput1 = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`;

const testInput2 = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

const testInput3 = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

const input = await getInputForDay(8);

describe("Part1", () => {
  it("parses a node correctly", () => {
    expect(parseNode("AAA = (BBB, CCC)")).toEqual({
      name: "AAA",
      L: "BBB",
      R: "CCC",
    });
  });

  it("parses the testinput1 correctly", () => {
    expect(parseInput(testInput1)).toMatchSnapshot();
  });

  it("navigates testInput1 correctly", () => {
    const parsedInput = parseInput(testInput1);
    expect(navigateInput(parsedInput)).toBe(2);
  });

  it("navigates testInput2 correctly", () => {
    const parsedInput = parseInput(testInput2);
    expect(navigateInput(parsedInput)).toBe(6);
  });

  it("navigates the input correctly", () => {
    const parsedInput = parseInput(input);
    expect(navigateInput(parsedInput)).toBe(19199);
  });
});

describe("Part 2", () => {
  it("navigates the testInput3 correctly", () => {
    const parsedInput = parseInput(testInput3);
    expect(navigateInputLikeAGhost(parsedInput)).toBe(6);
  });

  it("navigates the input correctly", () => {
    const parsedInput = parseInput(input);
    expect(navigateInputLikeAGhost(parsedInput)).toBe(13663968099527);
  });
});
