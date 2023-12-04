const getNumbers = (numbers: string) =>
  numbers
    .trim()
    .split(" ")
    .map((str) => parseInt(str))
    .filter((number) => number);

export const getWinningNumbersAndMyNumbers = (card: string) => {
  const [winningNumbersString, myNumbersString] = card
    .split(":")[1]!
    ?.split("|");

  if (!winningNumbersString || !myNumbersString) {
    throw new Error(`The line ${card} has not the expected format`);
  }

  const winningNumbers = getNumbers(winningNumbersString);
  const myNumbers = getNumbers(myNumbersString);
  return { myNumbers, winningNumbers };
};

export const countWinningNumbers = (
  winningNumbers: number[],
  myNumbers: number[]
) =>
  myNumbers.reduce((prev, curr) => {
    return prev + (winningNumbers.includes(curr) ? 1 : 0);
  }, 0);

export const calculateScratchcardsValue = (input: string) => {
  return input
    .split("\n")
    .filter((card) => card)
    .map(getWinningNumbersAndMyNumbers)
    .reduce((prev, curr) => {
      const winningNumbersCount = countWinningNumbers(
        curr.winningNumbers,
        curr.myNumbers
      );
      const value =
        winningNumbersCount === 0 ? 0 : Math.pow(2, winningNumbersCount - 1);
      return prev + value;
    }, 0);
};

export const getNumberOfMathingNumbersForCard = (card: string) => {
  const { winningNumbers, myNumbers } = getWinningNumbersAndMyNumbers(card);
  return countWinningNumbers(winningNumbers, myNumbers);
};

export const calculateEndNumberOfScratchcards = (input: string) => {
  const cards = input
    .split("\n")
    .filter((card) => card)
    .map((card) => {
      const matches = getNumberOfMathingNumbersForCard(card);
      return {
        card,
        count: 1,
        matches,
      };
    })
    .map((cardInfo, index, array) => {
      for (let i = index + 1; i < index + cardInfo.matches + 1; i++) {
        array[i]!.count = array[i]!.count + cardInfo.count;
      }

      return cardInfo;
    });

  return cards.reduce((prev, curr) => prev + curr.count, 0);
};
