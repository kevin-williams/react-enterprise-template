const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const webpack = require('webpack');

const ExtractNormalCSS = new ExtractTextPlugin("base.css");

module.exports = {
    entry: [
        'babel-polyfill',
        './src/index.js',
        './src/styles/base.scss',
    ],
    devtool: 'cheap-module-source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    devServer: {
        inline: true,
        port: 4000
    },
    resolve: {
        modules: [
            path.resolve('./src'),
            "node_modules"
        ],
        extensions: ['*', '.js', '.jsx', '.css', '.scss']
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/i,
               use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: [ 'css-loader' ] })
            },
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),
        new webpack.optimize.UglifyJsPlugin({
            mangle: true,
            compress: {
                warnings: false, // Suppress uglification warnings
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false,
            },
            exclude: [/\.min\.js$/gi] // skip pre-minified libs
        }),

        ExtractNormalCSS,
    ]
}