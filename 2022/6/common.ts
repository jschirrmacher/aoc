export function processSignal(signal: string, diffChars: number) {
  const start = signal.split("").findIndex((_, index) => {
    const quadrupel = signal.slice(index, index + diffChars)
    return quadrupel.length === new Set(quadrupel).size
  })
  return { start, end: start + diffChars }
}
