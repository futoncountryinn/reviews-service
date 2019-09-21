var path = require('path');
var SRC_DIR = path.join(__dirname, '/client');
var DIST_DIR = path.join(__dirname, '/public');
var BrotliPlugin = require('brotli-webpack-plugin');
const S3Plugin = require('webpack-s3-plugin');
// console.log(SRC_DIR);
// DONT USE BABEL-LOADER 8, ONLY 7 || npm install -D babel-loader@7 babel-core babel-preset-env webpack

module.exports = {
  mode: 'production',
  entry: `${SRC_DIR}/index.jsx`,
  devtool: '',
  plugins: [
    new BrotliPlugin({
      asset: '[path].br[query]',
      test: /\.jsx$/,
      threshold: 10240,
      minRation: 0.8
    }),
    new S3Plugin({
      s3Options: {
        accessKeyId: 'AKIAIJN3IHYRNB2MTYYA',
        secretAccessKey: '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',
        region: 'us-east-2'
      },
      s3UploadOptions: {
        Bucket: 'sdc-reviews-avatars',
        ContentEncoding(fileName) {
          if (/\.br/.test(fileName)) {
            return 'br'
          }
        },
      },
      ContentType(fileName) {
        if (/\.js/.test(fileName)) {
          return 'text/javascript'
        }
      },
      basePath: '/bundle',
      directory: __dirname + '/public'
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        include: SRC_DIR,
        exclude: [/(node_modules)/, /(routes)/, /(models)/, /(server)/],
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015'],
        }
      },
      {
        test: /\.svg$/,
        loader: 'svg-inline-loader'
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {},
          },
        ],
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}