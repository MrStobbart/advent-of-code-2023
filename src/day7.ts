type Card =
  | "2"
  | "3"
  | "4"
  | "5"
  | "6"
  | "7"
  | "8"
  | "9"
  | "T"
  | "J"
  | "Q"
  | "K"
  | "A";

export type Hand = [Card, Card, Card, Card, Card];
const cardsMapPart1: Record<Card, number> = {
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 13,
  A: 14,
};

const possibleCombinations = [
  [5],
  [4, 1],
  [3, 2],
  [3, 1, 1],
  [2, 2, 1],
  [2, 1, 1, 1],
  [1, 1, 1, 1, 1],
];

export const prepareHand = (hand: string): Hand => {
  return hand.split("") as Hand;
};

export const getHandValuePart1 = (hand: string) => {
  const preparedHand = prepareHand(hand);

  let cardCounts: Record<Card, number> = {
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    T: 0,
    J: 0,
    Q: 0,
    K: 0,
    A: 0,
  };

  preparedHand.forEach((card) => {
    cardCounts[card]++;
  });

  const sortedCardCounts = Object.values(cardCounts)
    .filter((cardCount) => cardCount)
    .sort((a, b) => b - a);

  const sortedCardCountsJson = JSON.stringify(sortedCardCounts);
  const ranking = possibleCombinations.findIndex(
    (possibleCombination) =>
      JSON.stringify(possibleCombination) === sortedCardCountsJson
  );

  return { ranking, preparedHand };
};

export const compareCardValues = (
  preparedHand: Hand,
  otherPreparedHand: Hand,
  cardsMap = cardsMapPart1
): boolean => {
  for (let i = 0; i < preparedHand.length; i++) {
    const cardValue = cardsMap[preparedHand[i]!]!;
    const otherCardValue = cardsMap[otherPreparedHand[i]!]!;

    if (cardValue === otherCardValue) {
      continue;
    }
    return cardValue > otherCardValue;
  }

  // TODO what happens when two hands are the same?
  return false;
};

export const sortHands = (
  hands: string,
  getHandValue = getHandValuePart1,
  cardsMap = cardsMapPart1
) => {
  const sortedHands = hands
    .split("\n")
    .map((handWithBid) => {
      const handAndBid = handWithBid.split(" ")!;
      return { hand: handAndBid[0]!, bid: parseInt(handAndBid[1]!) };
    })
    .map(({ hand, bid }) => {
      const { ranking, preparedHand } = getHandValue(hand);
      return { hand, bid, ranking, preparedHand };
    })
    .sort((a, b) => {
      const sort = a.ranking - b.ranking;
      if (sort === 0) {
        return compareCardValues(a.preparedHand, b.preparedHand, cardsMap)
          ? -1
          : 1;
      }
      return sort;
    });

  return sortedHands.reduce((totalWinnings, currHand, index) => {
    return totalWinnings + currHand.bid * (sortedHands.length - index);
  }, 0);
};

export const cardsMapPart2: Record<Card, number> = {
  J: 1,
  "2": 2,
  "3": 3,
  "4": 4,
  "5": 5,
  "6": 6,
  "7": 7,
  "8": 8,
  "9": 9,
  T: 10,
  Q: 11,
  K: 12,
  A: 13,
};

export const getHandValuePart2 = (hand: string) => {
  const preparedHand = prepareHand(hand);

  let jokers = 0;
  let cardCounts: Record<Card, number> = {
    "2": 0,
    "3": 0,
    "4": 0,
    "5": 0,
    "6": 0,
    "7": 0,
    "8": 0,
    "9": 0,
    T: 0,
    J: 0,
    Q: 0,
    K: 0,
    A: 0,
  };

  preparedHand.forEach((card) => {
    if (card === "J") {
      jokers++;
    } else {
      cardCounts[card]++;
    }
  });

  let sortedCardCounts = Object.values(cardCounts)
    .filter((cardCount) => cardCount)
    .sort((a, b) => b - a)
    .map((cardCount, index) => {
      if (index === 0) {
        return cardCount + jokers;
      }
      return cardCount;
    })
    .sort((a, b) => b - a);

  if (hand === "JJJJJ") {
    sortedCardCounts = [5];
  }

  const sortedCardCountsJson = JSON.stringify(sortedCardCounts);
  const ranking = possibleCombinations.findIndex(
    (possibleCombination) =>
      JSON.stringify(possibleCombination) === sortedCardCountsJson
  );

  if (ranking === -1) {
    console.error(sortedCardCounts);
    throw new Error(`hand ${hand} could not get a ranking`);
  }

  return { ranking, preparedHand };
};
