export default function (rawData: string) {
  return rawData
    .split("\n")
    .filter(line => line)
    .map(line =>
      line
        .split("")
        .filter(c => c.match(/\d/))
        .join("")
    )
    .map(line => line[0] + line[line.length - 1])
    .map(Number)
    .reduce((sum, val) => sum + val, 0)
}
