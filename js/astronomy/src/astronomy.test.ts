import { describe, expect, it } from 'vitest';
import { Ephem, Ephemerides, JulianDate } from 'ephemerides';
import { Astronomy } from './astronomy';
import { Place } from './Place';

const ephem = new Ephemerides('test', '../../content/');

describe(`getGeometricPlace`, () => {
  const systemUnderTest = new Astronomy(ephem);

  // https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='2'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&CENTER='@399'&START_TIME='JD2448976.5'&STOP_TIME='JD2448976.6'&STEP_SIZE='12 HOURS'&VEC_TABLE='3'&REF_SYSTEM='ICRF'&REF_PLANE='FRAME'&VEC_CORR='NONE'&CAL_TYPE='M'&OUT_UNITS='KM-S'&VEC_LABELS='YES'&VEC_DELTA_T='NO'
  it(`gets the geometric place for Venus on December 20, 1992`, async () => {
    const actual = await systemUnderTest.getGeometricPlace(
      Ephem.Venus,
      new JulianDate(2448976, 0.5)
    );
    expect(actual).toEqual(
      new Place([
        93182125.60858807, -89129019.47195554, -44046166.40945074,
        14.690625068236992, 27.515409462011792, 13.375589449599136,
      ])
    );
  });
});

describe(`getAstrometricPlace`, () => {
  const systemUnderTest = new Astronomy(ephem);

  // https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='2'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&CENTER='@399'&START_TIME='JD2448976.5'&STOP_TIME='JD2448976.6'&STEP_SIZE='12 HOURS'&VEC_TABLE='3'&REF_SYSTEM='ICRF'&REF_PLANE='FRAME'&VEC_CORR='LT'&CAL_TYPE='M'&OUT_UNITS='KM-S'&VEC_LABELS='YES'&VEC_DELTA_T='NO'
  it(`gets the astrometric place for Venus on December 20, 1992`, async () => {
    const actual = await systemUnderTest.getAstrometricPlace(
      Ephem.Venus,
      new JulianDate(2448976, 0.5)
    );
    expect(actual).toEqual(
      new Place([
        93189207.92516215, -89141824.39061105, -44052374.986221805,
        14.695226565872332, 27.517580925071492, 13.37627507102714,
      ])
    );
  });
});

describe(`getApparentPlace`, () => {
  const systemUnderTest = new Astronomy(ephem);

  // https://ssd.jpl.nasa.gov/api/horizons.api?format=json&COMMAND='2'&OBJ_DATA='YES'&MAKE_EPHEM='YES'&EPHEM_TYPE='VECTORS'&CENTER='@399'&START_TIME='JD2448976.5'&STOP_TIME='JD2448976.6'&STEP_SIZE='12 HOURS'&VEC_TABLE='3'&REF_SYSTEM='ICRF'&REF_PLANE='FRAME'&VEC_CORR='LT+S'&CAL_TYPE='M'&OUT_UNITS='KM-S'&VEC_LABELS='YES'&VEC_DELTA_T='NO'
  it(`gets the apparent place for Venus on December 20, 1992`, async () => {
    const actual = await systemUnderTest.getApparentPlace(
      Ephem.Venus,
      new JulianDate(2448976, 0.5)
    );
    expect(actual).toEqual(
      new Place([
        93182042.36241399, -89147837.24011457, -44055364.80284409,
        14.695226565872332, 27.517580925071492, 13.37627507102714,
      ])
    );
  });
});
