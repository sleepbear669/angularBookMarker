const path = require('path');

// Webpack and its plugins
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const CompressionPlugin = require('compression-webpack-plugin');
const ContextReplacementPlugin = require('webpack/lib/ContextReplacementPlugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const DedupePlugin = require('webpack/lib/optimize/DedupePlugin');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const OccurrenceOrderPlugin = require('webpack/lib/optimize/OccurrenceOrderPlugin');
const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

var ExtractTextPlugin = require("extract-text-webpack-plugin");
let extractCSS = new ExtractTextPlugin('[name].css');

const ENV = process.env.NODE_ENV = 'production';
const metadata = {
    env: ENV
};

module.exports = {
    devtool: 'source-map',
    entry: {
        'main': './src/main.ts'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'to-string-loader!css-loader', exclude: /node_modules/}, // Inline CSS into components
            {test: /\.css$/, loader: 'style-loader!css-loader', exclude: /src/}, // Add CSS as style tag to index.html
            {test: /\.html$/, loader: 'html-loader?caseSensitive=true'},
            {
                test: /\.scss$/,
                loader: extractCSS.extract(['css-loader', 'sass-loader'])
            },
            {
                test: /\.ts$/, loaders: [
                {loader: 'ts-loader', query: {compilerOptions: {noEmit: false}}},
                {loader: 'angular2-template-loader'}
            ]
            }
        ]
    },
    output: {
        path: './dist',
        filename: 'bundle.js'
    },
    plugins: [
        new CompressionPlugin({regExp: /\.css$|\.html$|\.js$|\.map$/}),
        new ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)src|src)(\\|\/)linker/,
            path.join(__dirname, 'src') // location of your src
        ),
        new DefinePlugin({'webpack': {'ENV': JSON.stringify(metadata.env)}}),
        new OccurrenceOrderPlugin(true),
        new UglifyJsPlugin({
            compress: {screw_ie8: true},
            mangle: {screw_ie8: true}
        }),
        extractCSS
    ],
    resolve: {
        extensions: ['.ts', '.js']
        // ,mainFields: ["module", "main", "browser"] // may be needed for tree shaking when implemented
    }
};