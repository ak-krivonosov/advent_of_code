import * as fs from "node:fs/promises"

const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
// const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n")

console.log("🚀🚀🚀 ~ data:", data)

const finish = data.reduce((acc, line) => {
  let result = 0

  for (let i = 0; i < line.length; i++) {
    const firstDigit = line[i]

    for (let j = i + 1; j < line.length; j++) {
      const secondDigit = line[j]

      result = Math.max(result, +`${firstDigit}${secondDigit}`)
    }
  }

  // console.log("🚀🚀🚀 ~ result:", result)
  return acc + result
}, 0)

console.log("🚀🚀🚀 ~ finish:", finish)
