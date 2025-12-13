export function printGrid(grid) {
  console.log("=== printGrid ===\n")
  console.log(grid.map(arr => arr.map(cell => `${cell}     `.substring(0, 5)).join("")).join("\n"))
  console.log()
}

export function forEachGrid(grid, fn) {
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
      fn(x, y)
    }
  }
}
