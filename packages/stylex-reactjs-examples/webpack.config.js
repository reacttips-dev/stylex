/*eslint-env node*/
/*eslint import/no-nodejs-modules:0 */
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const autoprefixer = require('autoprefixer');

const babelConfig = require('./babel.config');
// const getClientEnvironment = require('./config/env');

const {env} = process;

/**
 * Environment configuration
 */
const IS_PRODUCTION = env.NODE_ENV === 'production';
const IS_TEST = env.NODE_ENV === 'test' || env.TEST_SUITE;
const IS_STORYBOOK = env.STORYBOOK_BUILD === '1';
const IS_CI = !!env.CI || !!env.TRAVIS;
const IS_DEPLOY_PREVIEW = !!env.NOW_GITHUB_DEPLOYMENT;
const IS_UI_DEV_ONLY = !!env.SENTRY_UI_DEV_ONLY;
const DEV_MODE = !(IS_PRODUCTION || IS_CI);
const WEBPACK_MODE = IS_PRODUCTION ? 'production' : 'development';

/**
 * Environment variables that are used by other tooling and should
 * not be user configurable.
 */
// Ports used by webpack dev server to proxy to backend and webpack
const SENTRY_BACKEND_PORT = env.SENTRY_BACKEND_PORT;
const SENTRY_WEBPACK_PROXY_PORT = env.SENTRY_WEBPACK_PROXY_PORT;
// Used by sentry devserver runner to force using webpack-dev-server
const FORCE_WEBPACK_DEV_SERVER = !!env.FORCE_WEBPACK_DEV_SERVER;
const HAS_WEBPACK_DEV_SERVER_CONFIG = SENTRY_BACKEND_PORT && SENTRY_WEBPACK_PROXY_PORT;

/**
 * User/tooling configurable environment variables
 */
const NO_DEV_SERVER = !!env.NO_DEV_SERVER; // Do not run webpack dev server
const TS_FORK_WITH_ESLINT = !!env.TS_FORK_WITH_ESLINT; // Do not run eslint with fork-ts plugin
const SHOULD_FORK_TS = DEV_MODE && !env.NO_TS_FORK; // Do not run fork-ts plugin (or if not dev env)
const SHOULD_HOT_MODULE_RELOAD = DEV_MODE && !!env.SENTRY_UI_HOT_RELOAD;

// Deploy previews are built using zeit. We can check if we're in zeit's
// build process by checking the existence of the PULL_REQUEST env var.
const DEPLOY_PREVIEW_CONFIG = IS_DEPLOY_PREVIEW && {
  branch: env.NOW_GITHUB_COMMIT_REF,
  commitSha: env.NOW_GITHUB_COMMIT_SHA,
  githubOrg: env.NOW_GITHUB_COMMIT_ORG,
  githubRepo: env.NOW_GITHUB_COMMIT_REPO,
};

// When deploy previews are enabled always enable experimental SPA mode --
// deploy previews are served standalone. Otherwise fallback to the environment
// configuration.
const SENTRY_EXPERIMENTAL_SPA =
  !DEPLOY_PREVIEW_CONFIG && !IS_UI_DEV_ONLY ? env.SENTRY_EXPERIMENTAL_SPA : true;

// this is set by setup.py sdist
const staticPrefix = path.join(__dirname, './');
const distPath = env.SENTRY_STATIC_DIST_PATH || path.join(staticPrefix, 'dist');

var MYSTATS = {

  // Add asset Information
  assets: false,

  // Sort assets by a field
  assetsSort: '',

  // Add information about cached (not built) modules
  cached: true,

  // Show cached assets (setting this to `false` only shows emitted files)
  cachedAssets: true,

  // Add children information
  children: true,

  // Add chunk information (setting this to `false` allows for a less verbose output)
  chunks: true,

  // Add built modules information to chunk information
  chunkModules: true,

  // Add the origins of chunks and chunk merging info
  chunkOrigins: true,

  // Sort the chunks by a field
  chunksSort: '',

  // `webpack --colors` equivalent
  colors: true,

  // Display the distance from the entry point for each module
  depth: true,

  // Display the entry points with the corresponding bundles
  entrypoints: true,

  // Add errors
  errors: true,

  // Add details to errors (like resolving log)
  errorDetails: true,

  // Exclude modules which match one of the given strings or regular expressions
  exclude: [],

  // Add the hash of the compilation
  hash: true,

  // Set the maximum number of modules to be shown
  maxModules: 0,

  // Add built modules information
  modules: false,

  // Sort the modules by a field
  modulesSort: '!size',

  // Show performance hint when file size exceeds `performance.maxAssetSize`
  performance: true,

  // Show the exports of the modules
  providedExports: true,

  // Add public path information
  publicPath: true,

  // Add information about the reasons why modules are included
  reasons: true,

  // Add the source code of modules
  source: true,

  // Add timing information
  timings: true,

  // Show which exports of a module are used
  usedExports: true,

  // Add webpack version information
  version: true,

  // Add warnings
  warnings: true,

  // Filter warnings to be shown (since webpack 2.4.0),
  // can be a String, Regexp, a function getting the warning and returning a boolean
  // or an Array of a combination of the above. First match wins.
  warningsFilter: '',
};

let publicPath = '/static/'; // path.resolve(fs.realpathSync(process.cwd()), '/static/');

const STANDARD_EXCLUDE = [
  path.join(__dirname, 'node_modules'),
];

/**
 * Explicit codesplitting cache groups
 */
const cacheGroups = {
  // vendorCore: {
  //     name: 'vendor-core',
  //     test: /node_modules\/@ladifire.*/g,
  //     chunks: 'all',
  //     priority: 0,
  //     enforce: true,
  // },
  // vendors: {
  //     name: 'vendor',
  //     test: /node_modules[\\/](?!@ladifire).*/g,
  //     priority: -10,
  //     enforce: true,
  //     chunks: 'initial',
  // },
  vendorRedux: {
    name: '@chot.sale-js',
    test: /node_modules\/@chot.sale.*/g,
    chunks: 'all',
    priority: 1,
    enforce: true,
  },
};

const babelOptions = {...babelConfig, cacheDirectory: true};
const babelLoaderConfig = {
  loader: 'babel-loader',
  options: babelOptions,
};

/**
 * Main Webpack config for Sentry React SPA.
 */
let appConfig = {
  mode: WEBPACK_MODE,
  output: {
    path: path.join(__dirname, 'dist'),
    publicPath,
    filename: '[name].[hash].js',
    chunkFilename: '[name].[contenthash].js',
    sourceMapFilename: '[name].[hash].js.map',
  },
  entry: {
    /**
     * Main ChotSale App
     */
    index: path.resolve(fs.realpathSync(process.cwd()), "./src/index.tsx"),
    shared: 'lodash',
  },
  // context: staticPrefix,
  module: {
    /**
     * XXX: Modifying the order/contents of these rules may break `getsentry`
     * Please remember to test it.
     */
    rules: [
      {
        test: /\.(ts|tsx)$/,
        include: [/node_modules\/@ladifire\/stylex/],
        use: [
          babelLoaderConfig
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        // include: paths.appSrc,
        // exclude:[/(stories|test)\.(ts|tsx)$/, /__data__/, /node_modules\/@ladifire-css\/sass/],
        exclude: STANDARD_EXCLUDE,
        use: [
          babelLoaderConfig,
          // { loader: StylexPlugin.loader },
        ],
      },
      {
        test: /\.(ts|tsx)$/,
        include: [
          /@chot.sale\/converstaions-js/,
          /node_modules\/@ladifire-ui-react\/*/,
          /node_modules\/@react-ui-aria\/*/,
          /node_modules\/@react-ui-stately\/*/,
        ],
        use: [
          babelLoaderConfig,
          // { loader: StylexPlugin.loader },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          // {
          //   loader: 'typings-for-css-modules-loader?modules&namedExport',
          // },
          // 'style-loader',
          {
            loader: ExtractTextPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              camelCase: true,
              localIdentName: '[sha512:hash:base64:8]',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules/compass-mixins/lib', 'sass'],
              },
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: ExtractTextPlugin.loader,
          },
          {
            loader: require.resolve('css-loader'),
            // options: {
            //     importLoaders: 2,
            // }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              // Necessary for external CSS imports to work
              // https://github.com/facebookincubator/create-react-app/issues/2677
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  flexbox: 'no-2009'
                })
              ]
            }
          },
        ],
      },
      {
        test: /\.(ttf|woff|woff2|svg|gif|mp3|cur|eot|png|jpg)(\?[a-f0-9]{32})?$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[hash:6].[ext]',
              esModule: false,
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {},
          },
        ],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            // options: {
            //   attrs: 'link:href',
            // },
          },
        ],
      },
      {
        test: /\.svg$/,
        exclude: [/font-logos.svg$/],
        use: {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                // by default prefixes classes with svg path or random string
                { prefixIds: { prefixIds: true, prefixClassNames: false } },
                // by default removes the viewbox attribute
                { removeViewBox: false }
              ]
            }
          }
        }
      },
      {
        test: /\.(js|jsx|mjs)$/,
        loader: require.resolve('source-map-loader'),
        enforce: 'pre',
        include: path.resolve(fs.realpathSync(process.cwd()), 'src'),
      },
      {
        type: 'javascript/auto',
        test: /\.json$/,
        include: path.resolve(fs.realpathSync(process.cwd()), 'src/i18n'),
        exclude: [/en\.json$/],
        use: [
          {
            loader: 'file-loader?name=i18n/[name].[hash].[ext]',
            options: {
              name: 'i18n/[name].[hash:8].[ext]',
              esModule: false,
            },
          },
        ]
      },
    ],
    noParse: [
      // don't parse known, pre-built javascript files (improves webpack perf)
      /dist\/jquery\.js/,
      /jed\/jed\.js/,
      // /marked\/lib\/marked\.js/,
      /terser\/dist\/bundle\.min\.js/,
    ],
  },
  performance: {
    hints: 'warning',
  },
  target: 'web',
  plugins: [
    new webpack.DefinePlugin({
      COMMIT_HASH: JSON.stringify(childProcess.execSync('git rev-parse HEAD || echo dev').toString()),
    }),

    new ExtractTextPlugin({
      filename: '[name].[contentHash:11].css',
      chunkFilename: '[name].[contentHash:11].css',
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      inject: 'head',
      template: path.resolve(__dirname, "public/index.html"),
    }),

    /**
     * Defines environment specific flags.
     */
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(env.NODE_ENV),
        IS_CI: JSON.stringify(IS_CI),
        DEPLOY_PREVIEW_CONFIG: JSON.stringify(DEPLOY_PREVIEW_CONFIG),
        EXPERIMENTAL_SPA: JSON.stringify(SENTRY_EXPERIMENTAL_SPA),
        SPA_DSN: JSON.stringify(env.SENTRY_SPA_DSN),
      },
    }),
  ],
  resolve: {
    alias: {
      app: path.join(staticPrefix, 'app'),
      'src': path.resolve(fs.realpathSync(process.cwd()), 'src'),
    },
    modules: [
      'node_modules',
      path.resolve(__dirname),
    ],
    extensions: ['.jsx', '.js', '.json', '.ts', '.tsx', '.scss', '.mjs'],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      maxInitialRequests: 5,
      maxAsyncRequests: 7,
      cacheGroups,
    },
  },
  // devtool: IS_PRODUCTION ? 'source-map' : 'cheap-module-eval-source-map',
};

module.exports = appConfig;
