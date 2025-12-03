import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n")

const store = new Map()

const getKey = (line, depth) => `${line}+${depth}`

const getBiggestUnit = (line, depth) => {
  const key = getKey(line, depth)
  const storedValue = store.get(key)

  if (storedValue) return storedValue

  let result = 0
  let biggestFirstDigit = 0

  for (let i = 0; i < line.length; i++) {
    const firstDigit = line[i]

    if (+firstDigit < biggestFirstDigit) continue

    biggestFirstDigit = Math.max(biggestFirstDigit, +firstDigit)

    if (depth > 1 && i !== line.length - 1) {
      result = Math.max(result, +(firstDigit + getBiggestUnit(line.substring(i + 1), depth - 1)))
    } else {
      result = Math.max(result, +firstDigit)
    }
  }

  store.set(key, result)

  return result
}

const finish = data.reduce((acc, line) => acc + getBiggestUnit(line, 12), 0)

console.log("🚀🚀🚀 ~ finish:", finish === 167384358365132)
