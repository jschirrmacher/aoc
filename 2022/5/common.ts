export function getCrates(stacks: string[]) {
  const crates = stacks
    .pop()
    ?.split(/\s+/)
    .filter(s => s)
    .map(s => []) as string[][]

  stacks.forEach(line => {
    let slice: string
    for (let i = 0; (slice = line.slice(i * 4, (i + 1) * 4)); i++) {
      const m = slice.match(/\[(\w)\]/)
      if (m) {
        crates[i].push(m[1])
      }
    }
  })

  return crates
}

export function parse(instructions: string[]) {
  const pattern = /move (\d+) from (\d+) to (\d+)/
  const parsed = instructions.map(
    instruction => instruction.match(pattern)?.map(Number) as number[]
  )
  return parsed.map(([_, num, from, to]) => ({ num, from: from - 1, to: to - 1 }))
}
