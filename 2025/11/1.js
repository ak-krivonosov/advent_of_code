import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const rawData = file.split("\n")
const data = new Map()

rawData.forEach((line) => {
  const [input, ...output] = line.split(' ')
  
  data.set(input.slice(0, -1), output)
})

const countOuts = (input, visitedInputs = []) => {
  if (input === 'out') return 1
  if (visitedInputs.includes(input)) return 0
  visitedInputs.push(input)

  return data.get(input).reduce((acc, output) => acc + countOuts(output), 0)
}

const result = data.get('you').reduce((acc, input) => {

  return acc + countOuts(input)
}, 0)
console.log("🚀🚀 ~ result:", result)
