import { describe, expect, it } from "bun:test";
import { getNumberForString, replaceSpelledDigits } from "./day1";

describe("Part 1", () => {
  it.each([
    { input: "1abc2", expectedNumber: 12 },
    { input: "pqr3stu8vwx", expectedNumber: 38 },
    { input: "a1b2c3d4e5f", expectedNumber: 15 },
    { input: "treb7uchet", expectedNumber: 77 },
  ])("correct", ({ input, expectedNumber }) => {
    expect(getNumberForString(input)).toBe(expectedNumber);
  });
});

describe("Part 2", () => {
  it("replaces spelled digits correctly", () => {
    expect(replaceSpelledDigits("abcone2threexyz")).toBe("abco1e2t3exyz");
  });

  it.each([
    { input: "two1nine", expectedNumber: 29 },
    { input: "eightwothree", expectedNumber: 83 },
    { input: "abcone2threexyz", expectedNumber: 13 },
    { input: "xtwone3four", expectedNumber: 24 },
    { input: "4nineeightseven2", expectedNumber: 42 },
    { input: "zoneight234", expectedNumber: 14 },
    { input: "7pqrstsixteen", expectedNumber: 76 },
  ])("correct", ({ input, expectedNumber }) => {
    const fixedInput = replaceSpelledDigits(input);
    // expect(fixedInput).toBe(2);

    expect(getNumberForString(fixedInput)).toBe(expectedNumber);
  });
});
