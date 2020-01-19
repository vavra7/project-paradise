import React from 'react';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';
import WpPostsOfTags from '../templates/WpPostsOfTags';
import PropTypes from 'prop-types';

export const query = graphql`
	query {
		wpSettings {
			siteTitle
		}
	}
`;

function App(props) {
	const title = props.data.wpSettings.siteTitle;

	return (
		<div>
			{title}
			<Router>
				<WpPostsOfTags path={`/app/${title}`} />
			</Router>
		</div>
	);
}

App.propTypes = {
	data: PropTypes.object.isRequired
};

export default App;
