import { describe, expect, it } from "bun:test";
import { navigateInput, parseInput, parseNode } from "./day8";
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
    expect(navigateInput(parsedInput)).toBe(6);
  });
});
