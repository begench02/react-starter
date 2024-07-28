import { Configuration } from 'webpack'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import path from 'path'
import TsconfigPathsWebpackPlugin from 'tsconfig-paths-webpack-plugin'

export const webpackCommon: Configuration = {
	entry: ['./src/main.tsx'],
	output: {
		clean: true,
		filename: 'js/[name].[chunkhash].js',
		chunkFilename: 'js/[name].[chunkhash].chunk.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test: /\.[tj]sx?$/,
				use: [
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true,
						},
					},
				],
				exclude: /(node_modules|\.webpack)/,
			},
			{
				test: /\.css$/,
				use: [{ loader: MiniCssExtractPlugin.loader }, { loader: 'css-loader' }],
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					{ loader: MiniCssExtractPlugin.loader },
					{ loader: 'css-modules-typescript-loader' },
					{ loader: 'css-loader' },
					{ loader: 'postcss-loader' },
					{
						loader: 'sass-loader',
						options: {
							sassOptions: {
								includePaths: [path.resolve(__dirname, 'src/styles')],
							},
						},
					},
				],
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/i,
				type: 'asset/resource',
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: '@svgr/webpack',
						options: {
							icon: true,
							svgrConfig: {
								plugins: [
									{
										name: 'convertColors',
										params: {
											currentColor: true,
										},
									},
								],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new ForkTsCheckerWebpackPlugin(),
		new HtmlWebpackPlugin({
			template: 'index.html',
			inject: true,
		}),
		new MiniCssExtractPlugin({
			filename: 'css/[name].[contenthash:8].css',
			chunkFilename: 'css/[name].[contenthash:8].chunk.css',
		}),
	],
	resolve: {
		plugins: [new TsconfigPathsWebpackPlugin()],
		extensions: ['.js', '.ts', '.jsx', '.tsx', '.css', '.scss', '.sass'],
	},
	optimization: {
		minimize: true,
		sideEffects: true,
		concatenateModules: true,
		runtimeChunk: 'single',
		splitChunks: {
			chunks: 'all',
			maxInitialRequests: 10,
			minSize: 0,
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /[\\/]node_modules[\\/]/,
					chunks: 'all',
				},
			},
		},
	},
}
