export type Bag = {
  red: number,
  green: number,
  blue: number,
}
export type Color = keyof Bag
export type CubeSet = [number, Color][][]
