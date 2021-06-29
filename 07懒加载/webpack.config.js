const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    output: {
        filename: '[name].bundle.js',
        // chunkFilename 决定non-entry chunk(非入口chunk)的名称
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin()
    ],
    devServer:{
        contentBase:'./dist'
    }
}