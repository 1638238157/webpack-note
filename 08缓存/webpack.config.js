const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
    },
    output: {
        //[contenthash] 将根据资源内容创建出唯一hash。当资源内容发生变化时，[contenthash]也会发生变化。
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins:[
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin(),
        new webpack.HashedModuleIdsPlugin()
    ],
    optimization:{
        runtimeChunk: 'single',
        splitChunks:{
            cacheGroups:{
                vendor:{
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    devServer:{
        contentBase:'./dist'
    }
}