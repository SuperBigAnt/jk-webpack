const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './src/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/rong/',
        filename: '[name].[hash].js'
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
            minSize: 20000,
            maxSize: 40000,
            cacheGroups: {
                vendors: {
                    name: `chunk-vendors`,
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10,
                    chunks: 'all'
                },
            },
        },
    },
    // resolve: {
    //     alias: {
    //         Util: path.resolve(__dirname, 'src/util/'),
    //     }
    // },
    plugins: [
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: 'src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[contenthash].css",
            chunkFilename: "[id].css"
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(css|less|scss)$/,
                include: [path.resolve(__dirname, 'src')],
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    }
                }]
            }
        ]
    },
    devServer: {
        port: '8011',
        before(app) {
            app.get('api/test.json', (req, res) => {
                res.json({
                    code: '200',
                    result: 'hello world'
                })
            })
        }
    }
}