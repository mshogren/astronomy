# astronomy

This module is for calculating some phenomena related to solar system bodies.
It depends on the [ephemerides](https://www.npmjs.com/package/ephemerides) package.

```ts
import { Ephem, Ephemerides, JulianDate } from './ephemerides';

const date = new JulianDate(2460316, 0.5);
const ephemerides = new Ephemerides('441', 'https://example.com/data');
const astro = new Astronomy(ephemerides);
const place = astro.getGeometricPlace(Ephem.Venus, date);
```

The calculations provided should closely agree with the data provided by the
[JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) system.
