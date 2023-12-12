type Observation = string[][];

export const inputTo2dArray = (input: string): Observation => {
  return input.split("\n").map((row) => row.split(""));
};

export const expandInput = (observation: Observation): Observation => {
  const expandedRows = observation.reduce((prev, curr) => {
    prev.push(curr);
    if (!curr.includes("#")) {
      prev.push([...curr]);
    }
    return prev;
  }, [] as string[][]);

  const columnIndizesWithoutGalaxies = expandedRows[0]!.reduce(
    (prev, _, index) => {
      const rowHasGalaxies = expandedRows.some(
        (column) => column[index] === "#"
      );

      if (!rowHasGalaxies) {
        prev.push(index);
      }
      return prev;
    },
    [] as number[]
  );

  const updatedRows = columnIndizesWithoutGalaxies.reduce(
    (rows, columnIndex, index) => {
      return rows.map((row, rowIndex) => {
        row.splice(columnIndex + index, 0, ".");

        return row;
      });
    },
    expandedRows
  );

  return updatedRows;
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
  position2: Position
): number => {
  const columnDistance = Math.abs(position1.column - position2.column);
  const rowDistance = Math.abs(position1.row - position2.row);
  return columnDistance + rowDistance;
};

export const sumFromPositionToOtherPositions = (
  position: Position,
  positions: Position[]
): number =>
  positions.reduce(
    (sum, otherPosition) =>
      sum + getShortestPathBetweenPositions(position, otherPosition),
    0
  );

export const sumPositionDistances = (positions: Position[]): number => {
  return positions.reduce((sum, position, index) => {
    let distancesForThisGalaxy = 0;
    for (let i = index + 1; i < positions.length; i++) {
      const otherPosition = positions[i]!;
      distancesForThisGalaxy =
        distancesForThisGalaxy +
        getShortestPathBetweenPositions(position, otherPosition);
    }
    return sum + distancesForThisGalaxy;
  }, 0);
};
