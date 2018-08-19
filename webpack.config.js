const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

module.exports = {
  mode: 'development',
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[hash].chunk.js',
    path: `${__dirname}/public/packs`,
    publicPath: '/packs/',
    pathinfo: true,
  },
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.sass',
      '.scss',
      '.css',
      '.module.sass',
      '.module.scss',
      '.module.css',
      '.png',
      '.svg',
      '.gif',
      '.jpeg',
      '.jpg',
    ],
    modules: [
      `${__dirname}/app/javascript`,
      'node_modules',
    ],
  },
  entry: {
    application: './app/javascript/packs/application.jsx',
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      {
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name]-[hash].css',
      chunkFilename: '[name]-[hash].chunk.css',
    }),
    new ManifestPlugin({
      fileName: 'manifest.json',
      publicPath: '/packs/',
      writeToFileEmit: true,
    }),
  ],
}
