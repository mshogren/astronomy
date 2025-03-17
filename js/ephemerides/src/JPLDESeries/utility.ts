function isValidUrl(url: string): boolean {
  try {
    const result = typeof new URL(url);
    return result !== 'undefined';
  } catch {
    return false;
  }
}

async function parseHtmlFileListing(data: string): Promise<Array<string>> {
  const isBrowser = typeof globalThis.window !== 'undefined';

  const html = isBrowser
    ? new DOMParser().parseFromString(data, 'text/html')
    : new (await import('jsdom')).JSDOM(data).window.document;

  const anchorElements = Array.from(
    html.getElementsByTagName('table')[0].getElementsByTagName<'a'>('a')
  );

  return anchorElements
    .map((anchor: HTMLAnchorElement) => anchor.href?.toString())
    .map((path?: string) => (path ? path.split('/').reverse()[0] : ''));
}

/**
 * Gets data from a file as an ASCII string.
 * @param url - A relative or absolute file path or url of a file.
 * @returns A promise that resolves to file data as an ASCII string.
 */
export async function getDataFromFile(url: string): Promise<string> {
  if (isValidUrl(url)) {
    const response = await fetch(url);
    return response.text();
  }
  const fs = await import('fs/promises');
  const file = await fs.readFile(url, { encoding: 'ascii' });
  return file.toString();
}

/**
 * Gets data from a range of bytes in a file as an ASCII string.
 * @param url - A relative or absolute file path or url of a file.
 * @param start - The first byte of data to return.
 * @param end - The last byte of data to return.
 * @returns A promise that resolves to file data as an ASCII string.
 */
export async function getPartialDataFromFile(
  url: string,
  start: number,
  end: number
): Promise<string> {
  if (isValidUrl(url)) {
    const headers = { Range: `bytes=${start}-${end}` };
    const response = await fetch(url, { headers });
    return response.ok ? response.text() : '';
  }
  const fs = await import('fs/promises');
  const file = await fs.open(url);
  const buffer = Buffer.alloc(end - start + 1, undefined, 'ascii');
  await file.read(buffer, 0, buffer.byteLength, start);
  file.close();
  return buffer.toString('ascii');
}

/**
 * Gets a list of JPL Development Ephemerides files at a URL location.
 * @param url - A relative or absolute file path or url of a web page that lists files.
 * @returns A promise that resolves to an array of file names.
 */
export async function getFileListing(url: string): Promise<Array<string>> {
  if (isValidUrl(url)) {
    const response = await fetch(url);
    const text = await response.text();
    return parseHtmlFileListing(text);
  }
  const fs = await import('fs/promises');
  return fs.readdir(url);
}

/**
 * Gets the length of a file in bytes.
 * @param url - A relative or absolute file path or url of a file.
 * @returns A promise that resolves to the length of the file in bytes.
 */
export async function getFileSize(url: string): Promise<number> {
  if (isValidUrl(url)) {
    const response = await fetch(url, { method: 'HEAD' });
    return parseInt(response.headers.get('content-length') ?? '0', 10);
  }
  const fs = await import('fs/promises');
  return (await fs.stat(url)).size;
}
