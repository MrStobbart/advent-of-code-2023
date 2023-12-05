import { describe, expect, it } from "bun:test";
import {
  getDestination,
  getLowestLocation,
  parseAlamanc,
  prepareMap,
  seedParserPart2,
} from "./day5";
import { getInputForDay } from "./getInput";

const testInput = `
seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4
`;

const input = await getInputForDay(5);

describe("Part 1", () => {
  const testMap = `
seed-to-soil map:
50 98 2
52 50 48`;

  const preparedMap = prepareMap(testMap);

  it("prepares a map correctly", () => {
    expect(preparedMap).toEqual({
      name: "seed-to-soil",
      ranges: [
        { start: 98, end: 99, offset: -48 },
        { start: 50, end: 97, offset: 2 },
      ],
    });
  });

  it.each([
    { source: 79, destination: 81 },
    { source: 14, destination: 14 },
    { source: 55, destination: 57 },
    { source: 13, destination: 13 },
  ])("gets the correc destination", ({ source, destination }) => {
    expect(getDestination(preparedMap, source)).toBe(destination);
  });

  it("parses an alamanc correctly", () => {
    expect(parseAlamanc(testInput)).toMatchSnapshot();
  });

  it("gets the correct lowest location", () => {
    const alamanc = parseAlamanc(testInput);
    expect(getLowestLocation(alamanc)).toBe(35);
  });

  it("calculates the correct result", () => {
    const alamanc = parseAlamanc(input);
    expect(getLowestLocation(alamanc)).toBe(331445006);
  });
});

describe("Part 2", () => {
  it("calculates the lowest location with seed ranges", () => {
    const alamanc = parseAlamanc(testInput, seedParserPart2);
    expect(getLowestLocation(alamanc)).toBe(46);
  });

  it("calculates the correct result", () => {
    // const alamanc = parseAlamanc(input, seedParserPart2);
    console.log(alamanc);

    // expect(getLowestLocation(alamanc)).toBe(46);
    expect(35).toBe(46);
  });
});
