[**ephemerides**](../README.md)

---

[ephemerides](../README.md) / Ephemerides

# Class: Ephemerides

Defined in: [ephemerides.ts:74](https://github.com/mshogren/astronomy/blob/main/js/ephemerides/src/ephemerides.ts#L74)

This class implements methods to calculate ephemeris for planetary and solar system phenomena.

## Constructors

### Constructor

> **new Ephemerides**(`id`, `baseUrl?`): `Ephemerides`

Defined in: [ephemerides.ts:82](https://github.com/mshogren/astronomy/blob/main/js/ephemerides/src/ephemerides.ts#L82)

Initializes a new instance of the Ephemerides class.

#### Parameters

##### id

`string`

The identifier of the JPL DE series to use - for example 441.

##### baseUrl?

`string`

The location of the JPL Development Ephemerides data files.

#### Returns

`Ephemerides`

## Accessors

### au

#### Get Signature

> **get** **au**(): `number`

Defined in: [ephemerides.ts:94](https://github.com/mshogren/astronomy/blob/main/js/ephemerides/src/ephemerides.ts#L94)

The length of an astronomical unit in kilometers.

##### Returns

`number`

The number of kilometers (km) in an astronomical unit (au).

---

### clight

#### Get Signature

> **get** **clight**(): `number`

Defined in: [ephemerides.ts:102](https://github.com/mshogren/astronomy/blob/main/js/ephemerides/src/ephemerides.ts#L102)

The speed of light.

##### Returns

`number`

The speed of light in m/s.

## Methods

### executeTestCases()

> **executeTestCases**(): `Promise`\<`TestSummary`\>

Defined in: [ephemerides.ts:110](https://github.com/mshogren/astronomy/blob/main/js/ephemerides/src/ephemerides.ts#L110)

Executes all the test cases JPL provided with this development ephemerides series.

#### Returns

`Promise`\<`TestSummary`\>

A promise that resolves to a summary of the test results.

---

### getEphemeris()

> **getEphemeris**(`ephem`, `julianDate`): `Promise`\<`number`[]\>

Defined in: [ephemerides.ts:145](https://github.com/mshogren/astronomy/blob/main/js/ephemerides/src/ephemerides.ts#L145)

Calculate ephemeris for planetary and solar system phenomena.

#### Parameters

##### ephem

[`Ephem`](../enumerations/Ephem.md)

A target to calculate ephemeris for.

##### julianDate

[`JulianDate`](JulianDate.md)

A julian date to calculate the ephemeris for.

#### Returns

`Promise`\<`number`[]\>

A promise that resolves to an array of position and velocity coordinates.
