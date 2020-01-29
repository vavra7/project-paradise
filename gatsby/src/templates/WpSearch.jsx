import CommonLayout from '../components/layouts/CommonLayout';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

class WpSearch extends Component {
	static propTypes = {
		location: PropTypes.object
	};

	constructor(props) {
		super(props);

		this.state = {
			searchVal: this.getSearchVal(this.props.location.href)
		};
	}

	getSearchVal(href) {
		const url = new URL(href);

		return url.searchParams.get('search');
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location.href !== this.props.location.href) {
			this.setState({
				searchVal: this.getSearchVal(this.props.location.href)
			});
		}
	}

	render() {
		const { searchVal } = this.state;

		return (
			<CommonLayout title="search">
				<pre>{searchVal}</pre>
			</CommonLayout>
		);
	}
}

export default WpSearch;
