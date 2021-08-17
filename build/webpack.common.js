const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { VueLoaderPlugin } = require('vue-loader')
// const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  target: ['web', 'es5'],
  mode: 'production',
  entry: './packages/index.js',
  output: {
    path: resolve(__dirname, '../lib'),
    filename: 'dd-editor-common.js',
    // library: "dd-editor-vue",
    // libraryExport: 'default',
    // libraryTarget: 'commonjs2',
    // libraryTarget: "umd", // 通用模块定义
    library: {
      // note there's no `name` here
      // name: 'dd-editor-vue',
      type: 'commonjs2',
    },
    // umdNamedDefine: true,
    // libraryTarget: 'umd',
    // library: 'dd-editor-vue',
    // umdNamedDefine: true,
    // globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: process.cwd(),
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@vue/babel-preset-jsx'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
      {
        test: /\.vue$/,
        use: ['vue-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1 // 在之前有1个loader即postcss-loader
                }
            },
            {
                loader: 'postcss-loader',
                options: {
                    postcssOptions: {
                        plugins: [
                            ["autoprefixer"]
                        ]
                    }
                }
            }
        ],
      },
      {
        test: /\.scss$/,
        use: [
            MiniCssExtractPlugin.loader,
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 2 // 在之前有2个loader即postcss-loader和sass-loader
                }
            },
            {
                loader: 'postcss-loader', // 有两个作用：第一个就是把 CSS 解析成 JavaScript 可以操作的 AST，第二个就是调用插件来处理 AST 并得到结果。
                options: {
                    postcssOptions: {
                        plugins: [
                            ["autoprefixer"] // 自动添加样式前缀
                        ]
                    }
                }
            },
          'sass-loader',
        ],
      },
      // https://webpack.js.org/guides/asset-management/#loading-images
      // https://www.jianshu.com/p/36e972b19b2
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        //解析
        parser: {
          //转base64的条件
          dataUrlCondition: {
            maxSize: 25 * 1024, // 25kb
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
      }
    ],
  },
  plugins: [
    // new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name][contenthash:8].css',
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': '../src',
    },
  },
}
