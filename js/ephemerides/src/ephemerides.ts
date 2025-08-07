/* eslint-disable jsdoc/check-tag-names */
/**
 * This module is for calculating ephemeris for planetary bodies using the
 * [JPL Development Ephemerides](https://ssd.jpl.nasa.gov/planets/eph_export.html) data.
 * ```ts
 * import { Ephem, Ephemerides, JulianDate } from './ephemerides';
 *
 * const date = new JulianDate(2460316, 0.5);
 * const ephemerides = new Ephemerides('441', 'https://example.com/data');
 * const earth = await ephemerides.getEphemeris(Ephem.Earth, date);
 * ```
 * If you download all the data for a series including the test cases from the JPL site you can execute the test cases
 * ```ts
 * import { Ephem, Ephemerides, JulianDate } from './ephemerides';
 *
 * const ephemerides = new Ephemerides('441', './data');
 * const testSummary = await ephemerides.executeTestCases();
 * ```
 * The module has been tested to work in both Node.js processes and in the browser, however there are some caveats.
 * In a Node.js process it is not strictly necessary to provide a location for the data.
 * ```ts
 * const ephemerides = new Ephemerides('441');
 * ```
 * It will attempt to fetch it on the fly from the JPL website.  However this could be very slow if many requests are made.
 * Instead it is possible to supply the path to the data files in the filesystem.
 * ```ts
 * const ephemerides = new Ephemerides('441', '/path/to/data');
 * ```
 * In the browser you must supply a base url for the module to find the data, and that url must allow the requests to fetch the data.
 * ```ts
 * const ephemerides = new Ephemerides('441', 'https://example.com/data');
 * ```
 * This is straightforward if the data is hosted the same place as the application reading it,
 * but requires CORS to be configured correctly if the data is hosted on a different site.
 * @module
 */
/* eslint-enable jsdoc/check-tag-names */
import { ItemName } from './JPLDESeries/Item';
import JulianDate from './JPLDESeries/JulianDate';
import Series from './JPLDESeries/Series';
import { TestCase } from './JPLDESeries/TestData';
import { TestResult, TestSummary } from './JPLDESeries/TestSummary';

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
   * The length of an astronomical unit in kilometers.
   * @returns The number of kilometers (km) in an astronomical unit (au).
   */
  get au(): number {
    return this.series?.au ?? 149597870.7;
  }

  /**
   * The speed of light.
   * @returns The speed of light in m/s.
   */
  get clight(): number {
    return this.series?.clight ?? 299792458;
  }

  /**
   * Executes all the test cases JPL provided with this development ephemerides series.
   * @returns A promise that resolves to a summary of the test results.
   */
  async executeTestCases(): Promise<TestSummary> {
    const series = await this.getSeries();
    const testData = await series.getTestData();
    const failures: TestResult[] = [];
    let testCases: TestCase[] = [];
    let i = 0;
    let testCaseCount = 0;
    let testResultCount = 0;
    do {
      // eslint-disable-next-line no-await-in-loop
      testCases = await testData.getTestCases(i, 10000);
      // eslint-disable-next-line no-await-in-loop
      const testResults = await Promise.all(
        testCases
          .filter(
            (x) => x.jd >= series.startFileDate && x.jd <= series.finalFileDate
          )
          .map(async (testCase) => {
            return this.executeTestCase(testCase);
          })
      );
      testResults
        .filter((result) => !result.passed)
        .forEach((testResult) => failures.push(testResult));
      testCaseCount += testCases.length;
      testResultCount += testResults.length;
      i += 1;
    } while (testCases.length > 0);
    return new TestSummary(testCaseCount, testResultCount, failures);
  }

  /**
   * Calculate ephemeris for planetary and solar system phenomena.
   * @param ephem - A target to calculate ephemeris for.
   * @param julianDate - A julian date to calculate the ephemeris for.
   * @returns A promise that resolves to an array of position and velocity coordinates.
   */
  async getEphemeris(ephem: Ephem, julianDate: JulianDate): Promise<number[]> {
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

  private async executeTestCase(testCase: TestCase): Promise<TestResult> {
    const series = await this.getSeries();
    const propertyIndex = testCase.index - 1;
    const julianDate = new JulianDate(testCase.jd, 0);
    const targetProperties = await this.getEphemeris(
      testCase.target,
      julianDate
    );
    const centerProperties = await this.getCenter(testCase.center, julianDate);

    let actual = targetProperties[propertyIndex];
    if (testCase.target <= Ephem.EarthMoonBarycenter)
      actual = (actual - centerProperties[propertyIndex]) / series.au;
    let delta = Math.abs(actual - testCase.expected);
    if (testCase.target === Ephem.Librations && testCase.index >= 3) {
      delta /= 1 + 100 * julianDate.getYearsFromEpoch(series.jdepoc);
    }

    let acceptableError = 0;
    if (testCase.target <= Ephem.EarthMoonBarycenter) acceptableError = 1e-14;
    const passed =
      delta <
      acceptableError + Math.abs(actual) * 1e-14 + testCase.roundingError;

    return { passed, actual, testCase };
  }

  private async getCenter(center: Ephem, julianDate: JulianDate) {
    if (
      (center as number) === 0 ||
      center === Ephem.SolarSystemBarycenter ||
      center >= Ephem.Nutations
    )
      return zeroes;

    return this.getEphemeris(center, julianDate);
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
