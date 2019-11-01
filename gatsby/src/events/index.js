const eventEmitter = {
	events: {},
	listen: (eventType, callback) => {
		if (!eventEmitter.events[eventType]) eventEmitter.events[eventType] = [];
		eventEmitter.events[eventType].push(callback);
	},
	emit: (eventType, data) => {
		if (!eventEmitter.events[eventType]) return;
		eventEmitter.events[eventType].forEach(callback => callback(data));
	}
};

export { eventEmitter as event };
