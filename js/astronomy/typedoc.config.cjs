/** @type {import('typedoc').TypeDocOptions} */

module.exports = {
  plugin: ['typedoc-plugin-markdown'],
  entryPoints: ['src/astronomy.ts'],
  readme: 'none',
  excludePrivate: true,
};
