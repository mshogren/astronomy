import { ItemName } from './JPLDESeries/Item';
import JulianDate from './JPLDESeries/JulianDate';
import Series from './JPLDESeries/Series';
import { TestCase } from './JPLDESeries/TestData';

export { JulianDate };

/**
 * A list of targets to calculate ephemeris for.
 */
export enum Ephem {
  Mercury = 1,
  Venus = 2,
  Earth = 3,
  Mars = 4,
  Jupiter = 5,
  Saturn = 6,
  Uranus = 7,
  Neptune = 8,
  Pluto = 9,
  Moon = 10,
  Sun = 11,
  SolarSystemBarycenter = 12,
  EarthMoonBarycenter = 13,
  Nutations = 14,
  Librations = 15,
  Mantle = 16,
  TTTDB = 17,
}

const zeroes = [0, 0, 0, 0, 0, 0];

/**
 * This class implements methods to calculate ephemeris for planetary and solar system phenomena.
 */
export class Ephemerides {
  private series?: Series;

  /**
   * Initializes a new instance of the Ephemerides class.
   * @param id - The identifier of the JPL DE series to use - for example 441.
   * @param baseUrl - The location of the JPL Development Ephemerides data files.
   */
  constructor(
    private id: string,
    private baseUrl?: string
  ) {
    this.id = id;
    this.baseUrl = baseUrl;
  }

  /**
   * Executes all the test cases JPL provided with this development ephemerides series.
   * @returns An promise that resolves to an array of failed test cases with the actual result.
   */
  async executeTestCases(): Promise<[boolean, number, TestCase][]> {
    const series = await this.getSeries();
    const { startFileDate, finalFileDate } = series;
    const testData = await series.getTestData();
    const results: [boolean, number, TestCase][] = [];
    let testCases: TestCase[] = [];
    let i = 0;
    do {
      testCases = testData
        .getTestCases(i, 10000)
        .filter((x) => x.jd >= startFileDate && x.jd <= finalFileDate);
      // eslint-disable-next-line no-await-in-loop
      const testResults = await Promise.all(
        testCases.map(async (testCase) => {
          return this.executeTestCase(testCase);
        })
      );
      testResults
        .filter((result) => !result[0])
        .forEach((testResult) => results.push(testResult));
      i += 1;
    } while (testCases.length > 0);
    return results;
    // const testCases = testData
    //   .getTestCases()
    //   .filter((x) => x.jd >= startFileDate && x.jd <= finalFileDate);
    // const results = await Promise.all(
    //   testCases.map(async (testCase) => {
    //     return this.executeTestCase(testCase);
    //   })
    // );
    // return results.filter((result) => !result[0]);
  }

  /**
   * Calculate ephemeris for planetary and solar system phenomena.
   * @param ephem - A target to calculate ephemeris for.
   * @param julianDate - A julian date to calculate the ephemeris for.
   * @returns A promise that resolves to an array of position and velocity coordinates.
   */
  async getEphemerides(
    ephem: Ephem,
    julianDate: JulianDate
  ): Promise<number[]> {
    const series = await this.getSeries();

    if (ephem === Ephem.Earth) {
      return this.getEarth(julianDate);
    }
    if (ephem === Ephem.Moon) {
      return this.getMoon(julianDate);
    }
    if (ephem === Ephem.SolarSystemBarycenter) {
      return zeroes;
    }
    if (ephem === Ephem.EarthMoonBarycenter) {
      return series.getPropertiesForItem(
        ItemName.EarthMoonBarycenter,
        julianDate
      );
    }
    if (ephem > Ephem.EarthMoonBarycenter) {
      return series.getPropertiesForItem(ephem - 2, julianDate);
    }

    return series.getPropertiesForItem(ephem as number as ItemName, julianDate);
  }

  private async executeTestCase(
    testCase: TestCase
  ): Promise<[boolean, number, TestCase]> {
    const series = await this.getSeries();
    const { jd, target, center, index, expected, roundingError } = testCase;
    const propertyIndex = index - 1;
    const julianDate = new JulianDate(jd, 0);
    const targetProperties = await this.getEphemerides(target, julianDate);
    const centerProperties = await this.getCenter(center, julianDate);

    let actual = targetProperties[propertyIndex];
    if (target <= Ephem.EarthMoonBarycenter)
      actual = (actual - centerProperties[propertyIndex]) / series.au;
    let delta = Math.abs(actual - expected);
    if (target === Ephem.Librations && index >= 3) {
      delta /= 1 + 100 * julianDate.getYearsFromEpoch(series.jdepoc);
    }

    let acceptableError = 0;
    if (target <= Ephem.EarthMoonBarycenter) acceptableError = 5e-15;
    const result =
      delta < acceptableError + Math.abs(actual) * 1e-14 + roundingError;

    return [result, actual, testCase];
  }

  private async getCenter(center: Ephem, julianDate: JulianDate) {
    if (
      (center as number) === 0 ||
      center === Ephem.SolarSystemBarycenter ||
      center >= Ephem.Nutations
    )
      return zeroes;

    return this.getEphemerides(center, julianDate);
  }

  private async getEarth(julianDate: JulianDate) {
    const series = await this.getSeries();
    const emb = await series.getPropertiesForItem(
      ItemName.EarthMoonBarycenter,
      julianDate
    );
    const moon = await series.getPropertiesForItem(
      ItemName.MoonGeocentric,
      julianDate
    );
    return emb.map((e, i) => e - moon[i] / (1 + series.emrat));
  }

  private async getMoon(julianDate: JulianDate) {
    const series = await this.getSeries();
    const emb = await series.getPropertiesForItem(
      ItemName.EarthMoonBarycenter,
      julianDate
    );
    const moon = await series.getPropertiesForItem(
      ItemName.MoonGeocentric,
      julianDate
    );
    return emb.map((e, i) => e + moon[i] - moon[i] / (1 + series.emrat));
  }

  private async getSeries(): Promise<Series> {
    const temp =
      this.series ?? (await Series.initialize(this.id, this.baseUrl));
    this.series = temp;
    return this.series;
  }
}
