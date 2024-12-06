export default function (rawData: string) {
  return Array.from(rawData.matchAll(/mul\((\d+),(\d+)\)/g))
    .map(([, num1, num2]) => [parseInt(num1), parseInt(num2)])
    .map(([x, y]) => x * y)
    .reduce((acc, value) => acc + value, 0)
}
