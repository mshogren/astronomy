import { getFileListing, getPartialDataFromFile } from './utility';
import JulianDate from './JulianDate';

interface FileProperties {
  intervalSize: number;
  startDate: number;
}

/**
 * This is intended to be a size that covers at least one full set of
 * coefficients for a file in a series so we can determine exactly how many
 * bytes are in each interval.
 *
 * Currently DE440t has 1122 coefficients in each set so we make sure we cover
 * at least that much data and a little more to account for different amounts
 * of whitespace in each series.
 */
const sizeToCoverInterval = 1130 * 35;

export default class FileHelper {
  files: Map<string, FileProperties> = new Map<string, FileProperties>();

  finalDate: number = 0;

  headerFileName: string = '';

  seriesUrl: string;

  startDate: number = 0;

  private cache: Map<string, Array<number>> = new Map<string, Array<number>>();

  private constructor(seriesUrl: string) {
    this.seriesUrl = seriesUrl;
  }

  static async initialize(seriesUrl: string): Promise<FileHelper> {
    const fileHelper = new FileHelper(seriesUrl);

    const fileNames = await getFileListing(seriesUrl);
    [fileHelper.headerFileName] = fileNames.filter((x) =>
      x.startsWith('header')
    );
    fileHelper.files =
      await fileHelper.getFileListingWithStartDatesAndIntervalSizes(fileNames);

    const filesArray = Array.from(fileHelper.files.values());
    fileHelper.startDate = filesArray[0].startDate;
    fileHelper.finalDate = filesArray.reverse()[0].startDate;

    return fileHelper;
  }

  async getCachedCoefficientsForInterval(
    fileName: string,
    interval: number
  ): Promise<number[]> {
    let coefficients: Array<number>;
    const key = `${fileName}#${interval}`;
    if (this.cache.has(key)) {
      coefficients = this.cache.get(key) ?? [];
    } else {
      coefficients = await this.getCoefficientsForInterval(fileName, interval);
      this.cache.set(key, coefficients);
    }
    return coefficients;
  }

  async getCoefficientsForInterval(
    fileName: string,
    interval: number
  ): Promise<number[]> {
    const fileProperties = this.files.get(fileName);
    if (!fileProperties)
      throw new Error(`No information found for ${fileName}`);
    const start = (interval - 1) * fileProperties.intervalSize;
    const end = interval * fileProperties.intervalSize;
    const url = `${this.seriesUrl}/${fileName}`;
    const data = await getPartialDataFromFile(url, start, end);
    const matches = data
      .trim()
      .replace(/D/g, 'e')
      .match(/-?\w+\.\w+[+,-]\w+/gm);
    return matches?.length ? matches.map(parseFloat) : [];
  }

  async getFileForDate(date: JulianDate): Promise<string> {
    const entry = Array.from(this.files?.entries() ?? [])
      .reverse()
      .find(([, value]) => value.startDate <= date.jd + date.offset);
    if (!entry)
      throw new Error(
        `Date outside range covered by the files in ${this.seriesUrl}`
      );
    return entry[0];
  }

  private async getFileListingWithStartDatesAndIntervalSizes(
    fileNames: string[]
  ): Promise<Map<string, FileProperties>> {
    const fileInfos = await Promise.all(
      Array.from(
        fileNames
          .filter((x) => x.startsWith('asc'))
          .map(async (fileName) => this.getStartDateAndIntervalSize(fileName))
      )
    );
    return new Map(fileInfos.sort(([, a], [, b]) => a.startDate - b.startDate));
  }

  private async getStartDateAndIntervalSize(
    fileName: string
  ): Promise<[string, FileProperties]> {
    const url = `${this.seriesUrl}/${fileName}`;
    const data = await getPartialDataFromFile(url, 0, sizeToCoverInterval);

    const matches = data
      .trim()
      .replace(/D/g, 'e')
      .match(/-?\w+\.\w+[+,-]\w+/gm);

    const intervalDataArray = data.split(/ +2\s+\d/);
    return [
      fileName,
      {
        startDate: matches?.length ? parseFloat(matches[0]) : NaN,
        intervalSize: intervalDataArray[0].length,
      },
    ];
  }
}
