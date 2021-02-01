const {
  sassResources,
  sassIncludePaths,
  vueSvgLoaderRule,
  cssoWebpackPlugin,
  svgExcludeRuleFromLoaders,
} = require('../webpack/shared');

module.exports = {
  stories: ['../**/*.stories.mdx', '../**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    {
      name: '@storybook/addon-links',
    },
    {
      name: '@storybook/addon-essentials',
    },
    {
      name: '@storybook/preset-scss',
      options: {
        sassLoaderOptions: {
          additionalData: sassResources('storybook')
            .map(path => `@import '${path}';`)
            .join(''),
          sassOptions: {
            includePaths: sassIncludePaths(),
          },
        },
      },
    },
  ],
  webpackFinal: async (config, ctx) => {
    const {configType} = ctx;
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Exclude SVG from Storybook file-loader
    config.module.rules = svgExcludeRuleFromLoaders(config.module.rules);

    // React SVG Loader
    config.module.rules.push(vueSvgLoaderRule());

    // Aliases for paths to app directories
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': process.cwd(),
    };

    // CSS optimizations
    if (configType !== 'DEVELOPMENT') {
      config.plugins.push(cssoWebpackPlugin());
    }

    // Return the altered config
    return config;
  },
};
