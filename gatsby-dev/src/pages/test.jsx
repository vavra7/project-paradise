import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { appWidth } from '../actions/appRootActions';

const Test = () => {
	const width = useSelector(state => state.app.width);
	const dispatch = useDispatch();

	typeof document !== 'undefined' && document.addEventListener('click', e => dispatch(appWidth(e.screenX)));

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

			<div>width: {width}</div>

			<div>
				{/* <button onClick={() => console.log(appWidth())}>console.log</button> */}
				<button onClick={() => dispatch(appWidth(654))}>dispatch</button>
			</div>
		</div>
	);
};

export default Test;
