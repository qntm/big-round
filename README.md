# big-round

Ordinarily, JavaScript `BigInt` division rounds towards 0. `big-round` provides alternative methods for dividing `BigInt`s with different rounding behaviour.

```js
const { divide, ROUNDING_MODE: { DIRECTED_AWAY_FROM_ZERO } } = require('big-round')

divide(DIRECTED_AWAY_FROM_ZERO, 25n, 10n) // 3n
```

## API

### Divide(roundingMode)

`roundingMode` must be one of the enumerated values provided by `ROUNDING_MODE` (*q.v.*). Returns a new function `divide(a, b)`, where `a` must be a `BigInt`, the dividend. `b` must be a `BigInt`, the divisor. The return value from `divide` is the quotient, a `BigInt`, rounded to the nearest integer using the provided rounding mode.

### ROUNDING_MODE

This object contains the following enumerated values. More detailed information about these modes of integer rounding can be found [on Wikipedia](https://en.wikipedia.org/wiki/Rounding#Rounding_to_integer).

#### THROW

If `b` does not divide `a`, instead of attempting rounding, throw an exception.

#### DIRECTED_TOWARDS_ZERO

Always round fractions "down", towards zero. Note that this is the default rounding mode in JavaScript `BigInt` division. `big-round` provides it for completeness, but you can do `a / b` to get an identical result.

#### DIRECTED_AWAY_FROM_ZERO

Always round fractions "up", away from zero.

#### DIRECTED_TOWARDS_NEGATIVE_INFINITY

Always round fractions towards negative infinity. Equivalent to applying the floor function.

#### DIRECTED_TOWARDS_POSITIVE_INFINITY

Always round fractions towards positive infinity. Equivalent to applying the ceiling function.

#### STOCHASTIC

Round all fractions up or down randomly with probability proportional to proximity. *E.g.* a quotient of 1.7 is rounded down to `1n` with probability .3 and up to `2n` with probability .7.

#### NEAREST_HALF_THROW

Round fractions to the nearest integer. If the fraction is exactly .5, instead of attempting rounding, throw an exception.

#### NEAREST_HALF_TOWARDS_ZERO

Round fractions to the nearest integer. If the fraction is exactly .5, round "down", towards zero.

#### NEAREST_HALF_AWAY_FROM_ZERO

Round fractions to the nearest integer. If the fraction is exactly .5, round "up", away from zero.

#### NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY

Round fractions to the nearest integer. If the fraction is exactly .5, round towards negative infinity.

#### NEAREST_HALF_TOWARDS_POSITIVE_INFINITY

Round fractions to the nearest integer. If the fraction is exactly .5, round towards positive infinity.

#### NEAREST_HALF_TO_EVEN

Round fractions to the nearest integer. If the fraction is exactly .5, round to even.

#### NEAREST_HALF_TO_ODD

Round fractions to the nearest integer. If the fraction is exactly .5, round to odd.

#### NEAREST_HALF_ALTERNATE

Round fractions to the nearest integer. If the fraction is exactly .5, round "up", away from zero, the first time this happens, then "down", towards zero, the second time, and continue to alternate in that fashion.

An internal counter on the `divide` function tracks the number of times that this function has been called and the fraction turned out to be exactly .5. If the fraction is not exactly .5, the counter does not advance.

#### NEAREST_HALF_RANDOM

Round fractions to the nearest integer. If the fraction is exactly .5, round up or down with probability .5.
