/**
 * This class implements methods and properties related to julian dates.
 */
export default class JulianDate {
  /**
   * The integer part of the julian date.
   */
  jd: number;

  /**
   * The fractional part of the julian date.
   */
  offset: number;

  /**
   * Initializes a new instance of the JulianDate class.
   * @param jd - The integer part of the julian date.
   * @param offset - The fractional part of the julian date.
   */
  constructor(jd: number, offset: number) {
    // Normalize the two part julian date into a format that ensures greatest accuracy
    const integerPartOfOffset = Math.floor(offset);
    this.jd = jd + integerPartOfOffset;
    this.offset = offset - integerPartOfOffset;
  }

  /**
   * Gets the position of the sub-interval that this julian date is in within
   * the larger interval.
   * @param intervalStartDate - The start date of the first interval.
   * @param intervalDuration - The duration of each interval.
   * @returns A 0-index number representing the position of the sub-interval
   * this julian date is in within the larger interval.
   */
  getInterval(intervalStartDate: number, intervalDuration: number): number {
    return Math.floor(
      (this.jd - intervalStartDate + this.offset) / intervalDuration
    );
  }

  /**
   * Gets the number of years this date is from the reference epoch.
   * @param jdepoc - The julian date of the reference epoch.
   * @returns The number of years from the reference epoch.
   */
  getYearsFromEpoch(jdepoc: number): number {
    return Math.abs(this.jd - jdepoc + this.offset) / 365.25;
  }

  /**
   * Normalize time variable to be in the range -1 to 1 over the given interval.
   * @param intervalStartDate - The start date of the interval to normalize over.
   * @param intervalDuration - The duration of interval to normalize over.
   * @returns A time normalized between -1 and 1.
   */
  normalize(intervalStartDate: number, intervalDuration: number): number {
    return (
      (2 * (this.jd - intervalStartDate + this.offset)) / intervalDuration - 1
    );
  }
}
