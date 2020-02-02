module.exports = {
	siteMetadata: {
		name: 'Gatsby Project Paradise'
	},
	plugins: [
		'gatsby-plugin-sass',
		'gatsby-plugin-sharp',
		'gatsby-plugin-react-helmet',
		{
			resolve: 'gatsby-plugin-eslint',
			options: {
				test: /\.js$|\.jsx$/,
				exclude: /(node_modules|.cache|public)/,
				stages: ['develop'],
				options: {
					emitWarning: true,
					failOnError: false
				}
			}
		},
		{
			resolve: 'gatsby-transformer-sharp',
			options: {
				stripMetadata: true
			}
		}
	]
};
