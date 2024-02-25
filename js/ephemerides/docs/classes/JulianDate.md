[ephemerides](../README.md) / JulianDate

# Class: JulianDate

This class implements methods and properties related to julian dates.

## Table of contents

### Constructors

- [constructor](JulianDate.md#constructor)

### Properties

- [jd](JulianDate.md#jd)
- [offset](JulianDate.md#offset)

### Methods

- [getInterval](JulianDate.md#getinterval)
- [getYearsFromEpoch](JulianDate.md#getyearsfromepoch)
- [normalize](JulianDate.md#normalize)

## Constructors

### constructor

• **new JulianDate**(`jd`, `offset`): [`JulianDate`](JulianDate.md)

Initializes a new instance of the JulianDate class.

#### Parameters

| Name     | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `jd`     | `number` | The integer part of the julian date.    |
| `offset` | `number` | The fractional part of the julian date. |

#### Returns

[`JulianDate`](JulianDate.md)

#### Defined in

[JPLDESeries/JulianDate.ts:20](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/JPLDESeries/JulianDate.ts#L20)

## Properties

### jd

• **jd**: `number`

The integer part of the julian date.

#### Defined in

[JPLDESeries/JulianDate.ts:8](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/JPLDESeries/JulianDate.ts#L8)

---

### offset

• **offset**: `number`

The fractional part of the julian date.

#### Defined in

[JPLDESeries/JulianDate.ts:13](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/JPLDESeries/JulianDate.ts#L13)

## Methods

### getInterval

▸ **getInterval**(`startDate`, `finalDate`, `intervalDuration`): `number`

Gets the position of the sub-interval that this julian date is in within
the larger interval.

#### Parameters

| Name               | Type     | Description                           |
| :----------------- | :------- | :------------------------------------ |
| `startDate`        | `number` | The start date of the first interval. |
| `finalDate`        | `number` | The final date of the last interval.  |
| `intervalDuration` | `number` | The duration of each interval.        |

#### Returns

`number`

A 0-index number representing the position of the sub-interval
this julian date is in within the larger interval.

#### Defined in

[JPLDESeries/JulianDate.ts:36](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/JPLDESeries/JulianDate.ts#L36)

---

### getYearsFromEpoch

▸ **getYearsFromEpoch**(`jdepoc`): `number`

Gets the number of years this date is from the reference epoch.

#### Parameters

| Name     | Type     | Description                             |
| :------- | :------- | :-------------------------------------- |
| `jdepoc` | `number` | The julian date of the reference epoch. |

#### Returns

`number`

The number of years from the reference epoch.

#### Defined in

[JPLDESeries/JulianDate.ts:51](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/JPLDESeries/JulianDate.ts#L51)

---

### normalize

▸ **normalize**(`intervalStartDate`, `intervalDuration`): `number`

Normalize time variable to be in the range -1 to 1 over the given interval.

#### Parameters

| Name                | Type     | Description                                       |
| :------------------ | :------- | :------------------------------------------------ |
| `intervalStartDate` | `number` | The start date of the interval to normalize over. |
| `intervalDuration`  | `number` | The duration of interval to normalize over.       |

#### Returns

`number`

A time normalized between -1 and 1.

#### Defined in

[JPLDESeries/JulianDate.ts:61](https://github.com/mshogren/astronomy/blob/59a8d01/js/ephemerides/src/JPLDESeries/JulianDate.ts#L61)
