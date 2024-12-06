export default function (rawData: string) {
  return Array.from(rawData.matchAll(/do\(\)|don't\(\)|mul\((\d+),(\d+)\)/g))
    .map(([instruction, num1, num2]) => {
      switch (instruction) {
        case "do()":
          return ([sum]: [number, boolean]) => [sum, true] as [number, boolean]
        case "don't()":
          return ([sum]: [number, boolean]) => [sum, false] as [number, boolean]
        default:
          if (instruction.startsWith("mul")) {
            return ([sum, isEnabled]: [number, boolean]) =>
              isEnabled
                ? ([sum + parseInt(num1) * parseInt(num2!), isEnabled] as [number, boolean])
                : ([sum, isEnabled] as [number, boolean])
          } else {
            throw new Error("Unexpected instruction")
          }
      }
    })
    .reduce(([sum, isEnabled], func) => func([sum, isEnabled]), [0, true] as [number, boolean])[0]
}
