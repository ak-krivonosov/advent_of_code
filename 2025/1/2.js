import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n")

console.log("🚀🚀🚀 ~ data:", data)

let finish = 0
data.reduce((acc, input) => {
  const value = input.startsWith("L") ? -input.substring(1) : +input.substring(1)

  const end = (acc + value + 100) % 100
  const turns = Math.abs(Math.floor((acc + value) / 100))
  const amountOfOverZero = acc === 0 && value < 0 ? Math.max(0, turns - 1) : turns

  finish += amountOfOverZero

  if (end === 0 && amountOfOverZero === 0) {
    finish++
  }

  // if (amountOfOverZero === 0 && end !== 0) {
  console.log("\n\n🚀🚀🚀 ~ acc:", acc)
  console.log("🚀🚀🚀 ~ value:", value)
  console.log("🚀🚀🚀 ~ acc + value:", acc + value)
  console.log("🚀🚀🚀 ~ end:", end)
  console.log("🚀🚀🚀 ~ amountOfOverZero:", amountOfOverZero)
  console.log("🚀🚀🚀 ~ finish:", finish)
  // }

  return end
}, 50)

console.log("🚀🚀🚀 ~ finish:", finish, 5963)
