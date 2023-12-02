const digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const pattern = new RegExp("(" + digits.join("|") + ")", "g")

export default function (rawData: string) {
  return rawData
    .split("\n")
    .filter(line => line)
    .map(line => line.replace(pattern, replaceSpelledOutDigit))
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

function replaceSpelledOutDigit(digit: string) {
  return digits.findIndex(d => d === digit).toString()
}
