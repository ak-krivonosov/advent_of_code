import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n").map(line => line.split(""))

const start = {
  x: data[0].indexOf("S"),
  y: 0,
}

const store = new Map()
const getAmountOfTimeLines = (pointX, pointY, value = 0) => {
  const key = `x:${pointX};y:${pointY};`

  if (store.has(key)) return store.get(key)

  for (let y = pointY + 1; y < data.length; y++) {
    if (data[y][pointX] === "^") {
      const amount = getAmountOfTimeLines(pointX - 1, y, value + 1) + getAmountOfTimeLines(pointX + 1, y, value + 1)

      store.set(key, amount)

      return amount
    }
  }

  return 1
}

const result = getAmountOfTimeLines(start.x, start.y)
console.log("🚀🚀🚀 ~ result: 40 === ", result)
