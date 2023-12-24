export function solve(rawData: string, pos: "prev" | "next") {
  return rawData
    .split("\n")
    .map(line => line.split(" ").map(Number))
    .map(history => extrapolateNextNum(history, pos))
    .reduce((sum, val) => sum + val, 0)
}
function extrapolateNextNum(history: number[], pos: "prev" | "next") {
  const stack = [history]
  while (!stack[0].every(num => num === 0)) {
    stack.unshift(getDifferences(stack[0]))
  }
  return stack.reduce((acc, history) => {
    return pos === "prev" ? history.at(0)! - acc : history.at(-1)! + acc
  }, 0)
}
function getDifferences(history: number[]) {
  return history.filter((_, index) => index > 0).map((val, index) => val - history[index])
}
