const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const ENV = process.env.NODE_ENV = 'development';
const PORT = process.env.PORT || 8080;
const metadata = {env: ENV, port: PORT};

let extractCSS = new ExtractTextPlugin('[name].css');

module.exports = {
    devServer: {contentBase: 'src', port: metadata.port},
    devtool: 'source-map',
    entry: {'main': './src/main.ts'},
    module: {
        loaders: [
            {
                test: /\.css$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style!css?-minimize',

                exclude: /src/
            },
            {
                test: /\.scss$/,
                loader: extractCSS.extract(['css-loader','sass-loader'])
            },
            {test: /\.html$/, loader: 'raw-loader'}, {
                test: /\.ts$/,
                loaders: [{
                    loader: 'ts-loader',
                    query: {compilerOptions: {noEmit: false}}
                }, {loader: 'angular2-template-loader'}]
            }
        ]
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    plugins: [
        new DefinePlugin({'webpack': {'ENV': JSON.stringify(metadata.env)}}),
        extractCSS
    ],
    resolve: {extensions: ['.ts', '.js']}
};
