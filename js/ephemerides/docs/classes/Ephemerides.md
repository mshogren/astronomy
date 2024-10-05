[**ephemerides**](../README.md) • **Docs**

---

[ephemerides](../README.md) / Ephemerides

# Class: Ephemerides

This class implements methods to calculate ephemeris for planetary and solar system phenomena.

## Constructors

### new Ephemerides()

> **new Ephemerides**(`id`, `baseUrl`?): [`Ephemerides`](Ephemerides.md)

Initializes a new instance of the Ephemerides class.

#### Parameters

• **id**: `string`

The identifier of the JPL DE series to use - for example 441.

• **baseUrl?**: `string`

The location of the JPL Development Ephemerides data files.

#### Returns

[`Ephemerides`](Ephemerides.md)

#### Defined in

[ephemerides.ts:82](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/ephemerides.ts#L82)

## Accessors

### au

> `get` **au**(): `number`

The length of an astronomical unit in kilometers.

#### Returns

`number`

The number of kilometers (km) in an astronomical unit (au).

#### Defined in

[ephemerides.ts:94](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/ephemerides.ts#L94)

---

### clight

> `get` **clight**(): `number`

The speed of light.

#### Returns

`number`

The speed of light in m/s.

#### Defined in

[ephemerides.ts:102](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/ephemerides.ts#L102)

## Methods

### executeTestCases()

> **executeTestCases**(): `Promise`\<`TestSummary`\>

Executes all the test cases JPL provided with this development ephemerides series.

#### Returns

`Promise`\<`TestSummary`\>

A promise that resolves to a summary of the test results.

#### Defined in

[ephemerides.ts:110](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/ephemerides.ts#L110)

---

### getEphemeris()

> **getEphemeris**(`ephem`, `julianDate`): `Promise`\<`number`[]\>

Calculate ephemeris for planetary and solar system phenomena.

#### Parameters

• **ephem**: [`Ephem`](../enumerations/Ephem.md)

A target to calculate ephemeris for.

• **julianDate**: [`JulianDate`](JulianDate.md)

A julian date to calculate the ephemeris for.

#### Returns

`Promise`\<`number`[]\>

A promise that resolves to an array of position and velocity coordinates.

#### Defined in

[ephemerides.ts:146](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/ephemerides.ts#L146)
