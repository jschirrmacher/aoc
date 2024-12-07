export type Rules = [number, number]
export type Update = number[]

export function isUpdateInOrder(update: Update, rules: Rules[]): boolean {
  const position = new Map<number, number>()
  update.forEach((page, index) => {
    position.set(page, index)
  })

  return rules.every(([X, Y]) => {
    return !position.has(X) || !position.has(Y) || position.get(X)! < position.get(Y)!
  })
}
