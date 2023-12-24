import { findPath } from "./findPath"

export default function (rawData: string) {
  return Math.ceil(findPath(rawData).length / 2)
}
