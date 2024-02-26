import { describe, expect, it } from 'vitest';
import { Ephemerides } from '../ephemerides';

export default (id: string) => {
  describe(`DE${id}`, async () => {
    it(
      `successfully executes all test cases`,
      async () => {
        const systemUnderTest = new Ephemerides(id, '../../content/');
        const actual = await systemUnderTest.executeTestCases();
        // eslint-disable-next-line no-console
        console.log(actual.message);
        expect(actual.failures).toEqual([]);
      },
      { timeout: 600000 }
    );
  });
};
