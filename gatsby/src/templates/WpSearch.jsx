import React, { Component } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import CommonLayout from '../components/layouts/CommonLayout';
import { connect } from 'react-redux';
import { getSearchResult } from '../store/wp/actions';
import PropTypes from 'prop-types';

export class WpSearch extends Component {
	static propTypes = {
		location: PropTypes.object,
		getSearchResult: PropTypes.func.isRequired,
		queriedData: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			searchVal: this.getSearchVal(this.props.location.href),
			page: this.getPage(this.props.location.href)
		};
	}

	fetchData() {
		const postsPerPage = this.props.queriedData.wpSettings.postsPerPage;
		const { searchVal, page } = this.state;

		this.props.getSearchResult({
			postsPerPage,
			page,
			searchVal
		});
	}

	getSearchVal(href) {
		const url = new URL(href);

		return url.searchParams.get('search');
	}

	getPage(href) {
		const url = new URL(href);
		const page = url.searchParams.get('page');

		return page ? page : 1;
	}

	componentDidUpdate(prevProps) {
		if (prevProps.location.href !== this.props.location.href) {
			this.setState({
				searchVal: this.getSearchVal(this.props.location.href),
				page: this.getPage(this.props.location.href)
			});
			this.fetchData();
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { searchVal } = this.state;

		return (
			<CommonLayout title={`search: ${searchVal}`}>
				<pre>{JSON.stringify(this.state, null, 2)}</pre>
			</CommonLayout>
		);
	}
}

const WpSearchWrapper = props => {
	const { location, getSearchResult } = props;
	const queriedData = useStaticQuery(
		graphql`
			query {
				wpSettings {
					postsPerPage
				}
			}
		`
	);

	return <WpSearch queriedData={queriedData} location={location} getSearchResult={getSearchResult} />;
};

WpSearchWrapper.propTypes = {
	location: PropTypes.object,
	getSearchResult: PropTypes.func.isRequired
};

const mapDispatchToProps = {
	getSearchResult
};

export default connect(null, mapDispatchToProps)(WpSearchWrapper);
