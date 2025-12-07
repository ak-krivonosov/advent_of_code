import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n").map(line => line.split(""))

const logData = data => {
  const result = data.reduce((acc, line) => `${acc}\n${line.join("")}`, "")
  console.log("🚀🚀🚀 ~ result:", result)
}

const start = {
  x: data[0].indexOf("S"),
  y: 0,
}
console.log("🚀🚀🚀 ~ start:", start)

// logData(data)

const result = new Set()

const store = new Set()
const drawLine = from => {
  const key = `x=${from.x}:y=${from.y}`

  if (store.has(key)) return

  store.add(key)

  for (let y = from.y + 1; y < data.length; y++) {
    const cell = data[y][from.x]

    if (cell === ".") {
      data[y][from.x] = "|"
    } else if (cell === "^") {
      result.add(`x=${from.x}:y=${y}`)

      drawLine({
        x: from.x - 1,
        y,
      })
      drawLine({
        x: from.x + 1,
        y,
      })
      break
    }

    // logData(data)
  }
}

drawLine(start)
console.log("🚀🚀🚀 ~ result:", result.size)
