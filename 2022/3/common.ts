export function toPriority(char: string) {
  const priority = char.charCodeAt(0) - 96
  return priority < 0 ? priority + 58 : priority
}
