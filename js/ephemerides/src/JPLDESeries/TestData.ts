import { getPartialDataFromFile } from './utility';

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

  private headerSize: number = 0;

  private lineSize: number = 0;

  private testDataFileUrl: string = '';

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
    testData.testDataFileUrl = `${testData.seriesUrl}/${fileName}`;

    const data = await getPartialDataFromFile(
      testData.testDataFileUrl,
      0,
      2000
    );
    const lines = data.split(/\n/);

    const lastHeaderLineIndex = lines.findIndex((x) => x.startsWith('EOT')) + 1;

    testData.headerSize =
      lines.slice(0, lastHeaderLineIndex).join('\n').length + 1;
    testData.lineSize = lines[lastHeaderLineIndex + 1].length + 1;

    return testData;
  }

  static parseTestCase(data: string): TestCase {
    const expected = data.substring(34).trim();
    const decimalPlaces = expected.length - expected.indexOf('.') - 1;
    return {
      seriesId: data.substring(0, 3),
      date: data.substring(3, 15),
      jd: parseFloat(data.substring(15, 25)),
      target: parseInt(data.substring(26, 28), 10),
      center: parseInt(data.substring(29, 31), 10),
      index: parseInt(data.substring(32, 34), 10),
      expected: parseFloat(expected),
      roundingError: 5 * 10 ** -decimalPlaces,
    };
  }

  async getTestCases(index: number, size: number): Promise<TestCase[]> {
    const start = this.headerSize + index * size * this.lineSize;
    const end = start + size * this.lineSize;
    const data = await getPartialDataFromFile(this.testDataFileUrl, start, end);
    return data[0] !== '\0'
      ? data
          .split(/\n/)
          .filter((x) => x[0] !== '\0')
          .map(TestData.parseTestCase)
      : [];
  }
}
