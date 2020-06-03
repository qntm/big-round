# big-round

Ordinarily, `BigInt` division rounds towards 0. `big-round` provides alternative methods for dividing `BigInt`s with different rounding behaviour.

```js
const { divide, ROUNDING_MODE: { DIRECTED_AWAY_FROM_ZERO } } = require('big-round')

divide(DIRECTED_AWAY_FROM_ZERO, 25n, 10n) // 3n
```

## API

### divide(roundingMode, a, b)

`roundingMode` must be one of the enumerated values provided by `ROUNDING_MODE` (*q.v.*). `a` must be a `BigInt`, the dividend. `b` must be a `BigInt`, the divisor. The return value is the quotient, a `BigInt`, rounded to the nearest integer using the provided rounding mode.

### ROUNDING_MODE

This object contains the following enumerated values.

The first few rounding modes are directed and always round in a particular direction, regardless of fraction.

#### DIRECTED_TOWARDS_ZERO

Note that this is the default rounding mode in JavaScript `BigInt` division. `big-round` provides it for completeness.

#### DIRECTED_AWAY_FROM_ZERO
#### DIRECTED_TOWARDS_NEGATIVE_INFINITY
#### DIRECTED_TOWARDS_POSITIVE_INFINITY

The remaining rounding modes round towards the nearest (big) integer. The only difference between them is what happens when the fraction is exactly .5, for example when dividing `15n` by `10n` - should we round 1.5 up to `2n` or down to `1n`?

#### NEAREST_HALF_TOWARDS_ZERO
#### NEAREST_HALF_AWAY_FROM_ZERO
#### NEAREST_HALF_TOWARDS_NEGATIVE_INFINITY
#### NEAREST_HALF_TOWARDS_POSITIVE_INFINITY
#### NEAREST_HALF_TO_EVEN
#### NEAREST_HALF_TO_ODD
