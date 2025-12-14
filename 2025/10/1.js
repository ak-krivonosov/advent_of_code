import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})
const data = file.split("\n").map(line => {
  const [goal, ...buttons] = line.split(" ")

  buttons.pop()

  return {
    template: new Array(goal.substring(1, goal.length - 1).length).fill(0),
    goal: goal
      .substring(1, goal.length - 1)
      .split("")
      .map((digit, index) => (digit === "#" ? index : false))
      .filter(value => value !== false),
    buttons: buttons.map(str =>
      str
        .substring(1, str.length - 1)
        .split(",")
        .map(Number)
    ),
  }
})
// console.log("🚀🚀🚀 ~ data:", data)

const isTemplateValid = (goal, template) => {
  return template.every((value, index) => {
    if (goal.includes(index)) {
      return value % 2 !== 0
    } else {
      return value % 2 === 0
    }
  })
}

const isAmountOfCommandsValid = (goal, template, buttons, depth, startIndex) => {
  for (let i = startIndex; i < buttons.length && i + depth <= buttons.length; i++) {
    buttons[i].forEach(button => {
      template[button]++
    })

    if (depth !== 1) {
      if (isAmountOfCommandsValid(goal, template, buttons, depth - 1, i + 1)) {
        return true
      }
    } else if (isTemplateValid(goal, template)) {
      return true
    }

    buttons[i].forEach(button => {
      template[button]--
    })
  }

  return false
}

const getAmount = value => {
  for (let i = 1; i <= value.buttons.length; i++) {
    if (isAmountOfCommandsValid(value.goal, value.template, value.buttons, i, 0)) return i
  }

  return 0
}

const result = data.reduce((acc, value) => {
  return acc + getAmount(value)
}, 0)
console.log("🚀🚀🚀 ~ result:", result)
