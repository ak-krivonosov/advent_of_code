import * as fs from "node:fs/promises"
import {printGrid, forEachGrid} from "../../helpers/printGrid"

const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
// const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n")
// console.log("🚀🚀🚀 ~ data:", data)

const xs = data
  .map(coords => +coords.split(",")[0])
  .filter((value, index, arr) => arr.indexOf(value) === index)
  .sort((a, b) => a - b)
const ys = data
  .map(coords => +coords.split(",")[1])
  .filter((value, index, arr) => arr.indexOf(value) === index)
  .sort((a, b) => a - b)

// console.log("🚀🚀🚀 ~ xs:", xs)
// console.log("🚀🚀🚀 ~ ys:", ys)

const grid = new Array(ys.length * 2 - 1).fill(null).map(() => new Array(xs.length * 2 - 1).fill(0))

for (let i = 0; i < data.length; i++) {
  const ni = (i + 1) % data.length
  const [x1, y1] = data[i].split(",").map(Number)
  const [x2, y2] = data[ni].split(",").map(Number)

  const [cx1, cx2] = [xs.indexOf(x1) * 2, xs.indexOf(x2) * 2].sort((a, b) => a - b)
  const [cy1, cy2] = [ys.indexOf(y1) * 2, ys.indexOf(y2) * 2].sort((a, b) => a - b)

  for (let y = cy1; y <= cy2; y++) {
    for (let x = cx1; x <= cx2; x++) {
      grid[y][x] = 1
    }
  }
}
console.log("🚀🚀🚀 ~ grid is filled with lines")
// printGrid(grid)

// Find all outside coordinates
const outside = new Set("-1,-1")
const queue = ["-1,-1"]
while (queue.length) {
  const [x, y] = queue.shift().split(",").map(Number)

  for (const [nx, ny] of [
    [x + 1, y],
    [x - 1, y],
    [x, y + 1],
    [x, y - 1],
  ]) {
    if (nx < -1 || nx > grid[0].length || ny < -1 || ny > grid.length) continue
    if (nx >= 0 && nx < grid[0].length && ny >= 0 && ny < grid.length && grid[ny][nx] === 1) continue

    const coords = `${nx},${ny}`
    if (outside.has(coords)) continue

    outside.add(coords)
    queue.push(coords)
  }
}
console.log("🚀🚀🚀 ~ outside coords are found")

// fill grid inside
forEachGrid(grid, (x, y) => {
  if (outside.has(`${x},${y}`)) return
  grid[y][x] = 1
})
// printGrid(grid)

console.log("🚀🚀🚀 ~ grid is filled inside")

const sumGrid = grid.map(line => [...line])
forEachGrid(grid, (x, y) => {
  const top = y > 0 ? sumGrid[y - 1][x] : 0
  const left = x > 0 ? sumGrid[y][x - 1] : 0
  const topLeft = x > 0 && y > 0 ? sumGrid[y - 1][x - 1] : 0

  sumGrid[y][x] = grid[y][x] + top + left - topLeft
})
// printGrid(sumGrid)

console.log("🚀🚀🚀 ~ sumGrid is created")

const isValid = (x1, y1, x2, y2) => {
  const [cx1, cx2] = [xs.indexOf(x1) * 2, xs.indexOf(x2) * 2].sort((a, b) => a - b)
  const [cy1, cy2] = [ys.indexOf(y1) * 2, ys.indexOf(y2) * 2].sort((a, b) => a - b)

  const top = cy1 > 0 ? sumGrid[cy1 - 1][cx2] : 0
  const left = cx1 > 0 ? sumGrid[cy2][cx1 - 1] : 0
  const topLeft = cx1 > 0 && cy1 > 0 ? sumGrid[cy1 - 1][cx1 - 1] : 0
  const count = sumGrid[cy2][cx2] - left - top + topLeft

  return count === (cx2 - cx1 + 1) * (cy2 - cy1 + 1)
}

const result = data.reduce((acc, coords, index) => {
  const [x1, y1] = coords.split(",").map(Number)
  let square = 0

  for (let i = index + 1; i < data.length; i++) {
    const [x2, y2] = data[i].split(",").map(Number)

    const width = Math.abs(x1 - x2) + 1
    const height = Math.abs(y1 - y2) + 1

    if (!isValid(x1, y1, x2, y2)) continue

    square = Math.max(square, width * height)
  }

  return Math.max(acc, square)
}, 0)
console.log("🚀🚀🚀 ~ result:", result)
