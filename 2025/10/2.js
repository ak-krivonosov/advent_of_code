import * as fs from "node:fs/promises"

// const file = await fs.readFile("dummy_small.txt", {encoding: "utf8"})
const file = await fs.readFile("dummy.txt", {encoding: "utf8"})

// Utility: generate cartesian product of [0,1] repeated n times
function cartesianProductBinary(n) {
  if (n === 0) return [[]];

  const rest = cartesianProductBinary(n - 1);
  const out = [];

  for (const r of rest) {
    out.push([0, ...r]);
    out.push([1, ...r]);
  }
  return out;
}

// Utility: generate combinations of indices [0..n-1] of size k
function combinations(n, k, start = 0, curr = [], out = []) {
  if (curr.length === k) {
    out.push([...curr]);
    return out;
  }
  for (let i = start; i < n; i++) {
    curr.push(i);
    combinations(n, k, i + 1, curr, out);
    curr.pop();
  }
  return out;
}

function patterns(coeffs) {
  const numButtons = coeffs.length;
  const numVariables = coeffs[0].length;

  const out = new Map();

  for (const parity of cartesianProductBinary(numVariables)) {
    out.set(parity.join(","), new Map());
  }

  for (let numPressed = 0; numPressed <= numButtons; numPressed++) {
    for (const buttons of combinations(numButtons, numPressed)) {
      const pattern = Array(numVariables).fill(0);

      for (const b of buttons) {
        for (let i = 0; i < numVariables; i++) {
          pattern[i] += coeffs[b][i];
        }
      }

      const parityPattern = pattern.map(v => v % 2).join(",");
      const key = pattern.join(",");

      const bucket = out.get(parityPattern);
      if (!bucket.has(key)) {
        bucket.set(key, numPressed);
      }
    }
  }

  return out;
}

function solveSingle(coeffs, goal) {
  const patternCosts = patterns(coeffs);
  console.log("🚀🚀 ~ solveSingle ~ patternCosts:", patternCosts)
  const memo = new Map();

  function solveSingleAux(goalArr) {
    const memoKey = goalArr.join(",");
    if (memo.has(memoKey)) return memo.get(memoKey);

    if (goalArr.every(v => v === 0)) return 0;

    let answer = 1_000_000;
    const parityKey = goalArr.map(v => v % 2).join(",");

    for (const [patternKey, patternCost] of patternCosts.get(parityKey)) {
      const pattern = patternKey.split(",").map(Number);

      if (pattern.some((value, i) => value > goalArr[i])) continue

      const newGoal = pattern.map((p, i) => (goalArr[i] - p) / 2);
      const candidate = patternCost + 2 * solveSingleAux(newGoal);

      if (candidate < answer) answer = candidate;
    }

    memo.set(memoKey, answer);
    return answer;
  }

  return solveSingleAux(goal);
}

function solve(raw) {
  let score = 0;
  const lines = raw.trim().split("\n");

  lines.forEach((line, idx) => {
    const parts = line.trim().split(/\s+/);
    const goalStr = parts.at(-1);
    const coeffStrs = parts.slice(1, -1);

    const goal = goalStr
      .slice(1, -1)
      .split(",")
      .map(Number);
    console.log("🚀🚀 ~ solve ~ goal:", goal)

    let coeffs = coeffStrs.map(r =>
      r.slice(1, -1).split(",").map(Number)
    );
    
    // Convert to indicator vectors
    coeffs = coeffs.map(r =>
      Array.from({ length: goal.length }, (_, i) => +r.includes(i))
    );
    console.log("🚀🚀 ~ solve ~ coeffs:", coeffs)

    const subscore = solveSingle(coeffs, goal);
    console.log(`Line ${idx + 1}/${lines.length}: answer ${subscore}`);
    score += subscore;
  });

  console.log(score);
}

solve(file);
// 16361