import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class WpPostsOfTags extends Component {
	static propTypes = {
		tagSlug: PropTypes.string,
		postsPerPage: PropTypes.number.isRequired
	};

	// constructor(props) {
	// 	super(props);

	//  console.log(this.props.postsPerPage);
	// }

	render() {
		return (
			<div>
				<pre>{JSON.stringify(this.props.postsPerPage, null, 2)}</pre>
				<pre>tag slug: {this.props.tagSlug}</pre>
				<pre>{JSON.stringify('test', null, 2)}</pre>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	postsPerPage: state.settings.postsPerPage
});

export default connect(mapStateToProps, null)(WpPostsOfTags);
