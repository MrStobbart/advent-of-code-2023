type Game = {
  distanceToBeat: number;
  duration: number;
};

const parseLine = (line: string): number[] =>
  line
    ?.split(":")[1]
    ?.split(" ")
    .map((timeStr) => parseInt(timeStr))
    .filter((time) => !!time) || [];

export const parseGames = (input: string): Game[] => {
  const times = parseLine(input.split("\n")[0]!);
  const distances = parseLine(input.split("\n")[1]!);

  return times.map((time, index) => ({
    distanceToBeat: distances[index]!,
    duration: time,
  }));
};

export const parseSingleGames = (input: string): Game => {
  const fixedInput = input.replaceAll(" ", "");
  const duration = parseLine(fixedInput.split("\n")[0]!)[0]!;
  const distanceToBeat = parseLine(fixedInput.split("\n")[1]!)[0]!;
  return { duration, distanceToBeat };
};
export const countWinningCombinations = (game: Game): number => {
  let winningCombinationCount = 0;
  for (
    let chargeDuration = 0;
    chargeDuration <= game.duration;
    chargeDuration++
  ) {
    if (
      chargeDuration * (game.duration - chargeDuration) >
      game.distanceToBeat
    ) {
      winningCombinationCount++;
    }
  }
  return winningCombinationCount;
};

export const calculateResultPart1 = (input: string): number => {
  const games = parseGames(input);

  return games.reduce((prev, game) => {
    return prev * countWinningCombinations(game);
  }, 1);
};
