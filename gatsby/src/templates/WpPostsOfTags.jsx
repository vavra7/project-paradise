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
				<pre>posts per page: {this.props.postsPerPage}</pre>
				<pre>slug: {this.props.tagSlug}</pre>
				<div
					style={{
						width: '100px',
						height: '100px',
						background: 'red'
					}}
				>
					test
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({});

export default connect(mapStateToProps, null)(WpPostsOfTags);
