export enum ItemName {
  Mercury = 1,
  Venus = 2,
  EarthMoonBarycenter = 3,
  Mars = 4,
  Jupiter = 5,
  Saturn = 6,
  Uranus = 7,
  Neptune = 8,
  Pluto = 9,
  MoonGeocentric = 10,
  Sun = 11,
  Nutations = 12,
  Librations = 13,
  Mantle = 14,
  TTTDB = 15,
}

export class ItemMap<T> extends Map<ItemName, T> {}

export const ItemInitialParameters = new ItemMap<number>([
  [ItemName.Mercury, 3],
  [ItemName.Venus, 3],
  [ItemName.EarthMoonBarycenter, 3],
  [ItemName.Mars, 3],
  [ItemName.Jupiter, 3],
  [ItemName.Saturn, 3],
  [ItemName.Uranus, 3],
  [ItemName.Neptune, 3],
  [ItemName.Pluto, 3],
  [ItemName.MoonGeocentric, 3],
  [ItemName.Sun, 3],
  [ItemName.Nutations, 2],
  [ItemName.Librations, 3],
  [ItemName.Mantle, 3],
  [ItemName.TTTDB, 1],
]);

export class Item {
  numberOfCoefficientSets: number;

  numberOfCoefficientsPerSet: number;

  numberOfComponents: number;

  offset: number;

  constructor(
    numberOfComponents: number,
    numberOfCoefficientSets: number,
    numberOfCoefficientsPerSet: number,
    offset: number
  ) {
    this.numberOfComponents = numberOfComponents;
    this.numberOfCoefficientSets = numberOfCoefficientSets;
    this.numberOfCoefficientsPerSet = numberOfCoefficientsPerSet;
    this.offset = offset;
  }

  get numberOfCoefficientsPerSubInterval(): number {
    return this.numberOfComponents * this.numberOfCoefficientsPerSet;
  }

  getSubIntervalOffset(subInterval: number): number {
    return (
      this.offset - 1 + subInterval * this.numberOfCoefficientsPerSubInterval
    );
  }
}
