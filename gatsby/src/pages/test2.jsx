import React, { Component } from 'react';
import { connect } from 'react-redux';
import { appWidthHeight } from '../actions/appRootActions';
import DesktopTopMenu from '../components/menus/DesktopTopMenu';

class test2 extends Component {
	static propTypes = {};

	componentDidMount() {
		// this.props.appWidth(12);
	}

	render() {
		return (
			<div>
				<div className="pa-3">
					<h1 className="title-3">Test 2</h1>
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia incidunt fugiat fugit. Eos dolorem quas
						aliquam consequatur, itaque vel? Repudiandae odio aspernatur dolorem, illo non magnam dolore accusamus
						dolor, nisi, aperiam architecto qui quisquam corporis sapiente. Provident, asperiores? Doloremque
						perferendis neque omnis tenetur commodi! Ex quidem dolores hic fugiat optio?
					</p>
				</div>
				<div>
					<DesktopTopMenu></DesktopTopMenu>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	width: state.app.width
});

const mapDispatchToProps = {
	appWidthHeight
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(test2);
