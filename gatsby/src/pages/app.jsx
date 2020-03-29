import React from 'react';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';
import WpPostsOfTag from '../templates/WpPostsOfTag';
import WpSearch from '../templates/WpSearch';
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
		<Router>
			<WpPostsOfTag path={`/app/${tagBase}/:tagSlug`} />
			<WpPostsOfTag path={`/app/${tagBase}/:tagSlug/page/:page`} />
			<WpSearch path="/app/search" />
		</Router>
	);
}

App.propTypes = {
	data: PropTypes.object.isRequired
};

export default App;
