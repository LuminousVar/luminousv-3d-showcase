import { Vector2, Mesh, PlaneGeometry, MeshLambertMaterial, NoBlending } from 'three';
import type { Object3D, Mesh as MeshType } from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import type Experience from './Experience';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
	RIGHT_MONITOR_SCREEN_WIDTH,
	RIGHT_MONITOR_SCREEN_HEIGHT,
	RIGHT_MONITOR_CSS_OBJECT_SCALE,
	RIGHT_MONITOR_CSS_OBJECT_POSITION,
	RIGHT_MONITOR_CSS_OBJECT_ROTATION_Y,
	RIGHT_MONITOR_IFRAME_SRC,
	MONITOR_IFRAME_PADDING
} from './constants';

export default class rightMonitorScreen {
	private experience: Experience;
	private screenSize: Vector2;
	private container: HTMLDivElement | null = null;
	private iframe: HTMLIFrameElement | null = null;
	isActive = false;

	constructor(experience: Experience) {
		this.experience = experience;
		this.screenSize = new Vector2(RIGHT_MONITOR_SCREEN_WIDTH, RIGHT_MONITOR_SCREEN_HEIGHT);

		this.setModel();
		this.setMonitorScreen();
	}

	private setModel(): void {
		const resources = this.experience.resources;
		const rightMonitor = resources.items.rightMonitor as GLTF;

		if (rightMonitor?.scene) {
			rightMonitor.scene.name = 'rightMonitor';
			const material = this.experience.world?.baked?.model.material2;

			if (material) {
				rightMonitor.scene.traverse((child: Object3D) => {
					if ((child as MeshType).isMesh) {
						(child as MeshType).material = material;
					}
				});
			}

			this.experience.scene.add(rightMonitor.scene);
		}
	}

	// Method setMonitor Screen
	private setMonitorScreen(): void {
		this.container = document.createElement('div');
		this.container.style.width = this.screenSize.x + 'px';
		this.container.style.height = this.screenSize.y + 'px';
		this.container.style.pointerEvents = 'none';

		this.iframe = document.createElement('iframe');
		this.iframe.src = RIGHT_MONITOR_IFRAME_SRC;
		this.iframe.style.width = this.screenSize.x + 'px';
		this.iframe.style.height = this.screenSize.y + 'px';
		this.iframe.style.padding = MONITOR_IFRAME_PADDING;
		this.iframe.style.boxSizing = 'border-box';
		this.iframe.style.background = 'black';
		this.iframe.style.border = 'none';
		this.iframe.style.pointerEvents = 'none';
		this.iframe.id = 'right-monitor-screen';

		// Youtube iframe attributes
		this.iframe.setAttribute(
			'allow',
			'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
		);
		this.iframe.setAttribute('allowfullscreen', 'true');
		this.container.appendChild(this.iframe);

		const css3DObject = new CSS3DObject(this.container);
		css3DObject.position.copy(RIGHT_MONITOR_CSS_OBJECT_POSITION);
		css3DObject.scale.copy(RIGHT_MONITOR_CSS_OBJECT_SCALE);
		css3DObject.rotation.y = RIGHT_MONITOR_CSS_OBJECT_ROTATION_Y;

		this.experience.scene.add(css3DObject);

		const material = new MeshLambertMaterial({
			color: 'black',
			opacity: 0,
			transparent: true,
			blending: NoBlending
		});

		const geometry = new PlaneGeometry(this.screenSize.x, this.screenSize.y);
		const screen = new Mesh(geometry, material);

		screen.position.copy(css3DObject.position);
		screen.rotation.copy(css3DObject.rotation);
		screen.scale.copy(css3DObject.scale);
		screen.name = 'rightMonitorScreen';

		this.experience.scene.add(screen);
	}

	// Method activeControls
	activeControls(): void {
		this.isActive = true;
		if (this.container) {
			this.container.style.pointerEvents = 'auto';
		}

		if (this.iframe) {
			this.iframe.style.pointerEvents = 'auto';
		}
	}

	// Method deactivateControls
	deactivateControls(): void {
		this.isActive = false;
		if (this.container) {
			this.container.style.pointerEvents = 'none';
		}

		if (this.iframe) {
			this.iframe.style.pointerEvents = 'none';
		}
	}
}
