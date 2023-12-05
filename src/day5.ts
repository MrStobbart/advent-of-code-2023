type PreparedMap = {
  name: string;
  ranges: { start: number; end: number; offset: number }[];
};

type Alamanc = { seeds: number[]; maps: PreparedMap[] };

export const prepareMap = (rawMap: string): PreparedMap => {
  const lines = rawMap.split("\n");
  const name = lines.find((line) => line.includes("map"))?.split(" ")[0] || "";
  const ranges = lines
    .filter((line) => !line.includes("map") && line !== "")
    .map((line) => line.split(" "))
    .map((lineArr) => {
      const [destinationStart, sourceStart, length] = lineArr.map((n) =>
        parseInt(n)
      );
      if (
        destinationStart === undefined ||
        sourceStart === undefined ||
        length === undefined
      ) {
        throw new Error(`The line ${lineArr} seems off`);
      }
      return {
        start: sourceStart,
        end: sourceStart + length - 1,
        offset: destinationStart - sourceStart,
      };
    });
  return { name, ranges };
};

export const getDestination = (preparedMap: PreparedMap, source: number) => {
  const offset =
    preparedMap.ranges.find(
      ({ start, end }) => source >= start && source <= end
    )?.offset || 0;
  return source + offset;
};

const seedParserPart1 = (seedString: string): number[] =>
  seedString
    .split(":")[1]
    ?.trim()
    .split(" ")
    .map((seed) => parseInt(seed))!;

export const parseAlamanc = (
  input: string,
  seedParser: (seeds: string) => number[] = seedParserPart1
): Alamanc => {
  const maps = input.split("\n\n");
  const seeds = seedParser(maps.shift()!);

  if (seeds === undefined || maps.length === 0) {
    throw new Error("Input is faulty", input as unknown as any);
  }
  return {
    seeds,
    maps: maps.map((rawMap) => prepareMap(rawMap)),
  };
};

export const getLowestLocation = ({ seeds, maps }: Alamanc): number => {
  return Math.min(
    ...seeds.map((seed) =>
      maps.reduce((id, map) => getDestination(map, id), seed)
    )
  );
};

export const seedParserPart2 = (seedLine: string): number[] => {
  const seedRangeIds = seedLine
    ?.split(":")[1]
    ?.trim()
    .split(" ")
    .map((seed) => parseInt(seed))!;

  const seeds = [];
  for (let i = 0; i < seedRangeIds.length; i = i + 2) {
    const start = seedRangeIds[i]!;
    const length = seedRangeIds[i + 1]!;
    for (let seed = start; seed < start + length; seed++) {
      seeds.push(seed);
    }
  }
  return seeds;
};
