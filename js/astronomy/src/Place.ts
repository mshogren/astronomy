/**
 * This class defines a structure for accessing position and velocity coordinates of a place.
 */
// eslint-disable-next-line import/prefer-default-export
export class Place {
  /**
   * The array pf position coordinates.
   */
  position: number[];

  /**
   * The array of velocity coordinates.
   */
  velocity: number[];

  /**
   * Initializes a new instance of the Place class.
   * @param place - An array of position a velocity coordinates.
   */
  constructor(place: number[]) {
    this.position = place.slice(0, 3);
    this.velocity = place.slice(3);
  }
}
