/* eslint-disable jsdoc/check-tag-names */
/**
 * This module is for calculating some phenomena related to solar system bodies.
 * It depends on the [ephemerides](https://www.npmjs.com/package/ephemerides) package.
 *
 * ```ts
 * import { Ephem, Ephemerides, JulianDate } from './ephemerides';
 *
 * const date = new JulianDate(2460316, 0.5);
 * const ephemerides = new Ephemerides('441', 'https://example.com/data');
 * const astro = new Astronomy(ephemerides);
 * const place = astro.getGeometricPlace(Ephem.Venus, date);
 * ```
 *
 * The calculations provided should closely agree with the data provided by the
 * [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/) system.
 * @module
 */
/* eslint-enable jsdoc/check-tag-names */
import { Ephemerides, Ephem, JulianDate } from 'ephemerides';
import { TSOFA } from '@tsastro/tsofa';
import { Place } from './Place';

export { Place };

/**
 * This class implements miscellaneous methods to calculate planetary and solar system phenomena.
 */
export class Astronomy {
  private clight: number;

  private clightkmday: number;

  private ephem: Ephemerides;

  /**
   * Initializes a new instance of the Ephemerides class.
   * @param ephem - The implementation of JPL Development Ephemerides to use.
   */
  constructor(ephem: Ephemerides) {
    this.ephem = ephem;
    this.clight = ephem.clight;
    this.clightkmday = 86.4 * this.clight;
  }

  /**
   * Calculate the abberation corrected position of a target.
   * This implementation follows the method used by the
   * [Naval Observatory Vector Astronomy Software (NOVAS)](https://aa.usno.navy.mil/downloads/novas/NOVAS_C3.1_Guide.pdf).
   * @param targetPosition - The position of the target to find the abberation for.
   * @param earthVelocity - The velocity of earth (the observer).
   * @returns An array of position coordinates.
   */
  getAbberationCorrectedPosition(
    targetPosition: number[],
    earthVelocity: number[]
  ): number[] {
    const p1mag = TSOFA.jauPm(targetPosition);
    const vemag = TSOFA.jauPm(earthVelocity);
    const beta = (vemag * 1000) / this.clight;
    const dot = TSOFA.jauPdp(targetPosition, earthVelocity);

    const cosd = dot / (p1mag * vemag);
    const gammai = Math.sqrt(1.0 - beta * beta);
    const p = beta * cosd;
    const q = ((1.0 + p / (1.0 + gammai)) * p1mag * 1000) / this.clight;
    const r = 1.0 + p;

    return TSOFA.jauSxp(
      1 / r,
      TSOFA.jauPpp(
        TSOFA.jauSxp(gammai, targetPosition),
        TSOFA.jauSxp(q, earthVelocity)
      )
    );
  }

  /**
   * Calculate the geocentric position of a solar system body corrected for light-time and abberation.
   * @param body - A target to calculate the position for.
   * @param julianDate - A julian date to calculate the position for.
   * @returns A promise that resolves to a Place.
   */
  async getApparentPlace(body: Ephem, julianDate: JulianDate): Promise<Place> {
    const earth = await this.getEphemeris(Ephem.Earth, julianDate);
    const target = await this.getAstrometricPlace(body, julianDate);

    const targetPosition = this.getAbberationCorrectedPosition(
      target.position,
      earth.velocity
    );

    return new Place(targetPosition.concat(target.velocity));

    // const abberation = this.getAbberation(target.position, earth.velocity);
    // return new Place(TSOFA.jauPpp(target.position, abberation).concat(target.velocity))
  }

  /**
   * Calculate the astrometric position of a solar system body corrected for light-time by interpolating.
   * @param body - A target to calculate the position for.
   * @param julianDate - A julian date to calculate the position for in order to interpolate.
   * @param previousDate - The julian date used in the last interpolation step.
   * @param originalDate - The original julian date to calulate the position for.
   * @returns A promise that resolves to a Place.
   */
  async getAstrometricPlace(
    body: Ephem,
    julianDate: JulianDate,
    previousDate?: JulianDate,
    originalDate: JulianDate = julianDate
  ): Promise<Place> {
    const earth = await this.getEphemeris(Ephem.Earth, originalDate);

    const target = await this.getEphemeris(body, julianDate);

    const geocentric = TSOFA.jauPmp(target.position, earth.position);

    const lt = TSOFA.jauPm(geocentric) / this.clightkmday;
    const offset = originalDate.offset - lt;

    const newDate = new JulianDate(originalDate.jd, offset);

    if (previousDate && Math.abs(offset - previousDate.offset) < 1e-16) {
      return new Place(
        TSOFA.jauPmp(target.position, earth.position).concat(
          TSOFA.jauPmp(target.velocity, earth.velocity)
        )
      );
    }

    return this.getAstrometricPlace(body, newDate, julianDate, originalDate);
  }

  /**
   * Calculate ephemeris for planetary and solar system phenomena.
   * @param body - A target to calculate ephemeris for.
   * @param julianDate - A julian date to calculate the ephemeris for.
   * @returns A promise that resolves to a Place.
   */
  async getEphemeris(body: Ephem, julianDate: JulianDate): Promise<Place> {
    const place = await this.ephem.getEphemeris(body, julianDate);
    return new Place(
      place.slice(0, 3).concat(TSOFA.jauSxp(1 / 86400, place.slice(3)))
    );
  }

  /**
   * Calculate the geometric geocentric position of a solar system body.
   * @param body - A target to calculate the position for.
   * @param julianDate - A julian date to calculate the position for.
   * @returns A promise that resolves to a Place.
   */
  async getGeometricPlace(body: Ephem, julianDate: JulianDate): Promise<Place> {
    const earth = await this.getEphemeris(Ephem.Earth, julianDate);
    const target = await this.getEphemeris(body, julianDate);

    return new Place(
      TSOFA.jauPmp(target.position, earth.position).concat(
        TSOFA.jauPmp(target.velocity, earth.velocity)
      )
    );
  }
}
