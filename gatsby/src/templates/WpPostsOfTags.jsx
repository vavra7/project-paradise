import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchData } from '../store/tags/actions';

class WpPostsOfTags extends Component {
	static propTypes = {
		tagSlug: PropTypes.string,
		postsPerPage: PropTypes.number.isRequired,
		fetchData: PropTypes.func
	};

	// constructor(props) {
	// 	super(props);

	//  console.log(this.props.postsPerPage);
	// }

	render() {
		return (
			<div>
				<button onClick={this.props.fetchData}>dispatch action</button>
				<pre>posts per page: {this.props.postsPerPage}</pre>
				<pre>slug: {this.props.tagSlug}</pre>
				<pre>props: {JSON.stringify(this.props, null, 2)}</pre>

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

const mapStateToProps = state => ({
	wpTags: state.wpTags
});

const mapDispatchToProps = {
	fetchData
};

export default connect(mapStateToProps, mapDispatchToProps)(WpPostsOfTags);
