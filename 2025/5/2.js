import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n")

const ranges = []

let isRange = true
data.forEach(value => {
  if (value === "") {
    isRange = false
    return
  }

  if (isRange) {
    ranges.push(value.split("-").map(num => +num))
  }
})

for (let i = 0; i < ranges.length; i++) {
  for (let j = 0; j < ranges.length; j++) {
    if (i === j) continue

    const minFirst = Math.min(...ranges[i])
    const maxFirst = Math.max(...ranges[i])

    const minSecond = Math.min(...ranges[j])
    const maxSecond = Math.max(...ranges[j])

    if (
      (minSecond <= minFirst && maxSecond >= minFirst) ||
      (minSecond <= maxFirst && maxSecond >= maxFirst) ||
      (minFirst <= minSecond && maxFirst >= minSecond) ||
      (minFirst <= maxSecond && maxFirst >= maxSecond)
    ) {
      ranges[i] = [Math.min(minFirst, minSecond), Math.max(maxFirst, maxSecond)]
      ranges.splice(j, 1)
      i = 0
    }
  }
}

const result = ranges.reduce((acc, [min, max]) => acc + max - min + 1, 0)

console.assert(result === 336495597913098, `❌ Incorrect: got ${result}`)
