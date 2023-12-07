import { describe, expect, it } from "bun:test";
import { getInputForDay } from "./getInput";
import { Hand, compareCardValues, getHandValue, sortHands } from "./day7";

const testInput = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;

const input = await getInputForDay(7);

describe("Part 1", () => {
  // it.each([
  //   { hand: "32T3K", peparedHand: ["K", "T", "3", "3", "2"] },
  //   { hand: "T55J5", peparedHand: ["J", "T", "5", "5", "5"] },
  //   { hand: "KK677", peparedHand: ["K", "K", "7", "7", "6"] },
  //   { hand: "KTJJT", peparedHand: ["K", "J", "J", "T", "T"] },
  //   { hand: "QQQJA", peparedHand: ["A", "Q", "Q", "Q", "J"] },
  // ])("Prepares a hand correctly", ({ hand, peparedHand }) => {
  //   expect(prepareHand(hand)).toEqual(peparedHand as Hand);
  // });
  it.each([
    {
      peparedHand: ["K", "T", "3", "3", "2"] as Hand,
      otherPeparedHand: ["J", "T", "5", "5", "5"] as Hand,
      firstIsHigher: true,
    },
    {
      peparedHand: ["J", "T", "5", "5", "5"] as Hand,
      otherPeparedHand: ["K", "K", "7", "7", "6"] as Hand,
      firstIsHigher: false,
    },
    {
      peparedHand: ["K", "K", "7", "7", "6"] as Hand,
      otherPeparedHand: ["K", "J", "J", "T", "T"] as Hand,
      firstIsHigher: true,
    },
    {
      peparedHand: ["K", "J", "J", "T", "T"] as Hand,
      otherPeparedHand: ["A", "Q", "Q", "Q", "J"] as Hand,
      firstIsHigher: false,
    },
    {
      peparedHand: ["A", "Q", "Q", "Q", "J"] as Hand,
      otherPeparedHand: ["K", "T", "3", "3", "2"] as Hand,
      firstIsHigher: true,
    },
  ])(
    "Prepares a hand correctly",
    ({ peparedHand, otherPeparedHand, firstIsHigher }) => {
      expect(compareCardValues(peparedHand, otherPeparedHand)).toBe(
        firstIsHigher
      );
    }
  );

  it("calculates the testInput correctly", () => {
    expect(sortHands(testInput)).toBe(6440);
  });

  it("gets the correc duplicates", () => {
    expect(getHandValue("KTJJT")).toEqual({
      ranking: 4,
      preparedHand: ["K", "T", "J", "J", "T"],
    });
  });

  it("calculates the correct result", () => {
    expect(sortHands(input)).toBe(251121738);
  });
});
