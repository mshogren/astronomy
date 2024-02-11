import { getDataFromFile } from './utility';

/**
 * A test case provided with the JPL Development Ephemerides data.
 */
export interface TestCase {
  /** The center used to calculate the relative position of the target. */
  center: number;
  /** The date for the calculated positions. */
  date: string;
  /** The expected value of the calculated position-velocity component. */
  expected: number;
  /** The index of the component of the calculated position-velocity to compare against. */
  index: number;
  /** The julian date for the calculated positions. */
  jd: number;
  /** A rounding error based on the precision of the expected value. */
  roundingError: number;
  /** The id of the JPL Development Ephemerides series. */
  seriesId: string;
  /** The target to calculate the position of relative to the center. */
  target: number;
}

export class TestData {
  id: string;

  seriesUrl: string;

  private lines: string[] = [];

  private constructor(id: string, seriesUrl: string) {
    this.id = id;
    this.seriesUrl = seriesUrl;
  }

  static async initialize(
    id: string,
    seriesUrl: string,
    testDataFileName?: string
  ): Promise<TestData> {
    const testData = new TestData(id, seriesUrl);

    const fileName = testDataFileName ?? `testpo.${testData.id}`;

    const data = await getDataFromFile(`${testData.seriesUrl}/${fileName}`);

    const dataArray = data.split(/EOT\s+/);

    testData.lines = dataArray[1].trim().split(/\r?\n/);

    return testData;
  }

  static parseTestCase(data: string): TestCase {
    const matches = data.match(/[\w.-]+/g) ?? [];
    const decimalPlaces = matches[6].length - matches[6].indexOf('.') - 1;
    return {
      seriesId: matches[0] ?? '',
      date: matches[1],
      jd: parseFloat(matches[2]),
      target: parseInt(matches[3], 10),
      center: parseInt(matches[4], 10),
      index: parseInt(matches[5], 10),
      expected: parseFloat(matches[6]),
      roundingError: 5 * 10 ** -decimalPlaces,
    };
  }

  getTestCases(index: number, size: number): TestCase[] {
    return this.lines
      .slice(size * index, size * (index + 1))
      .map(TestData.parseTestCase);
  }
}
