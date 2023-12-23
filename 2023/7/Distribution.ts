export function getDistribution(strings: readonly string[]) {
  return strings.reduce((distribution, string) => {
    distribution[string] = (distribution[string] || 0) + 1
    return distribution
  }, {} as Record<string, number>)
}
