type CPU = ReturnType<typeof CPU>
export type Instruction = "addx" | "noop"

export function CPU(onTick: (cpu: CPU) => void) {
  let X = 1
  let cycle = 0

  return {
    X,
    cycle,

    noop() {
      this.nextTick()
    },

    addx(V: number) {
      this.nextTick()
      this.nextTick()
      this.X += V
    },

    nextTick() {
      this.cycle++
      onTick(this)
    },

    exec(instruction: Instruction, value: number) {
      if (!this[instruction]) {
        throw Error(`${instruction} is not an instruction`)
      }
      this[instruction](value)
    },
  }
}
