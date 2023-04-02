const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev
console.log("isDev", isDev)

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: "development",
  entry: {
    main: './index.js',
    analytics: "./analytics.js"
  },
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist")
  },
  resolve: {
    extensions: [".js"],
    alias: {
      '@models': path.resolve(__dirname, "src/models"),
      "@": path.resolve(__dirname, "src")
    }
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimize: isProd,
   // minimizer: [new TerserPlugin()],
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()]
  },
  devServer: {
    port: 3000,
    hot: isDev
  },
  plugins:[
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
    ]}),
    new MiniCssExtractPlugin({
      filename:"[name].[contenthash].css"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use:[{
          loader: MiniCssExtractPlugin.loader,
          options: {
          },
        },'css-loader']
      },
      {
        test: /\.less$/,
        use:[{
          loader: MiniCssExtractPlugin.loader,
          options: {
          },
        },'css-loader','less-loader']
      },
      {
        test: /\.(png|jpg|svg|gif|jpeg)$/,
        use:['file-loader']
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        use:['file-loader']
      },
      {
        test: /\.xml$/,
        use:['xml-loader']
      },
      {
        test: /\.csv$/,
        use:['csv-loader']
      },
    ]
  }
}