// license by johanholmerin
const StylexPlugin = require('@ladifire-opensource/stylex-webpack-plugin');
const {
  getClientStyleLoader
} = require('next/dist/build/webpack/config/blocks/css/loaders/client');
const {stringifyCssRequest} = require('./utils');

function getInlineLoader(options) {
  const outputLoaders = [
    {loader: 'css-loader'}
  ];

  if (!options.isServer) {
    outputLoaders.unshift(
      // Logic adopted from https://git.io/JfD9r
      getClientStyleLoader({
        isDevelopment: options.dev,
        assetPrefix: options.config.assetPrefix
      })
    );
  }

  return stringifyCssRequest(outputLoaders);
}

module.exports = (pluginOptions = {}) => (nextConfig = {}) => ({
  ...nextConfig,
  webpack(config, options) {
    const outputCSS = !options.isServer;

    config.module.rules.unshift({
      test: /\.(tsx|ts|js|mjs|jsx)$/,
      use: [
        {
          loader: StylexPlugin.loader,
          options: {
            inlineLoader: getInlineLoader(options),
            outputCSS,
            ...pluginOptions
          }
        }
      ]
    });

    if (outputCSS) {
      config.plugins.push(new StylexPlugin());
    }

    if (typeof nextConfig.webpack === 'function') {
      return nextConfig.webpack(config, options);
    }

    return config;
  }
});
