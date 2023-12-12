type Observation = string[][];

type EmptyIndizes = {
  emptyRowIndizes: number[];
  emptyColumnIndizes: number[];
};

export const inputTo2dArray = (input: string): Observation => {
  return input.split("\n").map((row) => row.split(""));
};

export const expandInput = (
  observation: Observation
): { observation: Observation } & EmptyIndizes => {
  const emptyRowIndizes: number[] = [];
  const emptyColumnIndizes: number[] = [];

  observation.forEach((row, index) => {
    if (!row.includes("#")) {
      emptyRowIndizes.push(index);
    }
  });

  for (let i = 0; i < observation[0]!.length; i++) {
    const rowHasGalaxies = observation.some((column) => column[i] === "#");

    if (!rowHasGalaxies) {
      emptyColumnIndizes.push(i);
    }
  }

  return { observation, emptyColumnIndizes, emptyRowIndizes };
};

export const getGalaxyPositions = (observation: Observation): Position[] => {
  return observation.reduce((prev, rows, rowIndex) => {
    const galaxyPositionsInRow: Position[] = rows
      .map((position, columnIndex) => {
        if (position === "#") {
          return { column: columnIndex, row: rowIndex };
        }
      })
      .filter((row): row is Position => !!row);
    return prev.concat(galaxyPositionsInRow);
  }, [] as Position[]);
};

type Position = { column: number; row: number };

export const getShortestPathBetweenPositions = (
  position1: Position,
  position2: Position,
  { emptyColumnIndizes, emptyRowIndizes }: EmptyIndizes,
  emptyIndexFactor = 1
): number => {
  const actualFactor = emptyIndexFactor - 1;
  const [lowColumn, highColumn] = [position1.column, position2.column].sort(
    (a, b) => a - b
  ) as [number, number];
  const [lowRow, highRow] = [position1.row, position2.row].sort(
    (a, b) => a - b
  ) as [number, number];

  const emptyColumnsPassed = emptyColumnIndizes.filter(
    (index) => index > lowColumn && index < highColumn
  );
  const emptyRowsPassed = emptyRowIndizes.filter(
    (index) => index > lowRow && index < highRow
  );

  const directColumnDistance = highColumn - lowColumn;
  const columnDistance =
    directColumnDistance + emptyColumnsPassed.length * actualFactor;
  const directRowDistance = highRow - lowRow;
  const rowDistance = directRowDistance + emptyRowsPassed.length * actualFactor;

  return columnDistance + rowDistance;
};

export const sumPositionDistances = (
  positions: Position[],
  emptyIndizes: EmptyIndizes,
  emptyIndexFactor = 1
): number =>
  positions.reduce((sum, position, index) => {
    let distancesForThisGalaxy = 0;
    for (let i = index + 1; i < positions.length; i++) {
      const otherPosition = positions[i]!;
      distancesForThisGalaxy =
        distancesForThisGalaxy +
        getShortestPathBetweenPositions(
          position,
          otherPosition,
          emptyIndizes,
          emptyIndexFactor
        );
    }
    return sum + distancesForThisGalaxy;
  }, 0);

export const sumDistance = (input: string, emptyIndexFactor = 1): number => {
  const expandedInput = expandInput(inputTo2dArray(input));
  const positions = getGalaxyPositions(expandedInput.observation);
  return sumPositionDistances(positions, expandedInput, emptyIndexFactor);
};
