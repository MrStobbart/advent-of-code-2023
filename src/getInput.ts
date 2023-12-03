export const getInputForDay = (day: number) => {
  const fileName = `./data/day${day}.input.txt`;
  try {
    const file = Bun.file(fileName);
    return file.text();
  } catch (error) {
    throw new Error(
      `Could not load file with name ${fileName}`,
      error as Error
    );
  }
};
