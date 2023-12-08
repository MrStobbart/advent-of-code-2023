type Node2 = { name: string; L: string; R: string };

type Direction = "L" | "R";
type Node = Record<Direction, string> & { name: string };

type NodeMap = Record<string, Node>;

type ParsedInput = {
  directions: Direction[];
  nodeMap: NodeMap;
};

export const parseNode = (rawNode: string): Node => {
  if (rawNode.length !== 16) {
    throw new Error(`rawNode ${rawNode} does not have a length of 16 chars`);
  }

  const name = rawNode.substring(0, 3);
  const left = rawNode.substring(7, 10);
  const right = rawNode.substring(12, 15);
  return { name, R: right, L: left };
};

export const parseInput = (input: string): ParsedInput => {
  const directions = input.split("\n\n")[0]?.split("")! as Direction[];
  const rawNodes = input.split("\n\n")[1]!.split("\n");
  const nodeMap = Object.fromEntries(
    rawNodes.map((rawNode, index) => {
      const node = parseNode(rawNode);
      return [node.name, node];
    })
  );

  return { directions, nodeMap };
};

export const navigateInput = (
  { directions, nodeMap }: ParsedInput,
  startNodeName = "AAA",
  destination = "ZZZ"
): number => {
  const nodes = Object.values(nodeMap);
  if (
    nodeMap[startNodeName] === undefined ||
    !nodes.some((node) => node.name.includes(destination))
  ) {
    throw new Error(
      `Start ${startNodeName} or destination ${destination} not found`
    );
  }

  let currentNodeName = startNodeName;
  let steps = 0;

  while (!currentNodeName.includes(destination)) {
    if (steps > 1000000) {
      throw new Error(`Abort, this is already to high`);
    }
    const direction = directions[steps % directions.length]!;
    const node = nodeMap[currentNodeName];
    if (node === undefined) {
      throw new Error(`Node ${currentNodeName} does not exist`);
    }

    currentNodeName = node[direction];
    steps++;
  }

  return steps;
};

export const getGreatestCommonDivisor = (a: number, b: number): number => {
  if (b === 0) return a;
  return getGreatestCommonDivisor(b, a % b);
};

export const getLeastCommonMultiple = (a: number, b: number): number => {
  return (a * b) / getGreatestCommonDivisor(a, b);
};

export const navigateInputLikeAGhost = (parsedInput: ParsedInput) => {
  const { nodeMap } = parsedInput;
  return Object.values(nodeMap)
    .filter(({ name }) => name.charAt(2) === "A")
    .map((node) => navigateInput(parsedInput, node.name, "Z"))
    .reduce((prev, distance) => getLeastCommonMultiple(prev, distance), 1);
};
