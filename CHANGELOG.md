# CHANGELOG

## 2.0.0

Support for CommonJS modules is dropped. `big-round` is now provided as ES modules only. Additionally, the API is altered. Code like:

```js
import { divide, ROUNDING_MODE } from 'big-round'

const q = divide(ROUNDING_MODE.DIRECTED_TOWARDS_ZERO, 18n, 10n)
```

should be refactored to something like:

```js
import { Divide, ROUNDING_MODE } from 'big-round'

const divide = Divide(ROUNDING_MODE.DIRECTED_TOWARDS_ZERO)

const q = divide(18n, 10n)
```

## 1.0.0

Initial release.
