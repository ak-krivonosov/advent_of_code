import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n")

console.log("🚀🚀🚀 ~ data:", data)

let finish = 0
data.reduce((acc, input) => {
  const value = input.startsWith("L") ? -input.substring(1) : +input.substring(1)
  const end = (acc + value) % 100

  if (end === 0) finish++

  if (end < 0) return end + 100

  return end
}, 50)

console.log("🚀🚀🚀 ~ finish:", finish)
