const webpack = require("webpack");
const path=require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin=require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const OpenBrowserPlugin = require("open-browser-webpack-plugin");

// *****************************************************************************
// init plugins start
const extractCSS = new ExtractTextPlugin('styles/[name]-one.css');
const extractLESS = new ExtractTextPlugin('styles/[name]-two.css');
const cleanPlugin = new CleanWebpackPlugin(['dist'], {
    verbose: true, 
    dry: false
});
const uglifyPlugin = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
});
const commonChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
    name:'inline',
    filename:'inline.js',
    minChunks:Infinity
});
const htmlPlugin = new HtmlWebpackPlugin({template:'./src/index.html'})

const optimizeCssPlugin = new OptimizeCssAssetsPlugin({
    assetNameRegExp: /\.css$/,
    cssProcessorOptions: { discardComments: { removeAll: true } }
});

const openBrowserPlungin = new OpenBrowserPlugin({ url: 'http://localhost:8080' });
// *****************************************************************************
// init plugins end

module.exports = {
    entry: "./src/js/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: "babel-loader",
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "less-loader"]
                })
            }
        ]
    },
    plugins: [
        cleanPlugin,
        commonChunkPlugin,
        htmlPlugin,
        extractCSS, 
        extractLESS,
        optimizeCssPlugin,
        uglifyPlugin,
        openBrowserPlungin
    ]
}