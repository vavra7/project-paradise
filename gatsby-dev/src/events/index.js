const eventEmitter = {
	events: {},
	subscribe: (eventName, callback) => {
		if (!eventEmitter.events[eventName]) eventEmitter.events[eventName] = [];
		eventEmitter.events[eventName].push(callback);
	},
	emit: (eventName, data) => {
		if (!eventEmitter.events[eventName]) return;
		eventEmitter.events[eventName].forEach(callback => callback(data));
	}
};

export { eventEmitter };
