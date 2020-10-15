const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const InjectManifest = require('workbox-webpack-plugin/build/inject-manifest.js')
const BundleTracker = require('webpack-bundle-tracker')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
  context: __dirname,
  entry: {
    index: './src/scripts/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].[contenthash].bundle.js'
  },
  devServer: {
    writeToDisk: true,
    https: true
  },
  optimization: {
    moduleIds: 'hashed',
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [{
        test: /\.(woff2|png|svg|jpg|jpeg|gif)$/,
        loader: 'file-loader',
        options: {
          esModule: false
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          // fallback to style-loader in development
          // 'style-loader',
          // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass')
            }
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-syntax-dynamic-import',
              '@babel/plugin-transform-runtime'
            ],
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].bundle.css'
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/',
        to: 'assets/',
        ignore: ['static-photos/*']
      }
    ]),
    new InjectManifest({
      swSrc: './src/service-worker.js'
    }),
    new BundleTracker({filename: './dist/webpack-stats.json'})
  ]
}

