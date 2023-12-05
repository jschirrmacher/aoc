export default function (rawData: string) {
  const lines = rawData.split("\n")
  const amounts = lines
    .filter(row => row)
    .map(row => row.split(":"))
    .map(([, numbers]) => numbers.split("|").map(numbers => numbers.split(" ").filter(num => num)))
    .map(([winning, having]) => having.filter(num => winning.includes(num)))
    .map(card => card.length)
    .reduce(
      (amounts, num, cardNo) =>
        amounts.map((amount, index) => {
          const inNum = index > cardNo && index <= cardNo + num
          return amount + (inNum ? amounts[cardNo] : 0)
        }),
      Array(lines.length).fill(1)
    )

  return amounts.reduce((acc, val) => acc + val, 0)
}
