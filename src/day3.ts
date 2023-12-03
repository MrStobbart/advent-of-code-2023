export const sumEngineNumbers = (input: string): number =>
  getRelevantEngineNumbers(input).reduce((prev, curr) => {
    return prev + curr;
  }, 0);

const hasSpecialCharacters = (
  line: string | undefined,
  index: number,
  numberLength: number
): [boolean, string] => {
  if (!line) return [false, ""];
  const sliceStart = Math.max(index - 1, 0);
  const sliceEnd = Math.min(index + numberLength + 1, line.length);
  const sliced = line.slice(sliceStart, sliceEnd);
  return [!!sliced.match(/[^1234567890.\n]/g), sliced];
};
export const getRelevantEngineNumbers = (input: string): number[] => {
  const lines = input.split("\n");

  const relevantNumbers: number[] = [];
  for (let i = 0; i < lines.length; i++) {
    const previousLine = lines[i - 1];
    const currentLine = lines[i]!;
    const nextLine = lines[i + 1];

    const numbers = [...currentLine.matchAll(/\d+/g)].map((n) =>
      parseInt(n.toString())
    );
    const relevantNumbersFromThisLine = numbers.filter((number) => {
      const index = currentLine.indexOf(number.toString());
      const numberLength = number.toString().length;

      const [currentLineHasSpecialChars, currentSliced] = hasSpecialCharacters(
        currentLine,
        index,
        numberLength
      );
      const [previousLineHasSpecialChars, previousSliced] =
        hasSpecialCharacters(previousLine, index, numberLength);
      const [nextLineHasSpecialChars, nextSliced] = hasSpecialCharacters(
        nextLine,
        index,
        numberLength
      );

      const hasSpecialChars =
        currentLineHasSpecialChars ||
        previousLineHasSpecialChars ||
        nextLineHasSpecialChars;
      if (!hasSpecialChars) {
        console.log({
          number,
          previousLine: previousSliced,
          currentLinee: currentSliced,
          nextLineeeee: nextSliced,
          hasSpecialChars,
        });
      }
      return hasSpecialChars;
    });

    relevantNumbers.push(...relevantNumbersFromThisLine);
  }
  return relevantNumbers;
};
