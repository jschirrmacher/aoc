export function parseIntegers(input: string, separator = " ", type = Number) {
  return input.split(separator).map(type)
}

export function splitBlocks(input: string) {
  return input.split("\n\n").filter(b => b)
}

export function splitLines(input: string) {
  return input.split("\n").filter(l => l)
}

export function sum(numbers: number[]) {
  return numbers.reduce((sum, num) => sum + num, 0)
}

export function mod(n: number, m: number) {
  return ((n % m) + m) % m
}

export function unique<T>(list: T[]) {
  return [...new Set(list)]
}

export function intersect<T>(arrays: T[][]) {
  const first = arrays.shift()
  return first ? first.filter(x => arrays.every(other => other.includes(x))) : []
}

export function groupsOf<T>(num: number, items: T[]) {
  const groups = Math.ceil(items.length / num)
  return new Array(groups).fill("").map((_, i) => items.slice(i * num, (i + 1) * num))
}

export const sort = {
  numbers(a: number, b: number) {
    return a - b
  },
}

export type Matrix<T> = T[][]

export function transpose<T>(matrix: Matrix<T>) {
  return matrix[0].map((_, c) => matrix.map((_, r) => matrix[r][c]))
}

export function binary(bitString: (string | number)[]) {
  return parseInt(bitString.join(""), 2)
}

export function* range(begin: number, end: number) {
  for (let i = begin; i <= end; i += 1) {
    yield i
  }
}

export function times<T>(num: number, func: (val: T, index: number) => T, init = undefined as T) {
  return [...range(0, num - 1)].reduce(func, init)
}

export function createMatrix(rawData: string) {
  const input = rawData.split("\n")
  const emptyRow = "".padStart(input[0].length, "X")
  input.unshift(emptyRow)
  input.push(emptyRow)

  const extended = input.map(row => ["X", ...row.split(""), "X"])
  const matrix = extended.flat().map(cell => (cell === "X" ? 99 : Number(cell)))
  const cols = extended[0].length
  return { matrix, cols }
}

export function printMatrix(matrix: number[], cols: number, maxCellLength = 2) {
  const chunks = matrix.reduce((chunks, cell, i) => {
    const ch = Math.floor(i / cols)
    chunks[ch] = ([] as number[]).concat(chunks[ch] || [], cell)
    return chunks
  }, [] as number[][])
  console.log(
    chunks.map(row => row.map(cell => ("" + cell).padStart(maxCellLength)).join(" ")).join("\n") +
      "\n"
  )
}

export function buildObject<T>(arr: (string | number)[][]): Record<string, T> {
  return Object.assign({}, ...arr.map(([key, val]) => ({ [key]: val })))
}

export type Range = [number, number]

export function overlap(range1: Range, range2: Range, full = false) {
  return (
    (range1[0] <= range2[0] && range1[1] >= range2[full ? 1 : 0]) ||
    (range2[0] <= range1[0] && range2[1] >= range1[full ? 1 : 0])
  )
}
