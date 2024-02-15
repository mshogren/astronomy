import { TestCase } from './TestData';

/**
 * A test result from running one of the tests provided with the JPL
 * Development Ephemerides data.
 */
export interface TestResult {
  /** The actual value calculated by the test. */
  actual: number;
  /** A value indicating whether or not the test passed. */
  passed: boolean;
  /** The test case that was executed. */
  testCase: TestCase;
}

/**
 * A summary of the results of running one of the test suites provided with
 * the JPL Development Ephemerides data.
 */
export class TestSummary {
  /** An array of failed test results. */
  failures: TestResult[];

  /** A message that summarizes the results of the test suite. */
  message: string;

  /** The count of test cases in the suite. */
  testCaseCount: number;

  /**
   * The count of results returned by executing the test suite.
   * Some tests may be skipped if they fall outside the range of
   * the data provided in the JPL Development Ephemerides data files.
   */
  testResultCount: number;

  constructor(
    testCaseCount: number,
    testResultCount: number,
    failures: TestResult[]
  ) {
    this.testCaseCount = testCaseCount;
    this.testResultCount = testResultCount;
    this.failures = failures;

    this.message = `Passed ${testResultCount - failures.length} of ${testResultCount} and skipped ${testCaseCount - testResultCount} tests.`;
  }
}
