import { Vector2, Mesh, PlaneGeometry, MeshLambertMaterial, NoBlending } from 'three';
import type { Object3D, Mesh as MeshType } from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import type Experience from './Experience';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
	LEFT_MONITOR_SCREEN_WIDTH,
	LEFT_MONITOR_SCREEN_HEIGHT,
	LEFT_MONITOR_CSS_OBJECT_SCALE,
	LEFT_MONITOR_CSS_OBJECT_POSITION,
	LEFT_MONITOR_IFRAME_SRC,
	MONITOR_IFRAME_PADDING
} from './constants';

export default class LeftMonitorScreen {
	private experience: Experience;
	private screenSize: Vector2;
	private container: HTMLDivElement | null = null;
	private iframe: HTMLIFrameElement | null = null;
	private css3DObject: CSS3DObject | null = null;
	isActive = false;

	constructor(experience: Experience) {
		this.experience = experience;
		this.screenSize = new Vector2(LEFT_MONITOR_SCREEN_WIDTH, LEFT_MONITOR_SCREEN_HEIGHT);

		this.setModel();
		this.setMonitorScreen();
	}

	private setModel(): void {
		const resources = this.experience.resources;
		const leftMonitor = resources.items.leftMonitor as GLTF;

		if (leftMonitor?.scene) {
			leftMonitor.scene.name = 'leftMonitor';
			const material = this.experience.world?.baked?.model.material2;

			if (material) {
				leftMonitor.scene.traverse((child: Object3D) => {
					if ((child as MeshType).isMesh) {
						(child as MeshType).material = material;
					}
				});
			}

			this.experience.scene.add(leftMonitor.scene);
		}
	}

	private setMonitorScreen(): void {
		this.container = document.createElement('div');
		this.container.style.width = this.screenSize.x + 'px';
		this.container.style.height = this.screenSize.y + 'px';
		this.container.style.pointerEvents = 'none';

		this.iframe = document.createElement('iframe');
		this.iframe.src = LEFT_MONITOR_IFRAME_SRC;
		this.iframe.style.width = this.screenSize.x + 'px';
		this.iframe.style.height = this.screenSize.y + 'px';
		this.iframe.style.padding = MONITOR_IFRAME_PADDING;
		this.iframe.style.boxSizing = 'border-box';
		this.iframe.style.background = 'black';
		this.iframe.style.border = 'none';
		this.iframe.style.pointerEvents = 'none';
		this.iframe.id = 'left-monitor-screen';

		this.container.appendChild(this.iframe);

		this.css3DObject = new CSS3DObject(this.container);
		this.css3DObject.position.copy(LEFT_MONITOR_CSS_OBJECT_POSITION);
		this.css3DObject.scale.copy(LEFT_MONITOR_CSS_OBJECT_SCALE);

		// Add to main scene for proper synchronization
		this.experience.scene.add(this.css3DObject);

		// Create GL plane at exact same position - creates transparent "window"
		const material = new MeshLambertMaterial({
			color: 'black',
			opacity: 0,
			transparent: true,
			blending: NoBlending
		});
		const geometry = new PlaneGeometry(this.screenSize.x, this.screenSize.y);
		const screen = new Mesh(geometry, material);

		// Must match CSS3D object exactly
		screen.position.copy(this.css3DObject.position);
		screen.rotation.copy(this.css3DObject.rotation);
		screen.scale.copy(this.css3DObject.scale);
		screen.name = 'leftMonitorScreen';

		// Add directly to scene - models are static
		this.experience.scene.add(screen);
	}

	activateControls(): void {
		this.isActive = true;

		if (this.css3DObject && this.css3DObject.element) {
			this.css3DObject.element.style.pointerEvents = 'auto';

			const allDivs = this.css3DObject.element.querySelectorAll('div');
			allDivs.forEach((div: Element) => {
				(div as HTMLElement).style.pointerEvents = 'auto';
			});
		}

		if (this.container) {
			this.container.style.pointerEvents = 'auto';
		}

		if (this.iframe) {
			this.iframe.style.pointerEvents = 'auto';
			setTimeout(() => {
				if (this.iframe) {
					this.iframe.focus();
				}
			}, 100);
		}
	}

	deactivateControls(): void {
		this.isActive = false;

		if (this.css3DObject && this.css3DObject.element) {
			this.css3DObject.element.style.pointerEvents = 'none';

			// Reset all child divs
			const allDivs = this.css3DObject.element.querySelectorAll('div');
			allDivs.forEach((div: Element) => {
				(div as HTMLElement).style.pointerEvents = 'none';
			});
		}

		if (this.container) {
			this.container.style.pointerEvents = 'none';
		}

		if (this.iframe) {
			this.iframe.style.pointerEvents = 'none';
		}
	}
}
