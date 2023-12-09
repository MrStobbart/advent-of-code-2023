export const getNextValueInSequence = (sequence: number[]): number => {
  return createNextSequences([sequence])
    .reverse()
    .reduce((previousLast, sequence) => {
      return sequence.pop()! + previousLast;
    }, 0);
};

export const createNextSequences = (sequences: number[][]): number[][] => {
  const lastSequence = sequences.at(-1);

  if (lastSequence === undefined) {
    throw new Error("This is not possible");
  }
  if (lastSequence.every((n) => n === 0)) {
    return sequences;
  }

  const nextSequence = lastSequence.reduce((nextSequence, number, index) => {
    const nextNumber = lastSequence[index + 1];
    if (nextNumber === undefined) {
      return nextSequence;
    }
    nextSequence.push(nextNumber - number);
    return nextSequence;
  }, [] as number[]);
  sequences.push(nextSequence);
  return createNextSequences(sequences);
};

export const parseSequences = (
  input: string,
  getNextValue = getNextValueInSequence
): number => {
  return input
    .split("\n")
    .map((sequenceString) =>
      sequenceString.split(" ").map((entry) => parseInt(entry))
    )
    .reduce((acc, sequence) => acc + getNextValue(sequence), 0);
};

export const getPreviousValueInSequence = (sequence: number[]): number => {
  return createNextSequences([sequence])
    .reverse()
    .reduce((previousFirst, sequence) => {
      return sequence.shift()! - previousFirst;
    }, 0);
};
