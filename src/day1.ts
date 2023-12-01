export const getNumberForString = (line: string) => {
  const digits = line.split("").filter((char) => !Number.isNaN(parseInt(char)));
  return digits.length >= 1 ? parseInt(`${digits[0]}${digits.at(-1)}`) : 0;
};

const spelledDigits = [
  { spelled: "one", digit: "on1e" },
  { spelled: "two", digit: "tw2o" },
  { spelled: "three", digit: "thre3e" },
  { spelled: "four", digit: "fou4r" },
  { spelled: "five", digit: "fiv5e" },
  { spelled: "six", digit: "si6x" },
  { spelled: "seven", digit: "seve7n" },
  { spelled: "eight", digit: "eigh8t" },
  { spelled: "nine", digit: "nin9e" },
];

export const replaceSpelledDigits = (line: string) => {
  return spelledDigits.reduce((prev, curr) => {
    return prev.replaceAll(curr.spelled, curr.digit);
  }, line);
};

export const calculateCalibrationPart1 = (input: string) => {
  return input
    .split("\n")
    .reduce((prev, curr) => prev + getNumberForString(curr), 0);
};

export const calculateCalibrationPart2 = (input: string) => {
  return input
    .split("\n")
    .reduce(
      (prev, curr) => prev + getNumberForString(replaceSpelledDigits(curr)),
      0
    );
};

export const findNumbers = (line: string) => {};
