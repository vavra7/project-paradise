module.exports = {
	siteMetadata: {
		name: 'Gatsby Project Paradise'
	},
	plugins: [
		{
			resolve: 'gatsby-plugin-sass'
		},
		{
			resolve: 'gatsby-plugin-sharp'
		},
		{
			resolve: 'gatsby-transformer-sharp',
			options: {
				stripMetadata: true
			}
		}
	]
};
