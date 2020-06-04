const ROUNDING_MODE = {
  DIRECTED_TOWARDS_ZERO: 0,
  DIRECTED_AWAY_FROM_ZERO: 1,
  DIRECTED_TOWARDS_NEGATIVE_INFINITY: 2,
  DIRECTED_TOWARDS_POSITIVE_INFINITY: 3,
  STOCHASTIC: 4,
  NEAREST_HALF_TOWARDS_ZERO: 5,
  NEAREST_HALF_AWAY_FROM_ZERO: 6,
  NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY: 7,
  NEAREST_HALF_TOWARDS_POSITIVE_INFINITY: 8,
  NEAREST_HALF_TO_EVEN: 9,
  NEAREST_HALF_TO_ODD: 10,
  NEAREST_HALF_ALTERNATE: 11,
  NEAREST_HALF_RANDOM: 12
}

// Return a random BigInt from [0, range). `range` must be a positive BigInt
const randBigInt = range =>
  BigInt(
    Array(range.toString().length + 10) // overcome bias towards the bottom end
      .fill()
      .map(() => String(Math.floor(Math.random() * 10)))
      .join('')
  ) % range

// Eww, mutable global state
let alternateUp = false

const divide = (roundingMode, a, b) => {
  const q = a / b

  // `b` must be non-zero or we would have thrown an exception by now

  // The real quotient (call it `r`) was rounded towards zero to yield `q`.
  // We may need to undo this, by adding back 1n, or -1n if `r` was negative.

  // What was the sign of `r`? May be non-zero even if `q` is `0n` e.g. 1n / 10n
  const sign = a === 0n ? 0n
    : a > 0n === b > 0n ? 1n
    : -1n

  // What fraction was truncated to make `r` into `q`?
  const absA = a >= 0n ? a : -a
  const absB = b >= 0n ? b : -b

  const remainder = absA % absB

  const undoTruncation = remainder === 0n ? false // no truncation occurred
    : roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_ZERO ? false
    : roundingMode === ROUNDING_MODE.DIRECTED_AWAY_FROM_ZERO ? true
    : roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_NEGATIVE_INFINITY ? sign < 0n
    : roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_POSITIVE_INFINITY ? sign > 0n
    : roundingMode === ROUNDING_MODE.STOCHASTIC ? randBigInt(absB) < remainder

    // All modes beyond this point round to nearest
    : remainder * 2n < absB ? false // truncated less than .5, leave it
    : remainder * 2n > absB ? true // truncated more than .5, undo that

    // Truncated .5 exactly, decide tie break
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_ZERO ? false
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_AWAY_FROM_ZERO ? true
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY ? sign < 0n
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_POSITIVE_INFINITY ? sign > 0n
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TO_EVEN ? q % 2n !== 0n
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TO_ODD ? q % 2n === 0n
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_ALTERNATE ? (alternateUp = !alternateUp)
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_RANDOM ? Math.random() < .5
    : undefined

  if (undoTruncation === undefined) {
    throw Error('Unrecognised rounding strategy')
  }

  return q + (undoTruncation ? sign : 0n)
}

module.exports = {
  divide,
  ROUNDING_MODE
}
