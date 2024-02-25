[ephemerides](../README.md) / Ephemerides

# Class: Ephemerides

This class implements methods to calculate ephemeris for planetary and solar system phenomena.

## Table of contents

### Constructors

- [constructor](Ephemerides.md#constructor)

### Properties

- [baseUrl](Ephemerides.md#baseurl)
- [id](Ephemerides.md#id)
- [series](Ephemerides.md#series)

### Accessors

- [au](Ephemerides.md#au)
- [clight](Ephemerides.md#clight)

### Methods

- [executeTestCase](Ephemerides.md#executetestcase)
- [executeTestCases](Ephemerides.md#executetestcases)
- [getCenter](Ephemerides.md#getcenter)
- [getEarth](Ephemerides.md#getearth)
- [getEphemeris](Ephemerides.md#getephemeris)
- [getMoon](Ephemerides.md#getmoon)
- [getSeries](Ephemerides.md#getseries)

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

[ephemerides.ts:78](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L78)

## Properties

### baseUrl

• `Private` `Optional` **baseUrl**: `string`

The location of the JPL Development Ephemerides data files.

#### Defined in

[ephemerides.ts:80](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L80)

---

### id

• `Private` **id**: `string`

The identifier of the JPL DE series to use - for example 441.

#### Defined in

[ephemerides.ts:79](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L79)

---

### series

• `Private` `Optional` **series**: `default`

#### Defined in

[ephemerides.ts:71](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L71)

## Accessors

### au

• `get` **au**(): `number`

The length of an astronomical unit in kilometers.

#### Returns

`number`

The number of kilometers (km) in an astronomical unit (au).

#### Defined in

[ephemerides.ts:90](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L90)

---

### clight

• `get` **clight**(): `number`

The speed of light.

#### Returns

`number`

The speed of light in m/s.

#### Defined in

[ephemerides.ts:98](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L98)

## Methods

### executeTestCase

▸ **executeTestCase**(`testCase`): `Promise`\<`TestResult`\>

#### Parameters

| Name       | Type       |
| :--------- | :--------- |
| `testCase` | `TestCase` |

#### Returns

`Promise`\<`TestResult`\>

#### Defined in

[ephemerides.ts:167](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L167)

---

### executeTestCases

▸ **executeTestCases**(): `Promise`\<`TestSummary`\>

Executes all the test cases JPL provided with this development ephemerides series.

#### Returns

`Promise`\<`TestSummary`\>

A promise that resolves to a summary of the test results.

#### Defined in

[ephemerides.ts:106](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L106)

---

### getCenter

▸ **getCenter**(`center`, `julianDate`): `Promise`\<`number`[]\>

#### Parameters

| Name         | Type                          |
| :----------- | :---------------------------- |
| `center`     | [`Ephem`](../enums/Ephem.md)  |
| `julianDate` | [`JulianDate`](JulianDate.md) |

#### Returns

`Promise`\<`number`[]\>

#### Defined in

[ephemerides.ts:191](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L191)

---

### getEarth

▸ **getEarth**(`julianDate`): `Promise`\<`number`[]\>

#### Parameters

| Name         | Type                          |
| :----------- | :---------------------------- |
| `julianDate` | [`JulianDate`](JulianDate.md) |

#### Returns

`Promise`\<`number`[]\>

#### Defined in

[ephemerides.ts:202](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L202)

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

[ephemerides.ts:142](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L142)

---

### getMoon

▸ **getMoon**(`julianDate`): `Promise`\<`number`[]\>

#### Parameters

| Name         | Type                          |
| :----------- | :---------------------------- |
| `julianDate` | [`JulianDate`](JulianDate.md) |

#### Returns

`Promise`\<`number`[]\>

#### Defined in

[ephemerides.ts:215](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L215)

---

### getSeries

▸ **getSeries**(): `Promise`\<`default`\>

#### Returns

`Promise`\<`default`\>

#### Defined in

[ephemerides.ts:228](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/ephemerides.ts#L228)
