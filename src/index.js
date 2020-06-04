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

const divide = (roundingMode, a, b) => {
  const q = a / b

  // The real quotient (call it `r`) was rounded towards zero to yield `q`.
  // We may need to undo this, by adding back 1n, or -1n if `r` was negative.

  // What was the sign of `r`? May be non-zero even if `q` is `0n` e.g. 1n / 10n
  const sign = a === 0n ? 0n
    : a > 0n === b > 0n ? 1n
    : -1n

  // What fraction was truncated to make `r` into `q`?
  const absA = a >= 0n ? a : -a
  const absB = b >= 0n ? b : -b

  const twiceRemainder = absA % absB * 2n

  const undoTruncation = twiceRemainder === 0n ? false // no rounding occurred
    : roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_ZERO ? false
    : roundingMode === ROUNDING_MODE.DIRECTED_AWAY_FROM_ZERO ? true
    : roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_NEGATIVE_INFINITY ? sign < 0n
    : roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_POSITIVE_INFINITY ? sign > 0n

    // All modes beyond this point round to nearest
    : twiceRemainder > absB ? true // rounded by more than .5, undo that
    : twiceRemainder < absB ? false // rounded by less than .5, leave it

    // Rounded by .5 exactly, decide tie break
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_ZERO ? false
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_AWAY_FROM_ZERO ? true
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY ? sign < 0n
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_POSITIVE_INFINITY ? sign > 0n
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TO_EVEN ? q % 2n !== 0n
    : roundingMode === ROUNDING_MODE.NEAREST_HALF_TO_ODD ? q % 2n === 0n
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
