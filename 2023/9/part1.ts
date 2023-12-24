export default function (rawData: string) {
  return rawData
    .split("\n")
    .map(line => line.split(" ").map(Number))
    .map(extrapolateNextNum)
    .reduce((sum, val) => sum + val, 0)
}

function extrapolateNextNum(history: number[]) {
  const stack = [history]
  while (!stack[0].every(num => num === 0)) {
    stack.unshift(getDifferences(stack[0]))
  }
  return stack.reduce((acc, history) => {
    return acc + history.at(-1)!
  }, 0)
}

function getDifferences(history: number[]) {
  return history.filter((_, index) => index > 0).map((val, index) => val - history[index])
}
