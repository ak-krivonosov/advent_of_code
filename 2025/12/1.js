import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const rawData = file.split("\n").map((row) => row.split(": "))
// console.log("🚀🚀 ~ rawData:", rawData)

const result = rawData.reduce((acc, data) => {
  const [width, height] = data[0].split('x')
  const area = parseInt(width) * parseInt(height)

  const amount = data[1].split(' ').reduce((acc, value) => acc + parseInt(value), 0)
  const shapeArea = amount * 9

  return acc + +(area >= shapeArea)
}, 0)
console.log("🚀🚀 ~ result:", result)
