import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const rawData = file.split("\n")
const data = new Map()

rawData.forEach((line) => {
  const [input, ...output] = line.split(' ')
  
  data.set(input.slice(0, -1), output)
})

const store = new Map()
const memo = (fn) => {
  return (...args) => {
    const key = args.join()
    if (store.has(key)) return store.get(key)

    const result = fn(...args)
    store.set(key, result)
    return result
  }
}

const count = memo((src, dst) => {
  if (src === dst) return 1

  return (data.get(src) ?? []).reduce((acc, output) => acc + count(output, dst), 0)
})

console.log(
  count('svr', 'dac') * count('dac', 'fft') * count('fft', 'out') + 
  count('svr', 'fft') * count('fft', 'dac') * count('dac', 'out')
)