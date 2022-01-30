import path from 'path';
import {Configuration, DefinePlugin} from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import dotenv from 'dotenv'

const webpackConfig = (): Configuration => ({
    entry: './src/index.tsx',
    ...(process.env.production || !process.env.development
        ? {}
        : {devtool: 'eval-source-map'}),

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        plugins: [new TsconfigPathsPlugin({configFile: './tsconfig.json'})],
    },
    output: {
        path: path.join(__dirname, '/build'),
        filename: '[name].[contenthash].js',
    },
    optimization: {
        moduleIds: 'deterministic',
        runtimeChunk: 'single',
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                },
                exclude: /node_modules/,
            },
            {
                test: /\.(sass|scss|css)$/,
                use: [
                    'style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            importLoaders: 1,
                            modules: false,
                        },
                    },
                    {loader: 'postcss-loader', options: {sourceMap: true}},
                    {loader: 'sass-loader', options: {sourceMap: true}},
                ],
            },
            {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},
        ],
    },
    devServer: {
        port: 3000,
        open: true,
        historyApiFallback: true,
        compress: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            favicon: './public/favicon.ico',
        }),
        new DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed),
            'process.env.REACT_APP_API_URL': JSON.stringify(process.env.REACT_APP_API_URL),
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
            'process.env.PAPERTRAIL_API_TOKEN': JSON.stringify(process.env.PAPERTRAIL_API_TOKEN),
        }),
        new ForkTsCheckerWebpackPlugin({
            eslint: {
                files: './src/**/*.{ts,tsx,js,jsx}',
            },
        }),
    ],
});

export default webpackConfig;
