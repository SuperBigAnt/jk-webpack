const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/rong/',
        filename: '[hash].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            file: 'index.html',
            template: 'src/index.html'
        })
    ],
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