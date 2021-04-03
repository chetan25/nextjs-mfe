/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
// const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

// const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = {
    entry: { index: path.resolve(__dirname, "src", "index.tsx") },
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js",
        // publicPath: '/'
        publicPath: "http://localhost:6050/"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ]
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
            }
        ],
    },
    externals: {
        'react': 'react', // Case matters here 
        'react-dom' : 'reactDOM' // Case matters here 
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}' // required - same as command `eslint ./src/**/*.{ts,tsx,js,jsx} --ext .ts,.tsx,.js,.jsx`
            }
        }),
        new ModuleFederationPlugin({
            name: "app1",
            filename: "remoteApp1Entry.js",
            library: {
                type: 'var',
                name: "app1"
            },
            // The key name follow the ESM syntax inside Node 14
            exposes: {
                './MyApp': "./src/my-app"
            },
            // we need to make the shared React and React-dom registered as singleton and loaded from shell
            shared: [{ react: { singleton: true,  eager: true } }, { 'react-dom': { singleton: true,  eager: true } }],
        }),
        // new HtmlWebpackPlugin({
        //     title: "MyApp",
        //     inject: true,
        //     template: path.resolve(__dirname, "src", "index.html"),
        // }),
        // new CleanWebpackPlugin(),
        // new BundleAnalyzerPlugin()
    ],
    optimization: {
        usedExports: true,
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        alias: {
            react: path.resolve(__dirname, 'node_modules', 'react'),
            'react-dom': path.resolve(__dirname, 'node_modules', 'react-dom'),
        }
    },
    devServer: {
        contentBase: path.join(__dirname, "src"),
        headers: { "Access-Control-Allow-Origin": "*" },
        hot: true,
        port: 6050,
        open: true,
        inline: true,
        watchContentBase: true,
    },
};