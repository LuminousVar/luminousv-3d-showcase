import { Clock, Raycaster, Vector2, Scene } from 'three';
import Time from './Utils/Time';
import Sizes from './Utils/Sizes';
import Resources from './Utils/Resources';
import Renderer from './Renderer';
import Camera from './Camera';
import World from './World';
import Navigation from './Navigation';
import assets from './assets';

export interface ExperienceConfig {
	width: number;
	height: number;
	pixelRatio: number;
	smallestSide: number;
	largestSide: number;
}

export interface ExperienceOptions {
	webglElement: HTMLElement;
	cssElement?: HTMLElement;
}

export default class Experience {
	private static instance: Experience | null = null;

	webglElement!: HTMLElement;
	cssElement!: HTMLElement | null;

	time!: Time;
	clock!: Clock;
	raycaster!: Raycaster;
	sizes!: Sizes;
	mouse!: Vector2;
	config!: ExperienceConfig;
	scene!: Scene;
	camera!: Camera;
	renderer!: Renderer;
	resources!: Resources;
	world!: World;
	navigation!: Navigation;

	constructor(options: ExperienceOptions) {
		if (Experience.instance) {
			return Experience.instance;
		}

		Experience.instance = this;

		this.webglElement = options.webglElement;
		this.cssElement = options.cssElement || null;

		if (!this.webglElement) {
			console.warn("Missing 'webglElement' property");
			return;
		}

		// Util
		this.time = new Time();
		this.clock = new Clock();
		this.raycaster = new Raycaster();
		this.sizes = new Sizes();
		this.mouse = new Vector2();

		// Setup
		this.config = this.createConfig();
		this.scene = new Scene();

		this.camera = new Camera(this);
		this.renderer = new Renderer(this);
		this.resources = new Resources(assets);
		this.resources.setRenderer(this.renderer.instance);
		this.world = new World(this);
		this.navigation = new Navigation(this);

		// Resize the event
		this.sizes.on('resize', () => {
			this.resize();
		});

		this.update();
	}

	private createConfig(): ExperienceConfig {
		const boundings = this.webglElement.getBoundingClientRect();
		return {
			width: boundings.width || window.innerWidth,
			height: boundings.height || window.innerHeight,
			pixelRatio: Math.min(Math.max(window.devicePixelRatio, 1), 2),
			smallestSide: Math.min(boundings.width, boundings.height),
			largestSide: Math.max(boundings.width, boundings.height)
		};
	}

	private update = (): void => {
		if (this.navigation) this.navigation.update();
		if (this.camera) this.camera.update();
		if (this.renderer) this.renderer.update();
		if (this.world) this.world.update();

		window.requestAnimationFrame(this.update);
	};

	private resize(): void {
		const boundings = this.webglElement.getBoundingClientRect();
		this.config.width = boundings.width || window.innerWidth;
		this.config.height = boundings.height || window.innerHeight;
		this.config.smallestSide = Math.min(this.config.width, this.config.height);
		this.config.largestSide = Math.max(this.config.width, this.config.height);
		this.config.pixelRatio = Math.min(Math.max(window.devicePixelRatio, 1), 2);

		if (this.camera) this.camera.resize();
		if (this.renderer) this.renderer.resize();
		if (this.world) this.world.resize();
	}

	destroy(): void {
		this.time.destroy();
		this.sizes.destroy();

		if (this.navigation) this.navigation.destroy();
		if (this.renderer) this.renderer.destroy();

		Experience.instance = null;
	}

	static getInstance(): Experience | null {
		return Experience.instance;
	}
}
