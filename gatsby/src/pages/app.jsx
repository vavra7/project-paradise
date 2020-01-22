import React from 'react';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';
import WpPostsOfTags from '../templates/WpPostsOfTags';
import PropTypes from 'prop-types';
import Test from '../templates/Test';

export const query = graphql`
	query {
		wpSettings {
			tagBase
			postsPerPage
		}
	}
`;

function App(props) {
	const tagBase = props.data.wpSettings.tagBase;
	const postsPerPage = props.data.wpSettings.postsPerPage;

	return (
		<div>
			<pre>{JSON.stringify(props.data, null, 2)}</pre>
			<Router>
				<WpPostsOfTags postsPerPage={postsPerPage} path={`/app/${tagBase}/:tagSlug`} />
				<Test path="/app/test" />
			</Router>
		</div>
	);
}

App.propTypes = {
	data: PropTypes.object.isRequired
};

export default App;
