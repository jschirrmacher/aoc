export default function (rawData: string) {
  const reports = rawData
    .split("\n")
    .map(row => row.split(" ").map(Number))
    .filter(report =>
      report.some((_, i) => {
        const filtered = report.filter((_, j) => j !== i)
        const differences = filtered.slice(1).map((num, index) => num - filtered[index])
        const sign = Math.sign(differences[0])
        return (
          differences.every(num => Math.sign(num) === sign) &&
          differences.every(num => [1, 2, 3].includes(Math.abs(num)))
        )
      })
    )

  return reports.length
}
