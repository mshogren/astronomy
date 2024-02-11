import { getDataFromFile } from './utility';

export default class Header {
  constants: Map<string, number> = new Map<string, number>();

  finalDate: number = 0;

  id: string;

  intervalDuration: number = 0;

  itemParameters: Array<number> = [];

  numberOfCoefficients: number = 0;

  seriesUrl: string;

  startDate: number = 0;

  private constructor(id: string, seriesUrl: string) {
    this.id = id;
    this.seriesUrl = seriesUrl;
  }

  static async initialize(
    id: string,
    seriesUrl: string,
    headerFileName?: string
  ): Promise<Header> {
    const header = new Header(id, seriesUrl);

    const fileName = headerFileName ?? `header.${id}`;

    const data = await getDataFromFile(`${header.seriesUrl}${fileName}`);
    header.parseHeaderFileData(data);

    return header;
  }

  parseHeaderFileData(data: string): void {
    const groups = data.split(/GROUP\s+\d+/);

    let matches = groups[0].trim().match(/NCOEFF=(\s*)(\d+)/);
    if (matches?.length) this.numberOfCoefficients = parseInt(matches[2], 10);

    matches = groups[2].trim().match(/(\d+(\.\d{1,2})?)/gm);
    if (matches?.length && matches.length === 3) {
      this.startDate = parseFloat(matches[0]);
      this.finalDate = parseFloat(matches[1]);
      this.intervalDuration = parseInt(matches[2], 10);
    }

    const names = groups[3].trim().match(/\w+/gm);
    const values = groups[4]
      .trim()
      .replace(/D/g, 'e')
      .match(/-?\w+\.\w+[+,-]\w+/gm);

    if (names?.length && values?.length) {
      names.forEach((key, i) => {
        this.constants.set(key, parseFloat(values[i - 1]));
      });
    }

    const itemParameters = groups[5]
      .trim()
      .match(/\w+/gm)
      ?.map((x) => parseInt(x, 10));

    if (itemParameters?.length) {
      this.itemParameters = itemParameters;
    }
  }
}
