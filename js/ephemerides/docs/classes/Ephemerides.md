[ephemerides](../README.md) / Ephemerides

# Class: Ephemerides

This class implements methods to calculate ephemeris for planetary and solar system phenomena.

## Table of contents

### Constructors

- [constructor](Ephemerides.md#constructor)

### Accessors

- [au](Ephemerides.md#au)
- [clight](Ephemerides.md#clight)

### Methods

- [executeTestCases](Ephemerides.md#executetestcases)
- [getEphemeris](Ephemerides.md#getephemeris)

## Constructors

### constructor

• **new Ephemerides**(`id`, `baseUrl?`): [`Ephemerides`](Ephemerides.md)

Initializes a new instance of the Ephemerides class.

#### Parameters

| Name       | Type     | Description                                                   |
| :--------- | :------- | :------------------------------------------------------------ |
| `id`       | `string` | The identifier of the JPL DE series to use - for example 441. |
| `baseUrl?` | `string` | The location of the JPL Development Ephemerides data files.   |

#### Returns

[`Ephemerides`](Ephemerides.md)

#### Defined in

[ephemerides.ts:78](https://github.com/mshogren/astronomy/blob/6907f2d/js/ephemerides/src/ephemerides.ts#L78)

## Accessors

### au

• `get` **au**(): `number`

The length of an astronomical unit in kilometers.

#### Returns

`number`

The number of kilometers (km) in an astronomical unit (au).

#### Defined in

[ephemerides.ts:90](https://github.com/mshogren/astronomy/blob/6907f2d/js/ephemerides/src/ephemerides.ts#L90)

---

### clight

• `get` **clight**(): `number`

The speed of light.

#### Returns

`number`

The speed of light in m/s.

#### Defined in

[ephemerides.ts:98](https://github.com/mshogren/astronomy/blob/6907f2d/js/ephemerides/src/ephemerides.ts#L98)

## Methods

### executeTestCases

▸ **executeTestCases**(): `Promise`\<`TestSummary`\>

Executes all the test cases JPL provided with this development ephemerides series.

#### Returns

`Promise`\<`TestSummary`\>

A promise that resolves to a summary of the test results.

#### Defined in

[ephemerides.ts:106](https://github.com/mshogren/astronomy/blob/6907f2d/js/ephemerides/src/ephemerides.ts#L106)

---

### getEphemeris

▸ **getEphemeris**(`ephem`, `julianDate`): `Promise`\<`number`[]\>

Calculate ephemeris for planetary and solar system phenomena.

#### Parameters

| Name         | Type                          | Description                                   |
| :----------- | :---------------------------- | :-------------------------------------------- |
| `ephem`      | [`Ephem`](../enums/Ephem.md)  | A target to calculate ephemeris for.          |
| `julianDate` | [`JulianDate`](JulianDate.md) | A julian date to calculate the ephemeris for. |

#### Returns

`Promise`\<`number`[]\>

A promise that resolves to an array of position and velocity coordinates.

#### Defined in

[ephemerides.ts:142](https://github.com/mshogren/astronomy/blob/6907f2d/js/ephemerides/src/ephemerides.ts#L142)
