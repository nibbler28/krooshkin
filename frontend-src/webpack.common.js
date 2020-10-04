const Path = require('path');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const ManifestPlugin = require('webpack-manifest-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const InjectManifest = require('workbox-webpack-plugin/build/inject-manifest.js');
// const BundleTracker = require('webpack-bundle-tracker');
const path = require('path');

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
      chunks: 'all',
    },
  },
  module: {
    rules: [{
        test: /\.(woff2|png|svg|jpg|jpeg|gif)$/,
        loader: "file-loader",
        options: {
          esModule: false
        }
      },
      {
        test: /\.hbs$/,
        loader: "handlebars-loader",
        options: {
          rootRelative: Path.resolve('src/hbs') + '/',
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          // fallback to style-loader in development
          'style-loader',
          // process.env.NODE_ENV !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              // Prefer `dart-sass`
              implementation: require('sass'),
            },
          },
        ],
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
    new ManifestPlugin(),
    new MiniCssExtractPlugin({
      filename: "style.css"
    }),
    new CopyWebpackPlugin([
      {
        from: './src/assets/',
        to: './assets'
      },
    ]),
    new InjectManifest({
      swSrc: './src/service-worker.js',
    }),
    // new BundleTracker({filename: './webpack-stats.json'}),
  ]
};

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  // application specific logging, throwing an error, or other logic here
});
