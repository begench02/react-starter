import { Configuration } from 'webpack'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'

export const webpackCommon: Configuration = {
    entry: './src/main.tsx',
    target: 'web',
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[[name].[chunkhash].js]',
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: '../tsconfig.json',
                        },
                    },
                ],
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-modules-typescript-loader' },
                    { loader: 'css-loader', options: { modules: true } },
                    { loader: 'postcss-loader' },
                    { loader: 'sass-loader' },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: 'asset',
                generator: {
                    filename: 'assets/[hash][ext][query]',
                },
            },
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name].[chunkhash].css',
        }),
        new ForkTsCheckerWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, '../src/assets'),
                    to: path.resolve(__dirname, '../dist/assets'),
                    noErrorOnMissing: true,
                },
            ],
        }),
    ],
    resolve: {
        plugins: [new TsconfigPathsWebpackPlugin()],
        extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass'],
    },
    watchOptions: {
        ignored: /node_modules/,
    },
}
