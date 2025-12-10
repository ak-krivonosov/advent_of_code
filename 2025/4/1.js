import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n").map(line => line.split(""))
console.log("🚀🚀🚀 ~ data:", data)

const positions = [
  [-1, -1],
  [0, -1],
  [1, -1],
  [-1, 0],
  [1, 0],
  [-1, 1],
  [0, 1],
  [1, 1],
]
const isCellAccessible = (x, y) => {
  let limit = 4

  positions.forEach(([dx, dy]) => {
    if (data[y + dy]?.[x + dx] === "@") {
      limit--
    }
  })

  // console.log("🚀🚀🚀 ~ isCellAccessible ~ limit:", limit)
  return limit > 0
}

const result = data.reduce((acc, row, y) => {
  let sum = 0

  row.forEach((cell, x) => {
    if (cell === ".") return
    if (!isCellAccessible(x, y)) return

    sum++
  })

  return acc + sum
}, 0)
console.log("🚀🚀🚀 ~ result:", result)
