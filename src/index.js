// Return a random BigInt from [0, range). `range` must be a positive BigInt
// This looks gross and then you try to figure out a better way
const randBigInt = range =>
  BigInt(
    Array(range.toString().length + 10) // overcome bias towards the bottom end
      .fill()
      .map(() => String(Math.floor(Math.random() * 10)))
      .join('')
  ) % range

export const ROUNDING_MODE = {
  THROW: Symbol('THROW'),
  DIRECTED_TOWARDS_ZERO: Symbol('DIRECTED_TOWARDS_ZERO'),
  DIRECTED_AWAY_FROM_ZERO: Symbol('DIRECTED_AWAY_FROM_ZERO'),
  DIRECTED_TOWARDS_NEGATIVE_INFINITY: Symbol('DIRECTED_TOWARDS_NEGATIVE_INFINITY'),
  DIRECTED_TOWARDS_POSITIVE_INFINITY: Symbol('DIRECTED_TOWARDS_POSITIVE_INFINITY'),
  STOCHASTIC: Symbol('STOCHASTIC'),
  NEAREST_HALF_THROW: Symbol('NEAREST_HALF_THROW'),
  NEAREST_HALF_TOWARDS_ZERO: Symbol('NEAREST_HALF_TOWARDS_ZERO'),
  NEAREST_HALF_AWAY_FROM_ZERO: Symbol('NEAREST_HALF_AWAY_FROM_ZERO'),
  NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY: Symbol('NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY'),
  NEAREST_HALF_TOWARDS_POSITIVE_INFINITY: Symbol('NEAREST_HALF_TOWARDS_POSITIVE_INFINITY'),
  NEAREST_HALF_TO_EVEN: Symbol('NEAREST_HALF_TO_EVEN'),
  NEAREST_HALF_TO_ODD: Symbol('NEAREST_HALF_TO_ODD'),
  NEAREST_HALF_ALTERNATE: Symbol('NEAREST_HALF_ALTERNATE'),
  NEAREST_HALF_RANDOM: Symbol('NEAREST_HALF_RANDOM')
}

export const Divide = roundingMode => {
  if (roundingMode === ROUNDING_MODE.THROW) {
    return (a, b) => {
      if (a % b !== 0n) {
        throw Error('b does not divide a')
      }

      return a / b
    }
  }

  if (roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_ZERO) {
    return (a, b) =>
      a / b
  }

  if (roundingMode === ROUNDING_MODE.DIRECTED_AWAY_FROM_ZERO) {
    return (a, b) =>
      a / b + (
        a % b === 0n
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
  }

  if (roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_NEGATIVE_INFINITY) {
    return (a, b) =>
      a / b + (
        a % b === 0n
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 0n
              : -1n
      )
  }

  if (roundingMode === ROUNDING_MODE.DIRECTED_TOWARDS_POSITIVE_INFINITY) {
    return (a, b) =>
      a / b + (
        a % b === 0n
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : 0n
      )
  }

  if (roundingMode === ROUNDING_MODE.STOCHASTIC) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainder = absA % absB
      return a / b + (
        randBigInt(absB) >= absRemainder
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_THROW) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n

      if (absRemainderDoubled === absB) {
        throw Error('cannot round a fraction of .5')
      }

      return a / b + (
        absRemainderDoubled < absB
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_ZERO) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n
      return a / b + (
        absRemainderDoubled <= absB
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_AWAY_FROM_ZERO) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n
      return a / b + (
        absRemainderDoubled < absB
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n
      return a / b + (
        absRemainderDoubled < absB
          ? 0n
          : (a > 0n) === (b > 0n)
              ? (absRemainderDoubled > absB ? 1n : 0n)
              : -1n
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TOWARDS_POSITIVE_INFINITY) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n
      return a / b + (
        absRemainderDoubled < absB
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : (absRemainderDoubled > absB ? -1n : 0n)
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TO_EVEN) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n
      const q = a / b
      return q + (
        absRemainderDoubled < absB || (absRemainderDoubled === absB && q % 2n === 0n)
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_TO_ODD) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n
      const q = a / b
      return q + (
        absRemainderDoubled < absB || (absRemainderDoubled === absB && q % 2n !== 0n)
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_ALTERNATE) {
    let alternateUp = true
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n
      const q = a / b
      return q + (
        absRemainderDoubled < absB || (absRemainderDoubled === absB && (alternateUp = !alternateUp))
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
    }
  }

  if (roundingMode === ROUNDING_MODE.NEAREST_HALF_RANDOM) {
    return (a, b) => {
      const absA = a >= 0n ? a : -a
      const absB = b >= 0n ? b : -b
      const absRemainderDoubled = (absA % absB) * 2n
      const q = a / b
      return q + (
        absRemainderDoubled < absB || (absRemainderDoubled === absB && Math.random() < 0.5)
          ? 0n
          : (a > 0n) === (b > 0n)
              ? 1n
              : -1n
      )
    }
  }

  throw Error('Unrecognised rounding strategy')
}
