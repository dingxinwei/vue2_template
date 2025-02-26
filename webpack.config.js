const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ESLintPlugin = require('eslint-webpack-plugin')
const VersionPlugin = require('./plugins/VersionPlugin')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const isProd = process.env.NODE_ENV === 'production'
console.log(isProd)
module.exports = {
  mode: isProd ? 'production' : 'development',
  devtool: 'inline-source-map',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
    chunkFilename: 'js/[name].[contenthash].chunk.js', // 非入口 chunk 的命名规则
    clean: true,
    publicPath: '/'
  },
  experiments: {
    lazyCompilation: false
  },
  optimization: {
    minimize: isProd,
    runtimeChunk: 'single',
    minimizer: [
      new TerserPlugin({
        parallel: true,
        extractComments: false
      }),
      new CssMinimizerPlugin()
    ],
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public')
    },
    hot: true,
    compress: true,
    port: 8080,
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          isProd ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', 'autoprefixer']]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
            options: { injectType: 'styleTag' }
          },
          {
            loader: 'css-loader',
            options: {
              modules: {
                namedExport: true
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [['postcss-preset-env', 'autoprefixer']]
              }
            }
          }
        ]
      },
      {
        test: /\.(js|ts|jsx|tsx|vue)$/i,
        exclude: /node_modules/,
        use: [
          {
            loader: path.resolve(__dirname, './loader/no-console-loader.js'),
            options: {
              customOptions: {
                foo: 'bar',
                baz: 42
              }
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[hash][ext][query]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    ...(isProd
      ? [
          new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css'
          }),
          new CompressionPlugin({
            filename: '[path][base].gz',
            algorithm: 'gzip',
            test: /\.(js|css|html|svg)$/,
            threshold: 10240,
            minRatio: 0.8,
            compressionOptions: { level: 9 } // 最高压缩级别
          })
        ]
      : [
          new BundleAnalyzerPlugin({
            analyzerMode: 'server', // 启动本地服务器展示报告
            analyzerHost: '127.0.0.1',
            analyzerPort: 8888, // 自定义端口
            openAnalyzer: true, // 构建完成后自动打开浏览器
            reportFilename: 'report.html', // 生成静态报告文件
            generateStatsFile: true, // 生成 stats.json
            statsOptions: {
              excludeModules: /node_modules\/lodash/ // 排除指定模块
            }
          })
        ]),
    new ESLintPlugin({
      extensions: ['js', 'vue', 'jsx'],
      fix: true, // 自动修复
      emitWarning: process.env.NODE_ENV !== 'production'
    }),
    new VersionPlugin({ filename: 'version-1.txt' }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public/static'),
          to: path.resolve(__dirname, 'dist/static'),
          toType: 'dir',
          noErrorOnMissing: false,
          globOptions: {
            ignore: ['index.html']
          },
          info: {
            minimized: true
          }
        }
      ]
    })
  ],
  externals: {
    vue: 'Vue',
    'vue-router': 'VueRouter'
    // 'vuex': 'Vuex',
    // 'axios': 'axios',
  }
}
