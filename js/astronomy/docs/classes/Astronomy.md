[**astronomy**](../README.md)

---

[astronomy](../README.md) / Astronomy

# Class: Astronomy

Defined in: [astronomy.ts:29](https://github.com/mshogren/astronomy/blob/main/js/astronomy/src/astronomy.ts#L29)

This class implements miscellaneous methods to calculate planetary and solar system phenomena.

## Constructors

### Constructor

> **new Astronomy**(`ephem`): `Astronomy`

Defined in: [astronomy.ts:40](https://github.com/mshogren/astronomy/blob/main/js/astronomy/src/astronomy.ts#L40)

Initializes a new instance of the Ephemerides class.

#### Parameters

##### ephem

`Ephemerides`

The implementation of JPL Development Ephemerides to use.

#### Returns

`Astronomy`

## Methods

### getAbberation()

> **getAbberation**(`targetPosition`, `earthVelocity`): `number`[]

Defined in: [astronomy.ts:46](https://github.com/mshogren/astronomy/blob/main/js/astronomy/src/astronomy.ts#L46)

#### Parameters

##### targetPosition

`number`[]

##### earthVelocity

`number`[]

#### Returns

`number`[]

---

### getAbberationCorrectedPosition()

> **getAbberationCorrectedPosition**(`targetPosition`, `earthVelocity`): `number`[]

Defined in: [astronomy.ts:74](https://github.com/mshogren/astronomy/blob/main/js/astronomy/src/astronomy.ts#L74)

Calculate the abberation corrected position of a target.
This implementation follows the method used by the
[Naval Observatory Vector Astronomy Software (NOVAS)](https://aa.usno.navy.mil/downloads/novas/NOVAS_C3.1_Guide.pdf).

#### Parameters

##### targetPosition

`number`[]

The position of the target to find the abberation for.

##### earthVelocity

`number`[]

The velocity of earth (the observer).

#### Returns

`number`[]

An array of position coordinates.

---

### getApparentPlace()

> **getApparentPlace**(`body`, `julianDate`): `Promise`\<[`Place`](Place.md)\>

Defined in: [astronomy.ts:104](https://github.com/mshogren/astronomy/blob/main/js/astronomy/src/astronomy.ts#L104)

Calculate the geocentric position of a solar system body corrected for light-time and abberation.

#### Parameters

##### body

`Ephem`

A target to calculate the position for.

##### julianDate

`JulianDate`

A julian date to calculate the position for.

#### Returns

`Promise`\<[`Place`](Place.md)\>

A promise that resolves to a Place.

---

### getAstrometricPlace()

> **getAstrometricPlace**(`body`, `julianDate`, `previousDate?`, `originalDate?`): `Promise`\<[`Place`](Place.md)\>

Defined in: [astronomy.ts:127](https://github.com/mshogren/astronomy/blob/main/js/astronomy/src/astronomy.ts#L127)

Calculate the astrometric position of a solar system body corrected for light-time by interpolating.

#### Parameters

##### body

`Ephem`

A target to calculate the position for.

##### julianDate

`JulianDate`

A julian date to calculate the position for in order to interpolate.

##### previousDate?

`JulianDate`

The julian date used in the last interpolation step.

##### originalDate?

`JulianDate` = `julianDate`

The original julian date to calulate the position for.

#### Returns

`Promise`\<[`Place`](Place.md)\>

A promise that resolves to a Place.

---

### getEphemeris()

> **getEphemeris**(`body`, `julianDate`): `Promise`\<[`Place`](Place.md)\>

Defined in: [astronomy.ts:161](https://github.com/mshogren/astronomy/blob/main/js/astronomy/src/astronomy.ts#L161)

Calculate ephemeris for planetary and solar system phenomena.

#### Parameters

##### body

`Ephem`

A target to calculate ephemeris for.

##### julianDate

`JulianDate`

A julian date to calculate the ephemeris for.

#### Returns

`Promise`\<[`Place`](Place.md)\>

A promise that resolves to a Place.

---

### getGeometricPlace()

> **getGeometricPlace**(`body`, `julianDate`): `Promise`\<[`Place`](Place.md)\>

Defined in: [astronomy.ts:174](https://github.com/mshogren/astronomy/blob/main/js/astronomy/src/astronomy.ts#L174)

Calculate the geometric geocentric position of a solar system body.

#### Parameters

##### body

`Ephem`

A target to calculate the position for.

##### julianDate

`JulianDate`

A julian date to calculate the position for.

#### Returns

`Promise`\<[`Place`](Place.md)\>

A promise that resolves to a Place.
