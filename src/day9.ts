export const getNextValueInSequence = (sequence: number[]): number => {
  return createNextSequences([sequence]).reduce((acc, sequence) => {
    return acc + sequence.pop()!;
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

export const parseSequencesPart1 = (input: string): number => {
  return input
    .split("\n")
    .map((sequenceString) =>
      sequenceString.split(" ").map((entry) => parseInt(entry))
    )
    .reduce((acc, sequence) => {
      return acc + getNextValueInSequence(sequence);
    }, 0);
};
