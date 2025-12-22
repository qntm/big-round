// Test data mostly from Wikipedia
// <https://en.wikipedia.org/w/index.php?title=Rounding&oldid=960109264#Comparison_of_approaches_for_rounding_to_an_integer>

import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { Divide, ROUNDING_MODE } from '../src/index.js'

describe('Divide', () => {
  describe('unrecognised', () => {
    it('throws', () => {
      assert.throws(() => Divide(-50103))
    })
  })

  describe('directed', () => {
    describe('throw', () => {
      const divide = Divide(ROUNDING_MODE.THROW)

      it('works', () => {
        assert.throws(() => divide(18n, 10n))
        assert.throws(() => divide(15n, 10n))
        assert.throws(() => divide(12n, 10n))
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.throws(() => divide(8n, 10n))
        assert.throws(() => divide(5n, 10n))
        assert.throws(() => divide(2n, 10n))
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.throws(() => divide(-2n, 10n))
        assert.throws(() => divide(-5n, 10n))
        assert.throws(() => divide(-8n, 10n))
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.throws(() => divide(-12n, 10n))
        assert.throws(() => divide(-15n, 10n))
        assert.throws(() => divide(-18n, 10n))
      })

      it('works on negatives', () => {
        assert.throws(() => divide(-18n, -10n))
        assert.throws(() => divide(-15n, -10n))
        assert.throws(() => divide(-12n, -10n))
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.throws(() => divide(-8n, -10n))
        assert.throws(() => divide(-5n, -10n))
        assert.throws(() => divide(-2n, -10n))
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.throws(() => divide(2n, -10n))
        assert.throws(() => divide(5n, -10n))
        assert.throws(() => divide(8n, -10n))
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.throws(() => divide(12n, -10n))
        assert.throws(() => divide(15n, -10n))
        assert.throws(() => divide(18n, -10n))
      })
    })

    describe('towards zero', () => {
      const divide = Divide(ROUNDING_MODE.DIRECTED_TOWARDS_ZERO)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 1n)
        assert.deepEqual(divide(15n, 10n), 1n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 0n)
        assert.deepEqual(divide(5n, 10n), 0n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), 0n)
        assert.deepEqual(divide(-8n, 10n), 0n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -1n)
        assert.deepEqual(divide(-18n, 10n), -1n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 1n)
        assert.deepEqual(divide(-15n, -10n), 1n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 0n)
        assert.deepEqual(divide(-5n, -10n), 0n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), 0n)
        assert.deepEqual(divide(8n, -10n), 0n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -1n)
        assert.deepEqual(divide(18n, -10n), -1n)
      })
    })

    describe('away from zero', () => {
      const divide = Divide(ROUNDING_MODE.DIRECTED_AWAY_FROM_ZERO)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 2n)
        assert.deepEqual(divide(12n, 10n), 2n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 1n)
        assert.deepEqual(divide(2n, 10n), 1n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), -1n)
        assert.deepEqual(divide(-5n, 10n), -1n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -2n)
        assert.deepEqual(divide(-15n, 10n), -2n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 2n)
        assert.deepEqual(divide(12n, 10n), 2n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 1n)
        assert.deepEqual(divide(2n, 10n), 1n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), -1n)
        assert.deepEqual(divide(-5n, 10n), -1n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -2n)
        assert.deepEqual(divide(-15n, 10n), -2n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })
    })

    describe('towards negative infinity', () => {
      const divide = Divide(ROUNDING_MODE.DIRECTED_TOWARDS_NEGATIVE_INFINITY)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 1n)
        assert.deepEqual(divide(15n, 10n), 1n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 0n)
        assert.deepEqual(divide(5n, 10n), 0n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), -1n)
        assert.deepEqual(divide(-5n, 10n), -1n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -2n)
        assert.deepEqual(divide(-15n, 10n), -2n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 1n)
        assert.deepEqual(divide(-15n, -10n), 1n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 0n)
        assert.deepEqual(divide(-5n, -10n), 0n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), -1n)
        assert.deepEqual(divide(5n, -10n), -1n)
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -2n)
        assert.deepEqual(divide(15n, -10n), -2n)
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('towards positive infinity', () => {
      const divide = Divide(ROUNDING_MODE.DIRECTED_TOWARDS_POSITIVE_INFINITY)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 2n)
        assert.deepEqual(divide(12n, 10n), 2n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 1n)
        assert.deepEqual(divide(2n, 10n), 1n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), 0n)
        assert.deepEqual(divide(-8n, 10n), 0n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -1n)
        assert.deepEqual(divide(-18n, 10n), -1n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 2n)
        assert.deepEqual(divide(-12n, -10n), 2n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 1n)
        assert.deepEqual(divide(-2n, -10n), 1n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), 0n)
        assert.deepEqual(divide(8n, -10n), 0n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -1n)
        assert.deepEqual(divide(18n, -10n), -1n)
      })
    })
  })

  describe('to nearest', () => {
    describe('half throws', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_THROW)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.throws(() => divide(15n, 10n))
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.throws(() => divide(5n, 10n))
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.throws(() => divide(-5n, 10n))
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.throws(() => divide(-15n, 10n))
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.throws(() => divide(-15n, -10n))
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.throws(() => divide(-5n, -10n))
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.throws(() => divide(5n, -10n))
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.throws(() => divide(15n, -10n))
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('half towards zero', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_TOWARDS_ZERO)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 1n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 0n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), 0n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -1n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 1n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 0n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), 0n)
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -1n)
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('half away from zero', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_AWAY_FROM_ZERO)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 2n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 1n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), -1n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -2n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 2n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 1n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), -1n)
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -2n)
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('half towards negative infinity', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 1n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 0n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), -1n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -2n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 1n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 0n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), -1n)
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -2n)
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('half towards positive infinity', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_TOWARDS_POSITIVE_INFINITY)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 2n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 1n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), 0n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -1n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 2n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 1n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), 0n)
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -1n)
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('half to even', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_TO_EVEN)
      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 2n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 0n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), 0n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -2n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 2n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 0n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), 0n)
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -2n)
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('half to odd', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_TO_ODD)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 1n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 1n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), -1n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -1n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 1n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 1n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), -1n)
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -1n)
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('half alternates up and down', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_ALTERNATE)

      it('works', () => {
        assert.deepEqual(divide(18n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 2n)
        assert.deepEqual(divide(15n, 10n), 1n)
        assert.deepEqual(divide(12n, 10n), 1n)
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(8n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 1n)
        assert.deepEqual(divide(5n, 10n), 0n)
        assert.deepEqual(divide(2n, 10n), 0n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-2n, 10n), 0n)
        assert.deepEqual(divide(-5n, 10n), -1n)
        assert.deepEqual(divide(-5n, 10n), 0n)
        assert.deepEqual(divide(-8n, 10n), -1n)
        assert.deepEqual(divide(-10n, 10n), -1n)
        assert.deepEqual(divide(-12n, 10n), -1n)
        assert.deepEqual(divide(-15n, 10n), -2n)
        assert.deepEqual(divide(-15n, 10n), -1n)
        assert.deepEqual(divide(-18n, 10n), -2n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-18n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 2n)
        assert.deepEqual(divide(-15n, -10n), 1n)
        assert.deepEqual(divide(-12n, -10n), 1n)
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(-8n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 1n)
        assert.deepEqual(divide(-5n, -10n), 0n)
        assert.deepEqual(divide(-2n, -10n), 0n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(2n, -10n), 0n)
        assert.deepEqual(divide(5n, -10n), -1n)
        assert.deepEqual(divide(5n, -10n), 0n)
        assert.deepEqual(divide(8n, -10n), -1n)
        assert.deepEqual(divide(10n, -10n), -1n)
        assert.deepEqual(divide(12n, -10n), -1n)
        assert.deepEqual(divide(15n, -10n), -2n)
        assert.deepEqual(divide(15n, -10n), -1n)
        assert.deepEqual(divide(18n, -10n), -2n)
      })
    })

    describe('half random', () => {
      const divide = Divide(ROUNDING_MODE.NEAREST_HALF_RANDOM)

      it('works', () => {
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-10n, 10n), -1n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(10n, -10n), -1n)
      })

      it('"works"', () => {
        // Ugh whatever
        const buckets = { [-1]: 0, [-2]: 0 }
        for (let i = 0; i < 1000; i++) {
          buckets[String(divide(15n, -10n))]++
        }
        assert.deepEqual(buckets[-1] > 450 && buckets[-1] < 550, true)
        assert.deepEqual(buckets[-2] > 450 && buckets[-2] < 550, true)
      })

      it('"works" on negatives', () => {
        // Ugh whatever
        const buckets = { 1: 0, 2: 0 }
        for (let i = 0; i < 1000; i++) {
          buckets[String(divide(-15n, -10n))]++
        }
        assert.deepEqual(buckets[1] > 450 && buckets[1] < 550, true)
        assert.deepEqual(buckets[2] > 450 && buckets[2] < 550, true)
      })
    })
  })

  describe('random', () => {
    describe('stochastic', () => {
      const divide = Divide(ROUNDING_MODE.STOCHASTIC)

      it('works', () => {
        assert.deepEqual(divide(10n, 10n), 1n)
        assert.deepEqual(divide(0n, 10n), 0n)
        assert.deepEqual(divide(-10n, 10n), -1n)
      })

      it('works on negatives', () => {
        assert.deepEqual(divide(-10n, -10n), 1n)
        assert.deepEqual(divide(0n, -10n), 0n)
        assert.deepEqual(divide(10n, -10n), -1n)
      })

      it('"works"', () => {
        // Submit a PR if you have a half-decent idea of how to unit this nonsense
        const buckets = { [-1]: 0, [-2]: 0 }
        for (let i = 0; i < 1000; i++) {
          buckets[String(divide(16n, -10n))]++
        }
        assert.deepEqual(buckets[-1] > 350 && buckets[-1] < 450, true)
        assert.deepEqual(buckets[-2] > 550 && buckets[-2] < 650, true)
      })

      it('"works" for negatives', () => {
        // Submit a PR if you have a half-decent idea of how to unit this nonsense
        const buckets = { 1: 0, 2: 0 }
        for (let i = 0; i < 1000; i++) {
          buckets[String(divide(-16n, -10n))]++
        }
        assert.deepEqual(buckets[1] > 350 && buckets[1] < 450, true)
        assert.deepEqual(buckets[2] > 550 && buckets[2] < 650, true)
      })
    })
  })
})
