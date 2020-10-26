const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const packageJson = require('./package.json');

module.exports = (env, argv) => {
  const isDevelopment = argv.mode === 'development';

  return {
    mode: argv.mode,
    devtool: 'source-map',
    entry: ['./src/index.tsx'],
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              plugins: isDevelopment ? ['react-refresh/babel'] : []
            }
          }
        },
      ]
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    output: {
      path: path.resolve('dist'),
      publicPath: isDevelopment ? '/' : packageJson.homepage,
      filename: `${packageJson.name}.js`,
    },
    plugins: [
      isDevelopment
        ? new ReactRefreshWebpackPlugin()
        : new CleanWebpackPlugin(),
      new ForkTsCheckerWebpackPlugin()
    ],
    devServer: {
      contentBase: path.resolve('local'),
      hot: true
    }
  };
};
