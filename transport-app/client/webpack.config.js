const { DefinePlugin, ContextReplacementPlugin } = require('webpack')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
          compact: true,
          plugins: ['lodash']
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg|png)$/,
        loader: 'file-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader', 'import-glob']
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
    new ContextReplacementPlugin(/moment[\\/\\]locale$/, /en/),
    new CleanWebpackPlugin(),
    new LodashModuleReplacementPlugin(),
    // new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      hash: true,
      template: './public/index.html',
      filename: 'index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'styles.[hash].css'
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'public'),
        to: path.resolve(__dirname, 'build')
      }
    ])
  ]
}
