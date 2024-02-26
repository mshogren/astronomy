ephemerides

# ephemerides

This module is for calculating ephemeris for planetary bodies using the
[JPL Development Ephemerides](https://ssd.jpl.nasa.gov/planets/eph_export.html) data.

```ts
const date = new JulianDate(2460316, 0.5);
const ephemerides = new Ephemerides('441', 'https://example.com/data');
const earth = await ephemerides.getEphemeris(Ephem.Earth, date);
```

If you download all the data for a series including the test cases from the JPL site you can execute the test cases

```ts
const ephemerides = new Ephemerides('441', './data');
const testSummary = await ephemerides.executeTestCases();
```

The module has been tested to work in both Node.js processes and in the browser, however there are some caveats.
In a Node.js process it is not strictly necessary to provide a location for the data.

```
const ephemerides = new Ephemerides('441');
```

It will attempt to fetch it on the fly from the JPL website. However this could be very slow if many requests are made.
Instead it is possible to supply the path to the data files in the filesystem.

```
const ephemerides = new Ephemerides('441', '/path/to/data');
```

In the browser you must supply a base url for the module to find the data, and that url must allow the requests to fetch the data.

```
const ephemerides = new Ephemerides('441', 'https://example.com/data');
```

This is straightforward if the data is hosted the same place as the application reading it,
but requires CORS to be configured correctly if the data is hosted on a different site.

## Table of contents

### Enumerations

- [Ephem](enums/Ephem.md)

### Classes

- [Ephemerides](classes/Ephemerides.md)
- [JulianDate](classes/JulianDate.md)
