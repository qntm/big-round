const divideAndRoundTowardZero = (a, b) =>
  a / b

const divideAndRoundAwayFromZero = (a, b) =>
  a / b + (a % b === 0n ? 0n : a > 0n === b > 0n ? 1n : -1n)

const divideAndRoundTowardNegativeInfinity = (a, b) =>
  a / b + (a % b === 0n ? 0n : a > 0n === b > 0n ? 0n : -1n)

const divideAndRoundTowardPositiveInfinity = (a, b) =>
  a / b + (a % b === 0n ? 0n : a > 0n === b > 0n ? 1n : 0n)
