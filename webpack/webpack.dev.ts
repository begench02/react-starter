import { Configuration as Config } from 'webpack'
import { Configuration as DevServerConfig } from 'webpack-dev-server'
import { merge } from 'webpack-merge'
import { webpackCommon } from './webpack.common'
import ReactRefreshTypescript from 'react-refresh-typescript'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'

const webpackDev: Config | DevServerConfig = merge(webpackCommon, {
	mode: 'development',
	devServer: {
		historyApiFallback: true,
		hot: true,
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
							getCustomTransformers: () => ({
								before: [ReactRefreshTypescript()],
							}),
						},
					},
				],
				exclude: /(node_modules|\.webpack)/,
			},
		],
	},
	plugins: [new ReactRefreshWebpackPlugin()],
})

export default webpackDev
