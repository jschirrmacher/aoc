const operators = ["+", "*"]

export default function (rawData: string) {
  function evaluateEquation(numbers: number[], target: number) {
    const numOperators = numbers.length - 1

    function evaluate(ops: string[]) {
      return numbers.reduce((acc, num, index) => {
        if (index === 0) return num
        switch (ops[index - 1]) {
          case "+":
            return acc + num
          case "*":
            return acc * num
          default:
            throw new Error("Invalid operator")
        }
      }, 0)
    }

    function generateCombinations(ops: string[], depth: number): boolean {
      if (depth === numOperators) {
        return evaluate(ops) === target
      }
      return (
        operators.filter(operator => {
          const newOps = [...ops, operator]
          return generateCombinations(newOps, depth + 1)
        }).length > 0
      )
    }

    return generateCombinations([], 0)
  }

  return rawData
    .trim()
    .split("\n")
    .map(line => line.split(":"))
    .map(([target, numbers]) => ({
      target: Number(target.trim()),
      numbers: numbers.trim().split(" ").map(Number),
    }))
    .reduce((acc, eq) => {
      if (evaluateEquation(eq.numbers, eq.target)) {
        return acc + eq.target
      }
      return acc
    }, 0)
}
