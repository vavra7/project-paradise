const defaultConfig = require('./node_modules/@wordpress/scripts/config/webpack.config.js');
const path = require('path');
const postcssPresetEnv = require('postcss-preset-env');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const IgnoreEmitPlugin = require('ignore-emit-webpack-plugin');

const production = process.env.NODE_ENV === '';

module.exports = {
	...defaultConfig,
	entry: {
		index: path.resolve(process.cwd(), 'src', 'index.js'),
		admin: path.resolve(process.cwd(), 'src', 'admin.scss'),
		style: path.resolve(process.cwd(), 'src', 'style.scss')
	},
	optimization: {
		...defaultConfig.optimization,
		splitChunks: {
			cacheGroups: {
				admin: {
					name: 'admin',
					test: /admin\.(sc|sa|c)ss$/,
					chunks: 'all',
					enforce: true
				},
				style: {
					name: 'style',
					test: /style\.(sc|sa|c)ss$/,
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
		new IgnoreEmitPlugin(['admin.js', 'style.js'])
	]
};
