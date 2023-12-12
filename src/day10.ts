type TyleSymbol = "|" | "-" | "L" | "J" | "7" | "F" | "." | "S";

type TyleConnections = Record<TyleSymbol, [Connection, Connection] | undefined>;

type Connection = "north" | "east" | "south" | "west";
const possibleConnections: Connection[] = ["north", "east", "south", "west"];

type PositionInMap = { line: number; index: number };

export type TyleMap = TyleSymbol[][];

const tyleConnections: TyleConnections = {
  "|": ["north", "south"],
  "-": ["west", "east"],
  L: ["north", "east"],
  J: ["north", "west"],
  "7": ["south", "west"],
  F: ["south", "east"],
  ".": undefined,
  S: undefined,
};

export const parseInputToMap = (input: string): TyleMap => {
  return input.split("\n").map((line) => line.split("") as TyleSymbol[]);
};

export const countStepsThroughTheLoop = (tyleMap: TyleMap): number => {
  const startLine = tyleMap.findIndex((line) => line.includes("S"));
  const startIndex = tyleMap[startLine]!.findIndex((row) => row === "S");
  for (let i = 0; i < possibleConnections.length; i++) {
    const to = possibleConnections[i]!;
    // console.log("Possible connections", to);
    // const from = getConnectionOpposite(to);
    const { newPosition, from } = getNewPositionForConnection(to, {
      line: startLine,
      index: startIndex,
    });
    const steps = walkThroughMap(tyleMap, newPosition, 0, from);

    if (steps > 0) {
      return Math.ceil(steps / 2);
    }
  }

  throw new Error("The start has no connection");
};

export const getTyleFromMap = (
  tyleMap: TyleMap,
  { line, index }: PositionInMap
) => {
  const tyle = tyleMap[line]![index];

  if (tyle === undefined) {
    throw new Error(`Line ${line} index ${index} is out of bounds`);
  }
  return tyle;
};

export const getNewPositionForConnection = (
  to: Connection,
  { line, index }: PositionInMap
): { newPosition: PositionInMap; from: Connection } => {
  switch (to) {
    case "east":
      return {
        newPosition: { line, index: index + 1 },
        from: getConnectionOpposite(to),
      };
    case "west":
      return {
        newPosition: { line, index: index - 1 },
        from: getConnectionOpposite(to),
      };
    case "north":
      return {
        newPosition: { line: line - 1, index },
        from: getConnectionOpposite(to),
      };
    case "south":
      return {
        newPosition: { line: line + 1, index },
        from: getConnectionOpposite(to),
      };
  }
};

export const getConnectionOpposite = (connection: Connection): Connection => {
  switch (connection) {
    case "east":
      return "west";
    case "west":
      return "east";
    case "north":
      return "south";
    case "south":
      return "north";
  }
};

export const walkThroughMap = (
  tyleMap: TyleMap,
  position: PositionInMap,
  steps: number,
  connectedFrom?: Connection
): number => {
  const symbol = getTyleFromMap(tyleMap, position);
  const connections = tyleConnections[symbol];

  if (symbol === ".") {
    // console.log(
    //   `The pipe reached a dead end at line:${position.line}, index:${position.index} connected from ${connectedFrom}`
    // );
    return 0;
  }

  if (symbol === "S") {
    return steps;
  }

  if (connections && connectedFrom) {
    if (!connections.includes(connectedFrom)) {
      // console.log(
      //   `The pipe ${symbol} cannot be connected from ${connectedFrom}`
      // );
      return 0;
    }
    const to = connections.find((connection) => connection !== connectedFrom)!;
    const { newPosition, from } = getNewPositionForConnection(to, position);
    return walkThroughMap(tyleMap, newPosition, steps + 1, from);
  }

  console.error({ position, steps, connectedFrom });

  throw new Error("This should not happen");
};
