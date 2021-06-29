const path = require('path');
module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.js',
        // another: './src/another-module.js'
    },
    output: {
        filename: '[name].bundle.js',
        // chunkFilename 决定non-entry chunk(非入口chunk)的名称
        chunkFilename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // optimization: {
    //     splitChunks:{
    //         chunks: 'all'
    //     }
    // }
}