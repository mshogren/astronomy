/** @type {import('typedoc').TypeDocOptions} */

module.exports = {
  plugin: ['typedoc-plugin-markdown'],
  entryPoints: ['src/ephemerides.ts'],
  readme: 'none',
  excludePrivate: true,
};
