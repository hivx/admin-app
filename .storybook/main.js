const path = require('path');
const tsconfigPaths = require('vite-tsconfig-paths');
const inject = require('@rollup/plugin-inject');

const { loadConfigFromFile, mergeConfig } = require('vite');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite',
  },
  features: {
    storyStoreV7: true,
  },
  // resolve: {
  //   alias: [
  //       {
  //           find: "@",
  //           replacement: path.resolve(__dirname, "./src"),
  //       }
  //   ],
  async viteFinal(config, { configType }) {
    const { config: userConfig } = await loadConfigFromFile(
      path.resolve(__dirname, '../vite.config.ts'),
    );

    const isDev = process.env.NODE_ENV === 'development';

    return mergeConfig(config, {
      // ...userConfig,
      // manually specify plugins to avoid conflict
      plugins: [
        tsconfigPaths.default(),
        !isDev && {
          ...inject({
            global: [
              require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
              'global',
            ],
            process: [
              require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
              'process',
            ],
            Buffer: [
              require.resolve('node-stdlib-browser/helpers/esbuild/shim'),
              'Buffer',
            ],
          }),
          enforce: 'post',
        },
      ],
      build: {},
      test: {},
    });
  },
};
