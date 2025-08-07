import FileHelper from './FileHelper';
import Header from './Header';
import { Item, ItemInitialParameters, ItemMap, ItemName } from './Item';
import JulianDate from './JulianDate';
import { TestData } from './TestData';

export default class Series {
  au: number = 0;

  baseUrl: string;

  clight: number = 0;

  emrat: number = 0;

  fileHelper?: FileHelper | null;

  finalDate: number = 0;

  finalFileDate: number = 0;

  id: string;

  intervalDuration: number = 0;

  items: ItemMap<Item | null> = new ItemMap<Item | null>();

  jdepoc: number = 0;

  name: string;

  numberOfCoefficients: number = 0;

  startDate: number = 0;

  startFileDate: number = 0;

  private constructor(id: string, baseUrl?: string) {
    this.id = id;
    this.name = `DE${id}`;
    this.baseUrl = baseUrl ?? 'https://ssd.jpl.nasa.gov/ftp/eph/planets/ascii/';
  }

  static computePolynomial(t: number, coefficients: Array<number>) {
    // Equation 14.20 from Explanatory Supplement 3rd ed.
    const p = [];
    p[0] = 1;
    p[1] = t;

    for (let n = 2; n < coefficients.length; n += 1) {
      p[n] = 2 * t * p[n - 1] - p[n - 2];
    }

    // Multiply the polynomial by the coefficients.
    // Loop through coefficients backwards (from smallest to largest) to avoid floating point rounding errors
    let position = 0;
    for (let i = coefficients.length - 1; i >= 0; i -= 1) {
      position += coefficients[i] * p[i];
    }

    // Compute velocity (just the derivative of the above)
    const v = [];
    v[0] = 0;
    v[1] = 1;
    v[2] = 4 * t;
    for (let n = 3; n < coefficients.length; n += 1) {
      v[n] = 2 * t * v[n - 1] + 2 * p[n - 1] - v[n - 2];
    }

    let velocity = 0;
    for (let i = coefficients.length - 1; i >= 0; i -= 1) {
      velocity += v[i] * coefficients[i];
    }

    return [position, velocity];
  }

  static async initialize(id: string, baseUrl?: string): Promise<Series> {
    const series = new Series(id, baseUrl);

    const seriesUrl = `${series.baseUrl}de${id}/`;
    series.fileHelper = await FileHelper.initialize(seriesUrl);
    series.startFileDate = series.fileHelper.startDate;
    series.finalFileDate = series.fileHelper.finalDate;

    const header = await Header.initialize(
      id,
      seriesUrl,
      series.fileHelper.headerFileName
    );
    series.numberOfCoefficients = header.numberOfCoefficients;
    series.startDate = header.startDate;
    series.finalDate = header.finalDate;
    series.intervalDuration = header.intervalDuration;

    series.clight = header.constants.get('CLIGHT') ?? 0;
    series.au = header.constants.get('AU') ?? 0;
    series.emrat = header.constants.get('EMRAT') ?? 0;
    series.jdepoc = header.constants.get('JDEPOC') ?? 0;

    const numberOfTriplets = header.itemParameters.length / 3;
    Array.from(ItemInitialParameters.entries()).forEach(([key, value], i) => {
      if (i < numberOfTriplets) {
        series.items.set(
          key,
          new Item(
            value,
            header.itemParameters[numberOfTriplets * 2 + i],
            header.itemParameters[numberOfTriplets + i],
            header.itemParameters[i]
          )
        );
      } else {
        series.items.set(key, null);
      }
    });

    return series;
  }

  async getCoefficientsForDate(date: JulianDate): Promise<number[]> {
    if (!this.fileHelper)
      throw new Error(`Series ${this.name} not fully initialized`);
    const fileName = await this.fileHelper.getFileForDate(date);
    const fileProperties = this.fileHelper.files.get(fileName);
    const fileStartDate = fileProperties?.startDate;
    const fileFinalDate = fileProperties?.finalDate;
    if (!fileStartDate || !fileFinalDate)
      throw new Error(`No start date found for ${fileName}`);
    const interval = date.getInterval(
      fileStartDate,
      fileFinalDate,
      this.intervalDuration
    );
    return this.fileHelper.getCachedCoefficientsForInterval(fileName, interval);
  }

  async getPropertiesForItem(
    itemName: ItemName,
    date: JulianDate
  ): Promise<Array<number>> {
    const coefficientsForDate = await this.getCoefficientsForDate(date);
    const item = this.items.get(itemName);
    if (!item) throw new Error(`${itemName}`);
    const startDate = coefficientsForDate[0];
    const finalDate = coefficientsForDate[1];
    const intervalDuration = finalDate - startDate;
    const subIntervalDuration = intervalDuration / item.numberOfCoefficientSets;
    const subInterval = date.getInterval(
      startDate,
      finalDate,
      subIntervalDuration
    );

    const t = date.normalize(
      startDate + subIntervalDuration * subInterval,
      subIntervalDuration
    );

    const subIntervalOffset = item.getSubIntervalOffset(subInterval);

    const properties = [];

    for (let i = 0; i < item.numberOfComponents; i += 1) {
      const start = subIntervalOffset + i * item.numberOfCoefficientsPerSet;
      const end = start + item.numberOfCoefficientsPerSet;
      const coefficients = coefficientsForDate.slice(start, end);
      const property = Series.computePolynomial(t, coefficients);
      [properties[i]] = property;
      properties[i + item.numberOfComponents] =
        (property[1] * 2 * item.numberOfCoefficientSets) / intervalDuration;
    }

    return properties;
  }

  async getTestData() {
    return TestData.initialize(this.id, this.fileHelper?.seriesUrl ?? '');
  }
}
