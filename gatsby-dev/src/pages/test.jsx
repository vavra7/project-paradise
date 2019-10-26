import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appWidthHeight } from '../actions/appRootActions';

const Test = () => {
	const app = useSelector(state => state.app);
	const dispatch = useDispatch();

	return (
		<div>
			<div className="pa-3">
				<h1 className="title-3">Test</h1>
				<p>
					Lorem ipsum dolor sit, amet consectetur adipisicing elit. Qui labore, nobis asperiores nulla maxime ut
					adipisci, facere aspernatur libero eius iste dicta alias quibusdam eveniet maiores perferendis laudantium
					voluptatem laboriosam, culpa molestias aliquid iusto ipsam. Voluptatem natus debitis aliquid a.
				</p>
			</div>

			<pre>{JSON.stringify(app, null, 2)}</pre>

			<div>
				<button onClick={() => dispatch(appWidthHeight(654))}>dispatch</button>
			</div>
		</div>
	);
};

export default Test;
