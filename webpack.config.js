const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const HtmlCriticalWebpackPlugin = require("html-critical-webpack-plugin");
var ghpages = require('gh-pages');

ghpages.publish('dist', function(err) {});

module.exports = {
  mode: "production",

  entry: {
    index: "./src/index.js",

  },
  devServer: {
    contentBase: "./dist",
  },

  output: {
    filename: "js/[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new HtmlWebpackPlugin({
      template: "src/html/index.html",
    }),
    new HtmlWebpackPlugin({
      filename: 'punchline-punjabi.html',
      template: "src/html/punchline-punjabi.html"
    }),
    new HtmlWebpackPlugin({
      filename: 'britasiatv.html',
      template: "src/html/britasiatv.html"
    }),
    new HtmlWebpackPlugin({
      filename: 'portfolio-site.html',
      template: "src/html/portfolio-site.html"
    }),
    new HtmlWebpackPlugin({
      filename: 'pushproductpunjab.html',
      template: "src/html/pushproductpunjab.html"
    }),
    new HtmlWebpackPlugin({
      filename: 'bioprocessing-client.html',
      template: "src/html/bioprocessing-client.html"
    }),
    new HtmlWebpackPlugin({
      filename: 'affiliate-marketing-client.html',
      template: "src/html/affiliate-marketing-client.html"
    }),
    new HtmlWebpackPlugin({
      filename: 'somfy.html',
      template: "src/html/somfy.html"
    }),
    new HtmlWebpackPlugin({
      filename: 'autotechnik.html',
      template: "src/html/autotechnik.html"
    }),
    new CompressionPlugin(),
    new HtmlCriticalWebpackPlugin({
      base: path.resolve(__dirname, 'dist'),
      src: 'index.html',
      dest: 'index.html',
      inline: true,
      minify: true,
      extract: true,
      width: 375,
      height: 565,
      penthouse: {
        blockJSRequests: false,
      }
    })
  ],

  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.scss$/i,
        sideEffects: true,
        use: [ {
          loader: MiniCssExtractPlugin.loader,
          options: { //publicPath is needed otherwise Webpack will add '/css/' to font directory, causing 404.
           publicPath: '../../',
          },
         },"css-loader", "postcss-loader", "sass-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext][query]",
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: "asset/resource", // <-- Assets module - asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 1kb
          },
        },
        generator: {
          //If emitting file, the file path is
          filename: "./fonts/[name][hash][ext][query]",
        },
      },
    ],
  },
  optimization: {
    usedExports: true,
    moduleIds: 'deterministic',
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
    minimize: true,
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
      // `...`,
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
  
};
