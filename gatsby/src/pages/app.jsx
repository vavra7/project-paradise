import React from 'react';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';
import WpPostsOfTags from '../templates/WpPostsOfTags';
import PropTypes from 'prop-types';

export const query = graphql`
	query {
		wpSettings {
			tagBase
		}
	}
`;

function App(props) {
	const tagBase = props.data.wpSettings.tagBase;

	return (
		<div>
			{tagBase}
			<Router>
				<WpPostsOfTags path={`/app/${tagBase}`} />
			</Router>
		</div>
	);
}

App.propTypes = {
	data: PropTypes.object.isRequired
};

export default App;
