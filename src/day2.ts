type Colors = "red" | "green" | "blue";

const cubeLimits: Record<Colors, number> = {
  red: 12,
  green: 13,
  blue: 14,
};

export const getNumberToAddForGame = (game: string) => {
  if (game.length === 0) {
    return 0;
  }
  const gameId = parseInt(game.split(":")[0]?.split(" ")[1] || "0");
  const gameImpossible = game
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
    )
    .some((draw) => draw.some(({ color, count }) => count > cubeLimits[color]));
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
