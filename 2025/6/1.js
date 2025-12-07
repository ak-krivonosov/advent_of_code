import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n").map(line => line.split(" ").filter(digit => digit))

const operations = data.splice(data.length - 1, 1)[0]
// console.log("🚀🚀🚀 ~ data:", data)
// console.log("🚀s🚀🚀 ~ operations:", operations)

const result = operations.reduce((acc, operation, index) => {
  if (operation === "+") {
    return acc + data.reduce((sum, values) => sum + +values[index], 0)
  } else if (operation === "*") {
    return acc + data.reduce((multiplies, values) => multiplies * +values[index], 1)
  } else {
    return acc
  }
}, 0)
console.log("🚀🚀🚀 ~ result:", result)
