import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split(",").map(range => range.split("-").map(Number))

console.log("🚀🚀🚀 ~ data:", data)

const result = data.reduce((acc, [from, to]) => {
  let sum = 0

  for (let i = from; i <= to; i++) {
    const str = `${i}`

    for (let j = 1; j <= str.length / 2; j++) {
      if (str.substring(0, j).repeat(str.length / j) !== str) continue

      sum += i
      break
    }
  }

  return acc + sum
}, 0)

console.log("🚀🚀🚀 ~ result:", result)
