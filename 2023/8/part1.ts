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

  let pos = 0
  let length = 0
  let node = "AAA"
  while (node !== "ZZZ") {
    length++
    node = network[node][instructions[pos++] === "L" ? 0 : 1]
    pos = pos % instructions.length
  }
  return length
}
