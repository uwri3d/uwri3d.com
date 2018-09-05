/* eslint "global-require": "off" */

const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const DotenvPlugin = require('dotenv-webpack');
const OfflinePlugin = require('offline-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = (env, options) => {
  const developmentMode = options.mode !== 'production';
  const analyze = options.analyze;

  const entry = path.resolve(__dirname, 'src/index.jsx');

  const exclude = [/node_modules/, /public/];

  const buildPath = path.resolve(__dirname, 'build/');

  const styleLoader = developmentMode ? 'style-loader' : MiniCssExtractPlugin.loader;

  const cssLoader = {
    loader: 'css-loader',
    options: {
      modules: true,
      localIdentName: developmentMode ? '[name]__[local]__[hash:base64:5]' : '[hash:base64:5]',
      importLoaders: 2,
    },
  };

  const postcssLoader = {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [require('autoprefixer')(), require('postcss-focus')()],
    },
  };

  const sassResourcesLoader = {
    loader: 'sass-resources-loader',
    options: {
      resources: ['./src/resources/scss/mixins.scss', './src/resources/scss/variables.scss'],
    },
  };

  const htmlTemplate = path.resolve(__dirname, 'public/index.html');

  return {
    entry,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude,
          use: ['babel-loader', 'eslint-loader'],
        },
        {
          test: /(normalize\.css)$/,
          use: [styleLoader, cssLoader],
        },
        {
          test: /\.(scss)$/,
          exclude,
          use: [styleLoader, cssLoader, postcssLoader, 'sass-loader', sassResourcesLoader],
        },
        {
          test: /\.(svg)$/,
          use: ['file-loader', 'image-webpack-loader'],
        },
      ],
    },
    resolve: { extensions: ['*', '.js', '.jsx'] },
    output: {
      filename: '[name].js',
      path: buildPath,
      publicPath: '/',
    },
    devServer: {
      contentBase: buildPath,
      port: 3000,
      publicPath: 'http://localhost:3000/',
      hot: true,
      historyApiFallback: true,
    },
    optimization: {
      minimizer: [
        new UglifyJsPlugin({
          cache: true,
          parallel: true,
          sourceMap: true,
        }),
        new OptimizeCSSAssetsPlugin({}),
      ],
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      ...(developmentMode ? [new webpack.HotModuleReplacementPlugin()] : []),
      new webpack.NamedModulesPlugin(),
      new webpack.SourceMapDevToolPlugin({
        filename: '[name].js.map',
      }),
      new webpack.DefinePlugin({
        'process.env.NPM_PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
      }),
      new DotenvPlugin({
        path: `.env.${process.env.NODE_ENV}`,
        safe: true,
      }),
      new CleanWebpackPlugin(['build']),
      new HtmlWebpackPlugin({
        template: htmlTemplate,
        filename: 'index.html',
        inject: 'body',
      }),
      new CopyWebpackPlugin(['public']),
      new MiniCssExtractPlugin({
        filename: '[name].css',
        chunkFilename: '[id].css',
      }),
      ...(!developmentMode
        ? [
            new OfflinePlugin({
              appShell: '/',
              externals: ['/'],
            }),
          ]
        : []),
      ...(analyze ? [new BundleAnalyzerPlugin()] : []),
    ],
  };
};