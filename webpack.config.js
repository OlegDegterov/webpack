const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const CopyWebpackPlugin = require("copy-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development"
const isProd = !isDev

const fileName = (extension) => {
  isDev ? `[name].${extension}` : `[name].[contenthash].${extension}`
}

const cssLoaders = (loader) => {
  let loaders = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
    },
  },'css-loader']
  if (loader) {
    loaders.push(loader)
  }
  return loaders
}

const babelOptions = (option) => {
  let options = {
    "presets": ["@babel/preset-env"],
    plugins:[
    ]
  }
  if (option){
    options.presets.push(option)
  }
 return options
}

console.log("isDev", isDev)

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: "development",
  entry: {
    main: ['@babel/polyfill','./index.jsx'],
    analytics: "./analytics.ts"
  },
  output: {
    filename: fileName("js"),
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
  devtool: isDev ? 'source-map' : false,
  //devtool: isDev,
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
      filename: "[name].[contenthash].css"
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders()
      },
      {
        test: /\.less$/,
        use: cssLoaders("less-loader")
      },
      {
        test: /\.s[ac]ss$/,
        use:cssLoaders("sass-loader")
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
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions()
        }
      },
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-typescript")
        }
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions("@babel/preset-react")
        }
      }
    ]
  }
}