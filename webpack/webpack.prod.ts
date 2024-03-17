import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { webpackCommon } from './webpack.common'

const webpackProd: Configuration = merge(webpackCommon, {
	mode: 'production',
	stats: 'errors-warnings',
	devtool: 'source-map',
	performance: {
		maxEntrypointSize: 512000,
		maxAssetSize: 512000,
	},
})

export default webpackProd
