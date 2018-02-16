const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
    context: path.resolve(__dirname, 'src/client'),

    devtool: 'inline-source-map',

    entry: {
        hotLoader: 'react-hot-loader/patch',
        devServer: 'webpack-dev-server/client?http://localhost:8080',
        devServerOnly: 'webpack/hot/only-dev-server',
        app: './main.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, './build'),
        publicPath: ''
    },

    module: {
        rules: [
            /*{
                enforce: 'pre',
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },*/
            {
                test: /\.(js|jsx)/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['react', 'env']
                    }
                }
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                include: /src/,
                use: [
                    { loader: 'style-loader'},
                    { loader: 'css-loader'},
                    { loader: 'sass-loader'},
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(svg|png|tiff|woff|woff2|jpg)/,
                exclude: /node_modules/,
                include: /src/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[hash].[ext]'
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: (module, count) => {
                var context = module.context
                return context && context.indexOf('node_modules') >= 0
            }
        }),
        new HtmlWebpackPlugin({
            template: 'index.html'
        })
    ],
    devServer: {
        hot: true,
        contentBase: path.resolve(__dirname, 'build'),
        stats: 'errors-only',
        open: true,
        port: 12000,
        publicPath: '/'
    }
}

module.exports = config;
