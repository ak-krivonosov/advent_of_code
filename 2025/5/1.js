import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n")
console.log("🚀🚀🚀 ~ data:", data)

const ranges = []
const list = []

let isRange = true
data.forEach(value => {
  if (value === "") {
    isRange = false
    return
  }

  if (isRange) {
    ranges.push(value.split("-").map(num => +num))
  } else {
    list.push(parseInt(value))
  }
})

// console.log("🚀🚀🚀 ~ ranges:", ranges)
// console.log("🚀🚀🚀 ~ list:", list)

const result = list.reduce((acc, value) => {
  if (ranges.some(([min, max]) => value >= min && value <= max)) return acc + 1

  return acc
}, 0)

console.log("🚀🚀🚀 ~ result:", result)
