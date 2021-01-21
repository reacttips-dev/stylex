/*eslint-env node*/
/*eslint import/no-nodejs-modules:0 */
const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const StylexPlugin = require("@ladifire-opensource/stylex-webpack-plugin");

const babelConfig = require('./babel.config');

const {env} = process;

/**
 * Environment configuration
 */
const IS_PRODUCTION = env.NODE_ENV === 'production';
const IS_CI = !!env.CI || !!env.TRAVIS;
const WEBPACK_MODE = IS_PRODUCTION ? 'production' : 'development';

const staticPrefix = path.join(__dirname, './');
let publicPath = '/'; // path.resolve(fs.realpathSync(process.cwd()), '/static/');
const STANDARD_EXCLUDE = [
  path.join(__dirname, 'node_modules'),
];

/**
 * Explicit codesplitting cache groups
 */
const cacheGroups = {
  vendorCore: {
      name: 'vendor-core',
      test: /node_modules\/@ladifire.*/g,
      chunks: 'all',
      priority: 0,
      enforce: true,
  },
  vendors: {
      name: 'vendor',
      test: /node_modules[\\/](?!@ladifire).*/g,
      priority: -10,
      enforce: true,
      chunks: 'initial',
  }
};

const babelOptions = {...babelConfig, cacheDirectory: true};
const babelLoaderConfig = {
  loader: 'babel-loader',
  options: babelOptions,
};

/**
 * Main Webpack config for stylex reactjs demo.
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
    index: path.resolve(fs.realpathSync(process.cwd()), "./src/index.tsx"),
    shared: 'lodash',
  },
  context: staticPrefix,
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: STANDARD_EXCLUDE,
        use: [
          babelLoaderConfig,
          {
            loader: StylexPlugin.loader,
            options: {
              inject: false,
            },
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
        test: /\.css$/,
        exclude: STANDARD_EXCLUDE,
        use: [
          {
            loader: ExtractTextPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
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

    new StylexPlugin(),

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
};

module.exports = appConfig;
