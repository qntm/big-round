const ROUNDING_MODE = {
  DIRECTED_TOWARDS_ZERO: 0,
  DIRECTED_AWAY_FROM_ZERO: 1,
  DIRECTED_TOWARDS_NEGATIVE_INFINITY: 2,
  DIRECTED_TOWARDS_POSITIVE_INFINITY: 3,
  NEAREST_HALF_TOWARDS_ZERO: 4,
  NEAREST_HALF_AWAY_FROM_ZERO: 5,
  NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY: 6,
  NEAREST_HALF_TOWARDS_POSITIVE_INFINITY: 7,
  NEAREST_HALF_TO_EVEN: 8,
  NEAREST_HALF_TO_ODD: 9
}

const TRUNCATED = {
  NOTHING: 0,
  LESS_THAN_POINT_FIVE: 1,
  POINT_FIVE: 2,
  MORE_THAN_POINT_FIVE: 3
}

const SIGN = {
  NEGATIVE: 0,
  ZERO: 1,
  POSITIVE: 2
}

const divide = (roundingMode, a, b) => {
  const q = a / b

  // The true quotient (call it QR) is rounded towards zero by default. We may
  // need to undo this, by adding back 1n, or -1n if QR was negative.

  // What was the sign of QR?
  let sign
  if (a === 0n) {
    sign = SIGN.ZERO
  } else {
    sign = a > 0n === b > 0n ? SIGN.POSITIVE : SIGN.NEGATIVE
  }

  // What fraction was truncated to make QR into `q`?
  const absA = a > 0n ? a : -a
  const absB = b > 0n ? b : -b

  let truncated
  const twiceRemainder = absA % absB * 2n
  if (twiceRemainder === 0n) {
    truncated = TRUNCATED.NOTHING
  } else if (twiceRemainder < absB) {
    truncated = TRUNCATED.LESS_THAN_POINT_FIVE
  } else if (twiceRemainder === absB) {
    truncated = TRUNCATED.POINT_FIVE
  } else {
    // Maximum possible value is `2n * absB - 1n`
    truncated = TRUNCATED.MORE_THAN_POINT_FIVE
  }

  let bump
  if (roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_ZERO) {
    bump = false
  } else if (roundingMode === ROUNDING_MODE.DIRECTED_AWAY_FROM_ZERO) {
    bump = truncated !== TRUNCATED.NOTHING
  } else if (roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_NEGATIVE_INFINITY) {
    bump = truncated !== TRUNCATED.NOTHING && sign === SIGN.NEGATIVE
  } else if (roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_POSITIVE_INFINITY) {
    bump = truncated !== TRUNCATED.NOTHING && sign === SIGN.POSITIVE
  } else if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_ZERO) {
    bump = truncated === TRUNCATED.MORE_THAN_POINT_FIVE
  } else if (roundingMode === ROUNDING_MODE.NEAREST_HALF_AWAY_FROM_ZERO) {
    bump = truncated === TRUNCATED.MORE_THAN_POINT_FIVE ||
      truncated === TRUNCATED.POINT_FIVE
  } else if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY) {
    bump = truncated === TRUNCATED.MORE_THAN_POINT_FIVE ||
      (truncated === TRUNCATED.POINT_FIVE && sign === SIGN.NEGATIVE)
  } else if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_POSITIVE_INFINITY) {
    bump = truncated === TRUNCATED.MORE_THAN_POINT_FIVE ||
      (truncated === TRUNCATED.POINT_FIVE && sign === SIGN.POSITIVE)
  } else if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TO_EVEN) {
    bump = truncated === TRUNCATED.MORE_THAN_POINT_FIVE ||
      (truncated === TRUNCATED.POINT_FIVE && q % 2n !== 0n)
  } else if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TO_ODD) {
    bump = truncated === TRUNCATED.MORE_THAN_POINT_FIVE ||
      (truncated === TRUNCATED.POINT_FIVE && q % 2n === 0n)
  } else {
    throw Error('Unrecognised rounding strategy')
  }

  return q + (bump ? (sign === SIGN.POSITIVE ? 1n : -1n) : 0n)
}

module.exports = {
  divide,
  ROUNDING_MODE
}
