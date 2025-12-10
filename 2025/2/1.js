import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split(",").map(range => range.split("-").map(Number))

console.log("🚀🚀🚀 ~ data:", data)

const result = data.reduce((acc, [from, to]) => {
  let sum = 0

  for (let i = from; i <= to; i++) {
    const str = `${i}`
    if (str.length % 2) continue
    if (str.substring(0, str.length / 2) !== str.substring(str.length / 2)) continue

    sum += i
  }

  return acc + sum
}, 0)

console.log("🚀🚀🚀 ~ result:", result)
