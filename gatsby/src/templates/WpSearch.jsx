import React, { Component } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import { connect } from 'react-redux';
import { getSearchResult } from '../store/wp/actions';
import { getState } from '../store/requests/selectors';
import PropTypes from 'prop-types';
import { WP } from '../store/wp/types';

import CommonLayout from '../components/layouts/CommonLayout';
import BreadCrumbsContainer from '../components/header/BreadCrumbsContainer';
import CommonPagination from '../components/commons/pagination/CommonPagination';
import PageMeta from '../components/commons/meta/PageMeta';

const REQUEST_ID = WP.GET_SEARCH_RESULT;

export class WpSearch extends Component {
	static propTypes = {
		location: PropTypes.object,
		getSearchResult: PropTypes.func.isRequired,
		data: PropTypes.object.isRequired,
		stateResult: PropTypes.object.isRequired,
		result: PropTypes.array.isRequired,
		pagination: PropTypes.object.isRequired
	};

	constructor(props) {
		super(props);

		this.state = {
			searchVal: this.getSearchVal(this.props.location.href),
			page: this.getPage(this.props.location.href)
		};
	}

	fetchData() {
		const postsPerPage = this.props.data.wpSettings.postsPerPage;
		const { searchVal, page } = this.state;

		this.props.getSearchResult({
			postsPerPage,
			page,
			searchVal,
			href: this.props.location.href
		});
	}

	getSearchVal(href) {
		const url = new URL(href);

		return url.searchParams.get('search');
	}

	getPage(href) {
		const url = new URL(href);
		const page = url.searchParams.get('page');

		return page ? parseInt(page) : 1;
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.location.href !== this.props.location.href) {
			this.setState({
				searchVal: this.getSearchVal(this.props.location.href),
				page: this.getPage(this.props.location.href)
			});
		}

		if (prevState.searchVal !== this.state.searchVal) {
			this.fetchData();
		} else if (prevState.page !== this.state.page) {
			this.fetchData();
		}
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		const { searchVal, page } = this.state;
		const { stateResult, result, pagination } = this.props;
		const title = `Hledat: ${searchVal}`;
		const level2 = { title: 'Hledat' };

		return (
			<>
				<PageMeta meta={{ title }} />

				<CommonLayout
					title={`Hledat: ${searchVal}`} //
					breadCrumbsSlot={<BreadCrumbsContainer current={searchVal} level2={level2} />}
				>
					<pre>{JSON.stringify(stateResult, null, 2)}</pre>
					<pre>{JSON.stringify(this.state, null, 2)}</pre>
					<pre>{JSON.stringify(result, null, 2)}</pre>
					<pre>{JSON.stringify(pagination, null, 2)}</pre>
					<CommonPagination pagination={pagination} currentPage={page} />
				</CommonLayout>
			</>
		);
	}
}

const WpSearchWrapper = props => {
	const { location, getSearchResult, stateResult, result, pagination } = props;
	const data = useStaticQuery(
		graphql`
			query {
				wpSettings {
					postsPerPage
				}
			}
		`
	);

	return (
		<WpSearch
			data={data}
			location={location}
			getSearchResult={getSearchResult}
			stateResult={stateResult}
			result={result}
			pagination={pagination}
		/>
	);
};

WpSearchWrapper.propTypes = {
	location: PropTypes.object,
	getSearchResult: PropTypes.func.isRequired,
	stateResult: PropTypes.object.isRequired,
	result: PropTypes.array.isRequired,
	pagination: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	stateResult: getState(state, REQUEST_ID),
	result: state.wp.searchResult.data,
	pagination: state.wp.searchResult.pagination
});

const mapDispatchToProps = {
	getSearchResult
};

export default connect(mapStateToProps, mapDispatchToProps)(WpSearchWrapper);
