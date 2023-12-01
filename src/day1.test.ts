import { describe, expect, it } from "bun:test";
import {
  calculateCalibrationPart1,
  calculateCalibrationPart2,
  getNumberForString,
  replaceSpelledDigits,
} from "./day1";
import { input } from "./day1Input";

describe("Part 1", () => {
  it.each([
    { input: "1abc2", expectedNumber: 12 },
    { input: "pqr3stu8vwx", expectedNumber: 38 },
    { input: "a1b2c3d4e5f", expectedNumber: 15 },
    { input: "treb7uchet", expectedNumber: 77 },
  ])("correct", ({ input, expectedNumber }) => {
    expect(getNumberForString(input)).toBe(expectedNumber);
  });

  it("calculates the correct result", () => {
    expect(calculateCalibrationPart1(input)).toBe(54561);
  });
});

describe("Part 2", () => {
  it("replaces spelled digits correctly", () => {
    expect(replaceSpelledDigits("abcone2threexyz")).toBe("abcon1e2thre3exyz");
    expect(replaceSpelledDigits("oneighthreeight")).toBe("on1eigh8thre3eigh8t");
  });

  it.each([
    { input: "two1nine", expectedNumber: 29 },
    { input: "eightwothree", expectedNumber: 83 },
    { input: "abcone2threexyz", expectedNumber: 13 },
    { input: "xtwone3four", expectedNumber: 24 },
    { input: "4nineeightseven2", expectedNumber: 42 },
    { input: "zoneight234", expectedNumber: 14 },
    { input: "7pqrstsixteen", expectedNumber: 76 },
    { input: "nine", expectedNumber: 99 },
    { input: "twone", expectedNumber: 21 },
    { input: "eightwo", expectedNumber: 82 },
    { input: "eighthree", expectedNumber: 83 },
    { input: "oneight", expectedNumber: 18 },
    { input: "nineight", expectedNumber: 98 },
    { input: "oneighthreeight", expectedNumber: 18 },
    { input: "oneighthreeighteighteightseven", expectedNumber: 17 },
  ])("correct", ({ input, expectedNumber }) => {
    const fixedInput = replaceSpelledDigits(input);
    expect(getNumberForString(fixedInput)).toBe(expectedNumber);
  });

  it("calculates the correct result", () => {
    expect(calculateCalibrationPart2(input)).toBe(54076);
  });
});
