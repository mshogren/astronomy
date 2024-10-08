[**ephemerides**](../README.md) • **Docs**

---

[ephemerides](../README.md) / JulianDate

# Class: JulianDate

This class implements methods and properties related to julian dates.

## Constructors

### new JulianDate()

> **new JulianDate**(`jd`, `offset`): [`JulianDate`](JulianDate.md)

Initializes a new instance of the JulianDate class.

#### Parameters

• **jd**: `number`

The integer part of the julian date.

• **offset**: `number`

The fractional part of the julian date.

#### Returns

[`JulianDate`](JulianDate.md)

#### Defined in

[JPLDESeries/JulianDate.ts:20](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/JPLDESeries/JulianDate.ts#L20)

## Properties

### jd

> **jd**: `number`

The integer part of the julian date.

#### Defined in

[JPLDESeries/JulianDate.ts:8](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/JPLDESeries/JulianDate.ts#L8)

---

### offset

> **offset**: `number`

The fractional part of the julian date.

#### Defined in

[JPLDESeries/JulianDate.ts:13](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/JPLDESeries/JulianDate.ts#L13)

## Methods

### getInterval()

> **getInterval**(`startDate`, `finalDate`, `intervalDuration`): `number`

Gets the position of the sub-interval that this julian date is in within
the larger interval.

#### Parameters

• **startDate**: `number`

The start date of the first interval.

• **finalDate**: `number`

The final date of the last interval.

• **intervalDuration**: `number`

The duration of each interval.

#### Returns

`number`

A 0-index number representing the position of the sub-interval
this julian date is in within the larger interval.

#### Defined in

[JPLDESeries/JulianDate.ts:36](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/JPLDESeries/JulianDate.ts#L36)

---

### getYearsFromEpoch()

> **getYearsFromEpoch**(`jdepoc`): `number`

Gets the number of years this date is from the reference epoch.

#### Parameters

• **jdepoc**: `number`

The julian date of the reference epoch.

#### Returns

`number`

The number of years from the reference epoch.

#### Defined in

[JPLDESeries/JulianDate.ts:51](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/JPLDESeries/JulianDate.ts#L51)

---

### normalize()

> **normalize**(`intervalStartDate`, `intervalDuration`): `number`

Normalize time variable to be in the range -1 to 1 over the given interval.

#### Parameters

• **intervalStartDate**: `number`

The start date of the interval to normalize over.

• **intervalDuration**: `number`

The duration of interval to normalize over.

#### Returns

`number`

A time normalized between -1 and 1.

#### Defined in

[JPLDESeries/JulianDate.ts:61](https://github.com/mshogren/astronomy/blob/3ddd8bb18c6e65bf5067df1c2b52ff8afd2db9b1/js/ephemerides/src/JPLDESeries/JulianDate.ts#L61)
