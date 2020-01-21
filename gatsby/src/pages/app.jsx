import React, { useState, useEffect } from 'react';
import { graphql } from 'gatsby';
import { Router } from '@reach/router';
import WpPostsOfTags from '../templates/WpPostsOfTags';
import PropTypes from 'prop-types';
// import { useSelector, useDispatch } from 'react-redux';
// import { setPostsPerPage } from '../actions/settingsActions';
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
	// const [upToDateSettings, updateSettingsState] = useState(false);
	// const dispatch = useDispatch();
	// const postsPerPage = props.data.wpSettings.postsPerPage;
	// const defaultPostsPerPage = useSelector(state => state.settings.postsPerPage);
	const tagBase = props.data.wpSettings.tagBase;
	const postsPerPage = props.data.wpSettings.postsPerPage;

	// useEffect(() => {
	// 	if (postsPerPage !== defaultPostsPerPage) {
	// 		dispatch(setPostsPerPage(postsPerPage));
	// 	}
	// 	updateSettingsState(true);
	// }, [defaultPostsPerPage, dispatch, postsPerPage]);

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
