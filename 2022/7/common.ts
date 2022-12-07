type Directory = {
  type: "dir"
  name: string
  children: (Directory | File)[]
  size?: number
  parent?: Directory
  traverse: () => Array<Directory | File>
}

type File = {
  type: "file"
  name: string
  size: number
}

export function parseStructure(lines: string[]) {
  function fillDirSizes(dir: Directory): number {
    dir.size = dir.children.reduce(
      (sum, entry) => (sum += entry.type === "file" ? entry.size : fillDirSizes(entry)),
      0
    )
    return dir.size
  }

  function traverse(this: Directory): Array<Directory | File> {
    return [
      this,
      ...this.children.flatMap(entry => (entry.type === "dir" ? traverse.bind(entry)() : [])),
    ]
  }

  const fileSystem: Directory = { name: "/", children: [], type: "dir", traverse }
  let cwd = fileSystem
  lines.forEach(line => {
    const match = line.match(/\$ (cd|ls)( ([\.\w\/]+))?/)
    if (line.startsWith("$")) {
      if (match) {
        if (match[1] === "cd") {
          if (match[3] === "..") {
            cwd = cwd.parent!
          } else if (match[3] !== "/") {
            cwd = cwd.children.find(entry => entry.name === match![3]) as Directory
          } else {
            cwd = fileSystem
          }
        }
      }
    } else {
      const [size, name] = line.split(" ")
      if (size === "dir") {
        cwd.children.push({ type: "dir", name, children: [], parent: cwd, traverse })
      } else {
        cwd.children.push({ type: "file", name, size: parseInt(size) })
      }
    }
  })
  fillDirSizes(fileSystem)
  return fileSystem
}
