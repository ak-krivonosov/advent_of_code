import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n")
// console.log("🚀🚀🚀 ~ data:", data)

const getDistance = (from, to) => {
  const [fromX, fromY, fromZ] = from.split(",").map(Number)
  const [toX, toY, toZ] = to.split(",").map(Number)

  return Math.sqrt((fromX - toX) ** 2 + (fromY - toY) ** 2 + (fromZ - toZ) ** 2)
}

const distances = []

for (let i = 0; i < data.length; i++) {
  for (let j = i + 1; j < data.length; j++) {
    distances.push({
      from: data[i],
      to: data[j],
      distance: getDistance(data[i], data[j]),
    })
  }
}

distances.sort(({distance: dA}, {distance: dB}) => dB - dA)

const circuits = [] // Sets

// while (circuits.reduce((acc, circuit) => acc + circuit.size, 0) <= 1000) {
for (let i = 0; i < 1000; i++) {
  const {from, to} = distances.pop()

  const fIndex = circuits.findIndex(set => set.has(from))
  const tIndex = circuits.findIndex(set => set.has(to))

  const circuitFrom = circuits[fIndex]
  const circuitTo = circuits[tIndex]

  if (circuitTo && circuitFrom && fIndex !== tIndex) {
    circuits.splice(Math.min(fIndex, tIndex), 1)
    circuits.splice(Math.max(fIndex, tIndex) - 1, 1)

    circuits.push(new Set([...circuitFrom, ...circuitTo]))
  } else if (circuitFrom) {
    circuitFrom.add(to)
  } else if (circuitTo) {
    circuitTo.add(from)
  } else {
    circuits.push(new Set([from, to]))
  }
}
circuits.sort((a, b) => b.size - a.size)

const result = circuits[0].size * circuits[1].size * circuits[2].size
console.log("🚀🚀🚀 ~ circuits[0].size * circuits[1].size * circuits[2].size:", circuits[0].size, circuits[1].size, circuits[2].size)
console.log("🚀🚀🚀 ~ result:", result)
