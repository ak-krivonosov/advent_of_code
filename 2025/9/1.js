import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n").map(line => line.split(",").map(Number))
console.log("🚀🚀🚀 ~ data:", data)

const result = data.reduce((acc, [x1, y1], index) => {
  let square = 0

  for (let i = index + 1; i < data.length; i++) {
    const [x2, y2] = data[i]

    const width = Math.abs(x1 - x2 + 1)
    const height = Math.abs(y1 - y2 + 1)

    square = Math.max(square, width * height)
  }

  return Math.max(acc, square)
}, 0)
console.log("🚀🚀🚀 ~ result:", result)
