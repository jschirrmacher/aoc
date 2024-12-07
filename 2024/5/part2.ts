import { isUpdateInOrder, Rules, Update } from "./lib"

export default function (rawData: string) {
  function orderUpdate(update: Update, rules: Rules[]): Update {
    const graph = Object.fromEntries(update.map(page => [page, [] as number[]]))
    const inDegree = Object.fromEntries(update.map(page => [page, 0]))

    function decrementInDegree(acc: number[], neighbor: number) {
      inDegree[neighbor]--
      return inDegree[neighbor] === 0 ? [...acc, neighbor] : acc
    }

    function processQueue(queue: number[], orderedUpdate: Update) {
      if (queue.length === 0) return orderedUpdate

      const [page, ...restQueue] = queue
      const newOrderedUpdate = [...orderedUpdate, page]

      return processQueue(graph[page].reduce(decrementInDegree, restQueue), newOrderedUpdate)
    }

    rules.forEach(([X, Y]) => {
      if (graph[X] && graph[Y] !== undefined) {
        graph[X] = [...graph[X], Y]
        inDegree[Y] = (inDegree[Y] || 0) + 1
      }
    })

    const orderedUpdate: Update = []

    const queue = Object.keys(inDegree)
      .filter(page => inDegree[Number(page)] === 0)
      .map(Number)
    return processQueue(queue, orderedUpdate)
  }

  const [rulesInput, updatesInput] = rawData.split("\n\n")
  const rules: Rules[] = rulesInput.split("\n").map(line => line.split("|").map(Number) as Rules)

  return updatesInput
    .split("\n")
    .map(line => line.split(",").map(Number))
    .filter(update => !isUpdateInOrder(update, rules))
    .map(update => orderUpdate(update, rules))
    .reduce((sum, update) => sum + update[Math.floor(update.length / 2)], 0)
}
