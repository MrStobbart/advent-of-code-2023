type Colors = "red" | "green" | "blue";

const cubeLimits: Record<Colors, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export const formatGame = (game: string) => {
  const formattedGame = game
    .trim()
    .slice(8)
    .split(";")
    .map((draw) =>
      draw
        .trim()
        .split(",")
        .map((cubes) => {
          const [count, color] = cubes.trim().split(" ");
          return { color: color as Colors, count: parseInt(count || "0") };
        })
    );

  return formattedGame;
};

export const getNumberToAddForGame = (game: string) => {
  if (game.length === 0) {
    return 0;
  }
  const gameId = parseInt(game.split(":")[0]?.split(" ")[1] || "0");

  const gameImpossible = formatGame(game).some((draw) =>
    draw.some(({ color, count }) => count > cubeLimits[color])
  );

  return gameImpossible ? 0 : gameId;
};

export const addGameIds = (input: string) => {
  const inputArr = input.trim().split("\n");

  return inputArr.reduce((prev, curr) => {
    const numberToAdd = getNumberToAddForGame(curr);
    if (numberToAdd > 0) {
      console.log(numberToAdd, curr);
    } else {
      console.log("FALSE", curr);
    }
    return prev + numberToAdd;
  }, 0);
};

export const getMinimumNumberOfCubes = (game: string) => {
  const minimumNumberOfCubes = { red: 0, green: 0, blue: 0 };
  formatGame(game).forEach((draw) =>
    draw.forEach((cubes) => {
      minimumNumberOfCubes[cubes.color] = Math.max(
        cubes.count,
        minimumNumberOfCubes[cubes.color]
      );
    })
  );
  return minimumNumberOfCubes;
};

export const calculateGamePower = (game: string): number => {
  const { red, green, blue } = getMinimumNumberOfCubes(game);
  return red * green * blue;
};

export const calculatePart2Result = (input: string) => {
  const inputArr = input.trim().split("\n");
  return inputArr.reduce((prev, curr) => {
    return prev + calculateGamePower(curr);
  }, 0);
};
