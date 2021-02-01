const path = require('path');
const CssoWebpackPlugin = require('csso-webpack-plugin').default;

/**
 * @param envResources {'nuxt'|'storybook'}
 * Filenames in 'styles/resources' directory to be allowed in each component
 */
const sassResources = envResources => [
  `styles/resources/${envResources}`,
  'styles/resources/colors',
  'styles/resources/grid',
  'styles/resources/mixins',
  'styles/resources/variables',
];

/**
 * @see https://github.com/sass/node-sass#includepaths
 */
const sassIncludePaths = () => [process.cwd()];

/**
 * @see https://www.npmjs.com/package/csso-webpack-plugin
 */
const cssoWebpackPlugin = () => new CssoWebpackPlugin();

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
const svgExcludeRuleFromLoaders = rules => {
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
 * @see https://www.npmjs.com/package/vue-svg-loader
 */
const vueSvgLoaderRule = () => ({
  test: /\.svg$/,
  include: path.resolve(process.cwd(), 'static', 'assets', 'icons'),
  use: [
    'babel-loader',
    {
      loader: 'vue-svg-loader',
      options: {
        svgo: svgoConfig(),
      },
    },
  ],
});

module.exports = {
  sassIncludePaths,
  sassResources,
  svgoConfig,
  svgExcludeRuleFromLoaders,
  vueSvgLoaderRule,
  cssoWebpackPlugin,
};
