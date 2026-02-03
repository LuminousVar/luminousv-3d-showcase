type Callback = (...args: unknown[]) => void;

interface Events {
	[key: string]: Callback[];
}

export default class EventEmitter {
	private callbacks: Events = {};

	on(event: string, callback: Callback): this {
		if (!this.callbacks[event]) {
			this.callbacks[event] = [];
		}

		this.callbacks[event].push(callback);
		return this;
	}

	off(event: string, callback?: Callback): this {
		if (!this.callbacks[event]) return this;

		if (callback) {
			this.callbacks[event] = this.callbacks[event].filter((cb) => cb !== callback);
		} else {
			delete this.callbacks[event];
		}

		return this;
	}

	emit(event: string, ...args: unknown[]): this {
		if (!this.callbacks[event]) return this;

		this.callbacks[event].forEach((callback) => {
			callback(...args);
		});

		return this;
	}

	once(event: string, callback: Callback): this {
		const onceCallback = (...args: unknown[]) => {
			callback(...args);
			this.off(event, onceCallback);
		};

		this.on(event, onceCallback);
		return this;
	}
}
