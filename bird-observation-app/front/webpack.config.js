const { ContextReplacementPlugin } = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { resolveTsconfigPathsToAlias } = require('./webpack.utils.js')

module.exports = {
  mode: 'production',
  entry: ['./src/index.tsx'],
  resolve: {
    alias: resolveTsconfigPathsToAlias(),
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  output: {
    filename: '[name].bundle.[hash].js',
    publicPath: '/',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.[j|t]sx?$/,
        loader: 'babel-loader',
        options: {
          compact: true
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        loader: 'file-loader'
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial'
        }
      }
    }
  },
  plugins: [
    new ContextReplacementPlugin(/moment[/\\]locale$/, /en|fi/),
    new CleanWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, 'public'),
      to: path.resolve(__dirname, 'build')
    }])
  ]
}
