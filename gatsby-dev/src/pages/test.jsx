import React from 'react';
import { useSelector } from 'react-redux';
import { eventEmitter } from '../events';
import { EVENTS } from '../events/types';

const Test = () => {
	const app = useSelector(state => state.app);

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
				<button
					style={{ height: 100, width: 200 }}
					onClick={() => eventEmitter.emit(EVENTS.FIXED_MENUS.RIGHT_BAR_TOGGLE)}
				>
					test
				</button>
			</div>
		</div>
	);
};

export default Test;
