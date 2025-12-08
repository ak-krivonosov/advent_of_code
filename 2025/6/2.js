import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const rawData = file.split("\n")
const operatorsLine = rawData.splice(rawData.length - 1)[0]
const operators = operatorsLine.split("").filter(value => value !== " ")
// console.log("🚀🚀🚀 ~ rawData:", rawData)
// console.log("🚀🚀🚀 ~ operatorsLine:", operatorsLine)
// console.log("🚀🚀🚀 ~ operators:", operators)

const data = rawData.reduce((acc, line) => {
  for (let i = 0; i < line.length; i++) {
    acc[i] = acc[i] + line[i]
  }

  return acc
}, new Array(operatorsLine.length).fill(""))
// console.log("🚀🚀🚀 ~ data:", data)

let currentOperatorIndex = 0
let currentTotal = null
const result =
  data.reduce((acc, value) => {
    const parsed = parseInt(value)

    if (isNaN(parsed)) {
      const total = currentTotal
      currentTotal = null
      currentOperatorIndex++

      return acc + total
    }

    if (currentTotal === null) {
      currentTotal = parsed
      return acc
    }

    if (operators[currentOperatorIndex] === "+") {
      currentTotal += parsed
    } else {
      currentTotal *= parsed
    }

    return acc
  }, 0) + currentTotal
console.log("🚀🚀🚀 ~ result:", result)
