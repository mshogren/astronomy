import { getFileListing, getFileSize, getPartialDataFromFile } from './utility';
import JulianDate from './JulianDate';

interface FileProperties {
  finalDate: number;
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
    fileHelper.finalDate = filesArray.reverse()[0].finalDate;

    return fileHelper;
  }

  private static parseCoefficientData(data: string): RegExpMatchArray | null {
    return data
      .trim()
      .replace(/D/g, 'e')
      .match(/-?\w+\.\w+[+,-]\w+/gm);
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
      if (this.cache.size > 100) this.cache.clear();
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
    const data = await this.getDataForIntervalFromFile(
      fileName,
      interval,
      fileProperties.intervalSize
    );
    const matches = FileHelper.parseCoefficientData(data);
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

  private async getDataForIntervalFromFile(
    fileName: string,
    interval: number,
    intervalSize: number
  ): Promise<string> {
    const url = `${this.seriesUrl}/${fileName}`;
    const start = interval * intervalSize;
    const end = start + intervalSize;
    return getPartialDataFromFile(url, start, end);
  }

  private async getFileListingWithStartDatesAndIntervalSizes(
    fileNames: string[]
  ): Promise<Map<string, FileProperties>> {
    const allFileInfos = await Promise.all(
      Array.from(
        fileNames
          .filter((x) => x.startsWith('asc'))
          .map(async (fileName) => this.getStartDateAndIntervalSize(fileName))
      )
    );
    const fileInfos = allFileInfos.filter((x) => !Number.isNaN(x[1].startDate));
    fileInfos.sort(([, a], [, b]) => a.startDate - b.startDate);
    for (let i: number = 0; i < fileInfos.length - 1; i += 1) {
      fileInfos[i][1].finalDate = fileInfos[i + 1][1].startDate;
    }
    const i = fileInfos.length - 1;
    fileInfos[i][1].finalDate = await this.getFinalDate(
      fileInfos[i][0],
      fileInfos[i][1].intervalSize
    );
    return new Map(fileInfos);
  }

  private async getFinalDate(
    fileName: string,
    intervalSize: number
  ): Promise<number> {
    const url = `${this.seriesUrl}/${fileName}`;
    const size = await getFileSize(url);
    const interval = size / intervalSize - 1;
    const data = await this.getDataForIntervalFromFile(
      fileName,
      interval,
      intervalSize
    );
    const matches = FileHelper.parseCoefficientData(data);
    return matches?.length ? parseFloat(matches[1]) : NaN;
  }

  private async getStartDateAndIntervalSize(
    fileName: string
  ): Promise<[string, FileProperties]> {
    const url = `${this.seriesUrl}/${fileName}`;
    const data = await getPartialDataFromFile(url, 0, sizeToCoverInterval);
    const matches = FileHelper.parseCoefficientData(data);
    const intervalDataArray = data.split(/ +2\s+\d/);
    return [
      fileName,
      {
        startDate: matches?.length ? parseFloat(matches[0]) : NaN,
        intervalSize: intervalDataArray[0].length,
        finalDate: 0,
      },
    ];
  }
}
