import { describe, expect, it } from 'vitest';
import { Ephem, Ephemerides, JulianDate } from './ephemerides';

describe(`In the browser`, () => {
  const systemUnderTest = new Ephemerides('test', 'http://localhost:8080/');

  it(`successfully executes one test case`, async () => {
    const actual = await systemUnderTest.getEphemeris(
      Ephem.Earth,
      new JulianDate(2460316, 0)
    );
    expect(actual).toEqual([
      -40043939.50397672, 129759378.17744252, 56283649.20462164,
      -2524201.5075697103, -632991.727011894, -274293.5292066627,
    ]);
  });

  it(`successfully executes all test cases`, { timeout: 600000 }, async () => {
    const actual = await systemUnderTest.executeTestCases();
    expect(actual.failures).toEqual([]);
  });
});
