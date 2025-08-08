[**ephemerides**](../README.md)

---

[ephemerides](../README.md) / JulianDate

# Class: JulianDate

Defined in: [JPLDESeries/JulianDate.ts:4](https://github.com/mshogren/astronomy/blob/8aeb7989d20749f5235d5588c4538ceb3e9f40ba/js/ephemerides/src/JPLDESeries/JulianDate.ts#L4)

This class implements methods and properties related to julian dates.

## Constructors

### Constructor

> **new JulianDate**(`jd`, `offset`): `JulianDate`

Defined in: [JPLDESeries/JulianDate.ts:20](https://github.com/mshogren/astronomy/blob/8aeb7989d20749f5235d5588c4538ceb3e9f40ba/js/ephemerides/src/JPLDESeries/JulianDate.ts#L20)

Initializes a new instance of the JulianDate class.

#### Parameters

##### jd

`number`

The integer part of the julian date.

##### offset

`number`

The fractional part of the julian date.

#### Returns

`JulianDate`

## Properties

### jd

> **jd**: `number`

Defined in: [JPLDESeries/JulianDate.ts:8](https://github.com/mshogren/astronomy/blob/8aeb7989d20749f5235d5588c4538ceb3e9f40ba/js/ephemerides/src/JPLDESeries/JulianDate.ts#L8)

The integer part of the julian date.

---

### offset

> **offset**: `number`

Defined in: [JPLDESeries/JulianDate.ts:13](https://github.com/mshogren/astronomy/blob/8aeb7989d20749f5235d5588c4538ceb3e9f40ba/js/ephemerides/src/JPLDESeries/JulianDate.ts#L13)

The fractional part of the julian date.

## Methods

### getInterval()

> **getInterval**(`startDate`, `finalDate`, `intervalDuration`): `number`

Defined in: [JPLDESeries/JulianDate.ts:36](https://github.com/mshogren/astronomy/blob/8aeb7989d20749f5235d5588c4538ceb3e9f40ba/js/ephemerides/src/JPLDESeries/JulianDate.ts#L36)

Gets the position of the sub-interval that this julian date is in within
the larger interval.

#### Parameters

##### startDate

`number`

The start date of the first interval.

##### finalDate

`number`

The final date of the last interval.

##### intervalDuration

`number`

The duration of each interval.

#### Returns

`number`

A 0-index number representing the position of the sub-interval
this julian date is in within the larger interval.

---

### getYearsFromEpoch()

> **getYearsFromEpoch**(`jdepoc`): `number`

Defined in: [JPLDESeries/JulianDate.ts:51](https://github.com/mshogren/astronomy/blob/8aeb7989d20749f5235d5588c4538ceb3e9f40ba/js/ephemerides/src/JPLDESeries/JulianDate.ts#L51)

Gets the number of years this date is from the reference epoch.

#### Parameters

##### jdepoc

`number`

The julian date of the reference epoch.

#### Returns

`number`

The number of years from the reference epoch.

---

### normalize()

> **normalize**(`intervalStartDate`, `intervalDuration`): `number`

Defined in: [JPLDESeries/JulianDate.ts:61](https://github.com/mshogren/astronomy/blob/8aeb7989d20749f5235d5588c4538ceb3e9f40ba/js/ephemerides/src/JPLDESeries/JulianDate.ts#L61)

Normalize time variable to be in the range -1 to 1 over the given interval.

#### Parameters

##### intervalStartDate

`number`

The start date of the interval to normalize over.

##### intervalDuration

`number`

The duration of interval to normalize over.

#### Returns

`number`

A time normalized between -1 and 1.
