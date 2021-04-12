import path from 'path';
import {DefinePlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import {encode} from './src/util/key-codec';

module.exports = (env: NodeJS.ProcessEnv, argv: Record<string, string>) => {
  const isProduction = argv.mode === 'production';

  console.log(isProduction ? "PRODUCTION BUILD" : 'DEVELOPMENT BUILD');

  global.btoa = function (str) {
    return Buffer.from(str, 'binary').toString('base64');
  };

  return {
    devtool: !isProduction && 'cheap-module-source-map',
    mode: isProduction ? 'production' : 'development',
    entry: './src/client.ts',
    output: {
      library: 'stdGithubSearch',
      libraryExport: 'default',
      libraryTarget: 'umd',
      path: path.resolve(__dirname, 'dist'),
      filename: 'assets/js/client.js',
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: {loader: 'ts-loader'},
        },
        {
          test: /\.css$/,
          use: [
            {loader: 'style-loader'},
            {
              loader: "css-loader",
              options: {modules: true}
            },
            {loader: '@teamsupercell/typings-for-css-modules-loader'},
          ]
        }
      ],
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.css'],
    },
    plugins: [
      new DefinePlugin({
        GITHUB_AUTH_TOKEN: process.env.GITHUB_AUTH_TOKEN
          ? JSON.stringify(encode(process.env.GITHUB_AUTH_TOKEN))
          : 'GITHUB_AUTH_TOKEN'
      }),
      new HtmlWebpackPlugin(),
    ]
  };
};