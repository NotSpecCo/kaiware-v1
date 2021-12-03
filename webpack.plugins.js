const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

const assets = ['static'];
const copyPlugins = new CopyWebpackPlugin({
  patterns: assets.map((asset) => ({
    from: path.resolve(__dirname, 'src', asset),
    to: path.resolve(__dirname, '.webpack/renderer', asset),
  })),
});

module.exports = [new ForkTsCheckerWebpackPlugin(), copyPlugins];
