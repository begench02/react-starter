import { Configuration } from 'webpack'
import { merge } from 'webpack-merge'
import { webpackCommon } from './webpack.common'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin'

const webpackProd: Configuration = merge(webpackCommon, {
    mode: 'production',
    stats: 'errors-warnings',
    performance: {
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ['gifsicle', { interlaced: true }],
                            ['jpegtran', { progressive: true }],
                            ['optipng', { optimizationLevel: 5 }],
                            [
                                'svgo',
                                {
                                    plugins: [
                                        {
                                            name: 'removeViewBox',
                                            active: false,
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
        runtimeChunk: true,
    },
})

export default webpackProd
