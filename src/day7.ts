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
const cardsMap: Record<Card, number> = {
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
  //   return hand.split("").sort((a, b) => {
  //     const cardValueA = cardsMap[a as Card];
  //     const cardValueB = cardsMap[b as Card];
  //     if (cardValueA === undefined || cardValueB === undefined) {
  //       throw new Error(`Hand ${hand} contains invalid cards`);
  //     }
  //     return cardValueB - cardValueA;
  //   }) as Hand;

  return hand.split("") as Hand;
};

export const getHandValue = (hand: string) => {
  const preparedHand = prepareHand(hand);
  //   if (hand.every((card) => card === hand[0])) {
  //     return "fiveOfAKind";
  //   }

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
  otherPreparedHand: Hand
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

export const sortHands = (hands: string) => {
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
        return compareCardValues(a.preparedHand, b.preparedHand) ? -1 : 1;
      }
      return sort;
    });

  console.log(sortedHands);

  return sortedHands.reduce((totalWinnings, currHand, index) => {
    return totalWinnings + currHand.bid * (sortedHands.length - index);
  }, 0);
};
