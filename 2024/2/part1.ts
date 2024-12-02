export default function (rawData: string) {
  const reports = rawData
    .split("\n")
    .map(row => row.split(" ").map(Number))
    .map(row => row.slice(1).map((num, index) => num - row[index]))
    .filter(row => row.every(num => Math.sign(num) === Math.sign(row[0])))
    .filter(row => row.every(num => [1, 2, 3].includes(Math.abs(num))))

  return reports.length
}
