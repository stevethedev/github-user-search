const path = require('path');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    devtool: !isProduction && 'cheap-module-source-map',
    mode: isProduction ? 'production' : 'development',
    entry: './src/client.ts',
    output: {
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
  };
};
