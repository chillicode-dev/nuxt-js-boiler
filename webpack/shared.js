const path = require('path');
// const CssoWebpackPlugin = require('csso-webpack-plugin').default;

/**
 * Aliases for Webpack alias resolver
 */
const aliases = () => ({
  assets: path.resolve(process.cwd(), 'assets'),
  components: path.resolve(process.cwd(), 'components'),
  config: path.resolve(process.cwd(), 'config'),
  layouts: path.resolve(process.cwd(), 'layouts'),
  middleware: path.resolve(process.cwd(), 'middleware'),
  modals: path.resolve(process.cwd(), 'modals'),
  sections: path.resolve(process.cwd(), 'sections'),
  services: path.resolve(process.cwd(), 'services'),
  static: path.resolve(process.cwd(), 'static'),
  store: path.resolve(process.cwd(), 'store'),
  styles: path.resolve(process.cwd(), 'styles'),
  tests: path.resolve(process.cwd(), 'tests'),
  utils: path.resolve(process.cwd(), 'utils'),
});

/**
 * Filenames in 'styles/resources' directory to be allowed in each component
 */
const sassResources = () => ['colors', 'grid', 'mixins', 'variables'];

/**
 * @see https://github.com/sass/node-sass#includepaths
 */
const sassIncludePaths = () => [process.cwd()];

/**
 * @param env {'next'|'storybook'}
 * @see https://github.com/sass/node-sass#data
 */
const sassSharedData = env => {
  return `
    $publicPath: ${env === 'storybook' ? '/public' : '""'};

    @import 'styles/config/breakpoints.json';
    @import 'styles/config/grid.json';
    @import 'styles/config/colors.json';
    @import 'styles/preferences/variables';
    @import 'styles/preferences/grid';
    @import 'styles/preferences/mixins';
    @import 'styles/preferences/easings';
  `;
};

/**
 * @see https://www.npmjs.com/package/csso-webpack-plugin
 */
// const cssoWebpackPlugin = () => new CssoWebpackPlugin();

/**
 * @see https://github.com/svg/svgo/blob/master/README.ru.md
 */
const svgoConfig = () => ({
  plugins: [
    {
      cleanupAttrs: true,
    },
    {
      removeDoctype: true,
    },
    {
      removeXMLProcInst: true,
    },
    {
      removeComments: true,
    },
    {
      removeMetadata: true,
    },
    {
      removeTitle: true,
    },
    {
      removeDesc: true,
    },
    {
      removeUselessDefs: true,
    },
    {
      removeEditorsNSData: true,
    },
    {
      removeEmptyAttrs: true,
    },
    {
      removeHiddenElems: true,
    },
    {
      removeEmptyText: true,
    },
    {
      removeEmptyContainers: false,
    },
    {
      removeViewBox: false,
    },
    {
      cleanupEnableBackground: false,
    },
    {
      convertStyleToAttrs: false,
    },
    {
      convertColors: true,
    },
    {
      convertPathData: true,
    },
    {
      convertTransform: false,
    },
    {
      removeUnknownsAndDefaults: false,
    },
    {
      removeNonInheritableGroupAttrs: false,
    },
    {
      removeUselessStrokeAndFill: false,
    },
    {
      removeUnusedNS: false,
    },
    {
      cleanupIDs: false,
    },
    {
      cleanupNumericValues: false,
    },
    {
      moveElemsAttrsToGroup: false,
    },
    {
      moveGroupAttrsToElems: false,
    },
    {
      collapseGroups: false,
    },
    {
      removeRasterImages: false,
    },
    {
      mergePaths: true,
    },
    {
      convertShapeToPath: true,
    },
    {
      sortAttrs: false,
    },
    {
      removeDimensions: false,
    },
    {
      removeAttrs: false,
    },
    {
      prefixIds: true,
    },
  ],
});

/**
 * @see https://github.com/storybookjs/storybook/issues/7360#issuecomment-538799239
 * @param rules {Array<object>}
 * @returns {Array<object>}
 */
const svgExcludeRuleFromStorybookLoaders = rules => {
  return rules.map(rule => {
    if (rule.test.test('.svg')) {
      return {
        ...rule,
        test: /\.(ico|jpg|jpeg|png|apng|gif|eot|otf|webp|ttf|woff|woff2|cur|ani|pdf)(\?.*)?$/,
      };
    }
    return rule;
  });
};

/**
 * Shared react-svg-loader rule
 * @see https://www.npmjs.com/package/react-svg-loader
 * @param defaultBabelLoader {string}
 * @returns {{include: string, test: RegExp, use: [*, {loader: string, options: {svgo: {plugins}, jsx: boolean}}]}}
 */
const reactSvgLoaderRule = defaultBabelLoader => ({
  test: /\.svg$/,
  include: path.resolve(process.cwd(), 'public', 'assets', 'icons'),
  use: [
    defaultBabelLoader,
    {
      loader: 'react-svg-loader',
      options: {
        jsx: false, // true outputs JSX tags
        svgo: svgoConfig(),
      },
    },
  ],
});

module.exports = {
  sassIncludePaths,
  sassSharedData,
  sassResources,
  svgoConfig,
  svgExcludeRuleFromStorybookLoaders,
  reactSvgLoaderRule,
  // cssoWebpackPlugin,
  aliases,
};
