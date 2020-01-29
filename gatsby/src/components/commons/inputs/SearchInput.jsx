import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';

class SearchInput extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchVal: '',
			url: '/app/search'
		};

		this.handleKeyDown = this.handleKeyDown.bind(this);
	}

	searchValChange(searchVal) {
		this.setState({
			searchVal,
			url: `/app/search?search=${encodeURIComponent(searchVal)}`
		});
	}

	handleKeyDown(e) {
		if (e.key === 'Enter' && this.state.searchVal) {
			navigate(this.state.url);
		}
	}

	componentDidMount() {
		const url = new URL(window.location.href);
		const searchVal = url.searchParams.get('search');

		if (searchVal) this.searchValChange(searchVal);
	}

	render() {
		const { searchVal, url } = this.state;
		let link;
		const button = <button>search</button>;

		if (searchVal) {
			link = <Link to={url}>{button}</Link>;
		} else {
			link = button;
		}

		return (
			<>
				<input
					type="text"
					value={searchVal}
					onChange={e => this.searchValChange(e.target.value)}
					onKeyDown={this.handleKeyDown}
				/>
				{link}
			</>
		);
	}
}

export default SearchInput;
