const path = require('path')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

const isProduction = process.env.NODE_ENV === 'prod' || process.env.NODE_ENV === 'production'

const config = {
    entry: {
        main: path.resolve(__dirname, 'index.js')
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        // publicPath: '/static/'
    },
    mode: isProduction ? 'production' : 'development',
    module: {
        rules: [
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: {
                    loader: 'url-loader',
                    options: {
                        fallback: 'file-loader',
                        limit: 8192,
                        name(file) {
                            if (isProduction) {
                                return '[path][name].[ext]'
                            }
                            return '[hash].[ext]'
                        },
                        outputPath: 'images'
                    }
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        babelrc: true,
                        cacheDirectory: true, // default: node_modules/.cache/babel-loader (x2 faster!)
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    isProduction 
                        ? MiniCssExtractPlugin.loader
                        : { 
                            loader: 'style-loader/url',
                            options: {
                                convertToAbsoluteUrls: true
                            } 
                        },
                    { 
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            camelCase: true
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: path.join(__dirname, 'index.html') }),
        new MiniCssExtractPlugin({
            filename: isProduction ? '[name].[hash].css' : '[name].css',
            chunkFilename: isProduction ? '[id].[hash].css' : ''
        })
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css']
    },
    devtool: isProduction ? 'eval-source-map' : 'source-map',
    watch: isProduction ? false : true,
    devServer: {
        compress: true,
        host: '0.0.0.0',
        hot: true,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        port: 9000,
        inline: true
        // publicPath: '/static/'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        },
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: true
            }),
            new OptimizeCSSAssetsPlugin({})
        ]
    }
}

if (isProduction) {
    config.plugins.push(new CompressionPlugin({
        cache: true
    }))
} else {
    config.plugins.push(new webpack.HotModuleReplacementPlugin())
    config.plugins.push(new CleanWebpackPlugin(['dist']))
    config.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = config