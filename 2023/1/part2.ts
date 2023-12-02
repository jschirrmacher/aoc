const digits = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
const pattern = new RegExp("(" + digits.join("|") + "|\\d" + ")")

export default function (rawData: string) {
  return rawData
    .split("\n")
    .filter(line => line)
    .map(line => findFirstDigit(line) + findLastDigit(line))
    .map(Number)
    .reduce((sum, val) => sum + val, 0)
}

function findFirstDigit(line: string) {
  const match = line.match(pattern)
  if (match) {
    const index = digits.findIndex(d => d === match[0])
    if (index >= 0) {
      return index.toString()
    }
    return match[0]
  }
  return ""
}

function findLastDigit(line: string) {
  let pos = line.length
  while (--pos >= 0) {
    const sub = line.substring(pos)
    const digit = findFirstDigit(sub)
    if (digit) {
      return digit
    }
  }
  return ""
}
