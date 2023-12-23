type Network = Record<string, [string, string]>

export default function (rawData: string) {
  const data = rawData.split("\n\n")
  const instructions = data[0].split("")
  const network = Object.fromEntries(
    data[1]
      .split("\n")
      .map(line => line.split(" = "))
      .map(([key, val]) => [key, val.replace(/[\(\)]/g, "").split(", ")])
  ) as Network

  let nodes = Object.keys(network).filter(node => node.endsWith("A"))
  const cycles = nodes.map(findCycle)
  return cycles.reduce((acc, val) => acc * val, 1) * instructions.length

  function findCycle(node: string) {
    let pos = 0
    let length = 0
    while (!node.endsWith("Z")) {
      length++
      node = network[node][instructions[pos++] === "L" ? 0 : 1]
      pos = pos % instructions.length
    }
    return length %instructions.length === 0 ? length / instructions.length : length
  }
}
