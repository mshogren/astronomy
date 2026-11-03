/**
 * @type {import('semantic-release').GlobalConfig}
 */
export default {
  branches: ['main'],
  tagFormat: 'ephemerides@v${version}',
  extends: ['semantic-release-monorepo'],
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/git',
      {
        assets: ['js/ephemerides/package.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    //'@semantic-release/npm',
    //'@semantic-release/github',
  ],
};
