type Node2 = { name: string; L: string; R: string };

type Direction = "L" | "R";
type Node = Record<Direction, string> & { name: string };

type Nodes = Record<string, Node>;

type ParsedInput = {
  directions: Direction[];
  nodes: Nodes;
  startNodeName: string;
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
  let startNodeName = "";
  const nodes = Object.fromEntries(
    rawNodes.map((rawNode, index) => {
      const node = parseNode(rawNode);
      if (index === 0) {
        startNodeName = node.name;
      }
      return [node.name, node];
    })
  );

  return { directions, nodes, startNodeName };
};

export const navigateInput = ({ directions, nodes }: ParsedInput): number => {
  const startNodeName = "AAA";
  const destination = "ZZZ";
  if (nodes[startNodeName] === undefined || nodes[destination] === undefined) {
    console.error("Start or destination not found", {
      start: startNodeName,
      destination,
      nodes,
    });

    return 0;
  }

  let currentNodeName = startNodeName;
  let steps = 0;

  while (currentNodeName !== destination) {
    if (steps > 1000000) {
      throw new Error(`Abort, this is already to high`);
    }
    const direction = directions[steps % directions.length]!;
    const node = nodes[currentNodeName];
    if (node === undefined) {
      throw new Error(`Node ${currentNodeName} does not exist`);
    }

    currentNodeName = node[direction];
    steps++;
  }

  return steps;
};
