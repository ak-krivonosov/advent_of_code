import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const rawData = file.split("\n")
const data = new Map()

rawData.forEach((line) => {
  const [input, ...output] = line.split(' ')
  
  data.set(input.slice(0, -1), output)
})

const count = (src, dst) => {
  if (src === dst) return 1

  return data.get(src).reduce((acc, output) => acc + count(output, dst), 0)
}

console.log(count('you', 'out'))