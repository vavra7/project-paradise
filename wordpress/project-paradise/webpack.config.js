const defaultConfig = require('./node_modules/@wordpress/scripts/config/webpack.config.js');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

const production = process.env.NODE_ENV === '';

module.exports = {
	...defaultConfig,
	entry: {
		gutenberg: path.resolve(process.cwd(), 'src/scripts', 'gutenberg.js'),
		adminScript: path.resolve(process.cwd(), 'src/scripts', 'adminScript.js'),
		adminStyle: path.resolve(process.cwd(), 'src/styles', 'adminStyle.scss'),
		wpStyle: path.resolve(process.cwd(), 'src/styles', 'wpStyle.scss')
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			cacheGroups: {
				adminStyle: {
					name: 'adminStyle',
					test: /adminStyle\.(sc|sa|c)ss$/,
					chunks: 'all',
					enforce: true
				},
				wpStyle: {
					name: 'wpStyle',
					test: /wpStyle\.(sc|sa|c)ss$/,
					chunks: 'all',
					enforce: true
				},
				default: false
			}
		}
	},
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.(sc|sa|c)ss$/,
				exclude: /node_modules/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: !production
						}
					},
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: () => [
								postcssPresetEnv({
									stage: 3,
									features: {
										'custom-media-queries': {
											preserve: false
										},
										'custom-properties': {
											preserve: true
										},
										'nesting-rules': true
									}
								})
							]
						}
					},
					{
						loader: 'sass-loader',
						options: {
							sourceMap: !production
						}
					}
				]
			}
		]
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new IgnoreEmitPlugin(['adminStyle.js', 'wpStyle.js'])
	]
};
