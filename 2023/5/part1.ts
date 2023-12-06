export default function (rawData: string) {
  const blocks = rawData.split("\n\n")
  const seeds = blocks
    .shift()
    ?.match(/seeds: (.*)/)
    ?.at(1)
    ?.split(" ")
    .map(Number)!
  const data = Object.fromEntries(
    blocks
      .map(block => block.matchAll(/(?<from>\w+)?(-to-)?(?<to>\w+)?( map)?:\s*(?<block>.*)/gs))
      .map(([match]) => match?.groups as { to: string; from: string; block: string })
      .filter(data => data)
      .map(({ to, from, block }) => [
        from,
        { to, ranges: block.split("\n").map(line => line.split(" ").map(Number)) },
      ])
  )

  return seeds && Math.min(...seeds.map(findLocation))

  function findLocation(seed: number) {
    let type = "seed"
    let num = seed
    while (data[type]) {
      const range = data[type].ranges.find(range => num >= range[1] && num <= range[1] + range[2])
      if (range) {
        num -= range[1] - range[0]
      }
      type = data[type].to
    }
    return num
  }
}
