import EventEmitter from './EventEmitter';

export default class Time extends EventEmitter {
	start: number;
	current: number;
	elapsed: number;
	delta: number;
	private animationId: number | null = null;

	constructor() {
		super();
		this.start = Date.now();
		this.current = this.start;
		this.elapsed = 0;
		this.delta = 16;

		this.tick();
	}

	tick = (): void => {
		const currentTime = Date.now();
		this.delta = currentTime - this.current;
		this.current = currentTime;
		this.elapsed = this.current - this.start;

		this.emit('tick');

		this.animationId = window.requestAnimationFrame(this.tick);
	};

	destroy(): void {
		if (this.animationId !== null) {
			window.cancelAnimationFrame(this.animationId);
		}
	}
}
