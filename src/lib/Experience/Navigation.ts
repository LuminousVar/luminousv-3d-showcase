import { Vector2, Object3D } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import type Experience from './Experience';
import {
	ELEMENTS_TO_RAYCAST,
	ORBIT_CONTROLS_CONFIG,
	CAMERA_POSITION,
	CAMERA_QUATERNION,
	CAMERA_TARGET,
	ARCADE_MACHINE_CAMERA_POSITION,
	ARCADE_MACHINE_CAMERA_QUATERNION,
	ARCADE_MACHINE_CAMERA_TARGET,
	LEFT_MONITOR_CAMERA_POSITION,
	LEFT_MONITOR_CAMERA_QUATERNION,
	LEFT_MONITOR_CAMERA_TARGET,
	RIGHT_MONITOR_CAMERA_POSITION,
	RIGHT_MONITOR_CAMERA_QUATERNION,
	RIGHT_MONITOR_CAMERA_TARGET,
	LINKEDIN_URL,
	GITHUB_URL,
	ITCHIO_URL,
	HUGO_DOCS_URL
} from './constants';

export default class Navigation {
	private experience: Experience;
	orbitControls: OrbitControls;
	currentStage: string | null = null;
	private isCameraMoving = false;
	private selectedObjects: Object3D[] = [];
	private objectRaycasted: string | null = null;
	private startClick = new Vector2(null as unknown as number, null as unknown as number);
	private backButton: HTMLElement | null = null;
	private banner: HTMLElement | null = null;
	private bannerLinks: NodeListOf<HTMLElement> | null = null;
	private docsPanel: HTMLElement | null = null;
	private docsToggle: HTMLElement | null = null;
	private docsClose: HTMLElement | null = null;
	private hugoButton: HTMLElement | null = null;

	constructor(experience: Experience) {
		this.experience = experience;

		// Setup OrbitControls
		this.orbitControls = new OrbitControls(
			this.experience.camera.instance,
			this.experience.renderer.instance.domElement
		);

		this.setNavigation();
		this.setupEventListeners();
	}

	private setNavigation(): void {
		this.orbitControls.enabled = ORBIT_CONTROLS_CONFIG.enabled;
		this.orbitControls.screenSpacePanning = ORBIT_CONTROLS_CONFIG.screenSpacePanning;
		this.orbitControls.enableDamping = ORBIT_CONTROLS_CONFIG.enableDamping;
		this.orbitControls.dampingFactor = ORBIT_CONTROLS_CONFIG.dampingFactor;
		this.orbitControls.rotateSpeed = ORBIT_CONTROLS_CONFIG.rotateSpeed;
		this.orbitControls.maxPolarAngle = ORBIT_CONTROLS_CONFIG.maxPolarAngle;
		this.orbitControls.minPolarAngle = ORBIT_CONTROLS_CONFIG.minPolarAngle;
		this.orbitControls.maxAzimuthAngle = ORBIT_CONTROLS_CONFIG.maxAzimuthAngle;
		this.orbitControls.minAzimuthAngle = ORBIT_CONTROLS_CONFIG.minAzimuthAngle;
		this.orbitControls.minDistance = ORBIT_CONTROLS_CONFIG.minDistance;
		this.orbitControls.maxDistance = ORBIT_CONTROLS_CONFIG.maxDistance;
		this.orbitControls.enableRotate = true; // Disable rotation completely
		this.orbitControls.target.y = ORBIT_CONTROLS_CONFIG.target.y;
		this.orbitControls.update();
	}

	private setupEventListeners(): void {
		this.backButton = document.getElementById('back-button');
		this.banner = document.querySelector('.banner');
		this.bannerLinks = document.querySelectorAll('.banner-link');
		this.docsPanel = document.getElementById('docsPanel');
		this.docsToggle = document.getElementById('docsToggle');
		this.docsClose = document.getElementById('docsClose');
		this.hugoButton = document.getElementById('hugoRedirect');

		// Back button click
		if (this.backButton) {
			this.backButton.addEventListener('click', this.handleBackClick);
		}

		// Docs toggle click
		if (this.docsToggle) {
			this.docsToggle.addEventListener('click', this.handleDocsToggle);
		}

		// Docs close click
		if (this.docsClose) {
			this.docsClose.addEventListener('click', this.handleDocsClose);
		}

		// Hugo button click
		if (this.hugoButton) {
			this.hugoButton.addEventListener('click', this.handleHugoRedirect);
		}

		// Banner links click
		if (this.bannerLinks) {
			this.bannerLinks.forEach((link) => {
				link.addEventListener('click', () => {
					if (!this.isCameraMoving && this.currentStage !== link.id) {
						this.flyToPosition(link.id);
					}
				});
			});
		}

		// Mouse events
		const webglElement = this.experience.webglElement;
		webglElement.addEventListener('mousemove', this.onMouseMove);
		webglElement.addEventListener('mousedown', this.onMouseDown);
		webglElement.addEventListener('mouseup', this.onMouseUp);
	}

	private handleBackClick = (): void => {
		if (this.isCameraMoving) return;
		if (this.currentStage !== null) {
			this.returnToOverview();
		}
	};

	private handleDocsToggle = (): void => {
		// Direct redirect to Hugo documentation site
		window.open(HUGO_DOCS_URL, '_blank');
	};

	private handleDocsClose = (): void => {
		if (this.docsPanel) {
			this.docsPanel.classList.remove('show-docs');
		}
	};

	private handleHugoRedirect = (): void => {
		window.open(HUGO_DOCS_URL, '_blank');
	};

	private returnToOverview(): void {
		this.orbitControls.enableDamping = false;
		this.orbitControls.enabled = false;

		this.experience.world?.audioManager?.playSingleAudio('whoosh', 0.2);

		// Deactivate all screens and CSS interaction
		this.experience.renderer.disableCSSInteraction();
		this.experience.world?.arcadeScreen?.deactivateControls();
		this.experience.world?.leftMonitorScreen?.deactivateControls();
		this.experience.world?.rightMonitorScreen?.deactivateControls();

		this.moveCamera(CAMERA_POSITION.x, CAMERA_POSITION.y, CAMERA_POSITION.z, 1);
		this.rotateCamera(
			CAMERA_QUATERNION.x,
			CAMERA_QUATERNION.y,
			CAMERA_QUATERNION.z,
			CAMERA_QUATERNION.w,
			1.15,
			null
		);
		this.changeTarget(CAMERA_TARGET.x, CAMERA_TARGET.y, CAMERA_TARGET.z, 1);

		if (this.backButton) {
			this.backButton.classList.remove('show-back-button');
		}

		// Reset banner position
		if (this.banner) {
			this.banner.classList.remove('banner-left');
		}
	}

	private flyToPosition(key: string): void {
		const audioManager = this.experience.world?.audioManager;

		switch (key) {
			case 'linkedin':
				window.open(LINKEDIN_URL, '_blank');
				return;
			case 'github':
				window.open(GITHUB_URL, '_blank');
				return;
			case 'itchio':
				window.open(ITCHIO_URL, '_blank');
				return;
			case 'docsToggle':
				// Handled by handleDocsToggle, do nothing here
				return;
			case 'arcadeMachine':
			case 'arcadeMachineScreen':
				audioManager?.playSingleAudio('whoosh', 0.2);
				this.backButton?.classList.add('show-back-button');
				this.banner?.classList.add('banner-left');
				this.orbitControls.enableDamping = false;
				this.orbitControls.enabled = false;
				this.moveCamera(
					ARCADE_MACHINE_CAMERA_POSITION.x,
					ARCADE_MACHINE_CAMERA_POSITION.y,
					ARCADE_MACHINE_CAMERA_POSITION.z,
					1
				);
				this.rotateCamera(
					ARCADE_MACHINE_CAMERA_QUATERNION.x,
					ARCADE_MACHINE_CAMERA_QUATERNION.y,
					ARCADE_MACHINE_CAMERA_QUATERNION.z,
					ARCADE_MACHINE_CAMERA_QUATERNION.w,
					1.15,
					'arcadeMachine'
				);
				this.changeTarget(
					ARCADE_MACHINE_CAMERA_TARGET.x,
					ARCADE_MACHINE_CAMERA_TARGET.y,
					ARCADE_MACHINE_CAMERA_TARGET.z,
					1
				);
				break;
			case 'leftMonitor':
			case 'leftMonitorScreen':
				audioManager?.playSingleAudio('whoosh', 0.2);
				this.backButton?.classList.add('show-back-button');
				this.banner?.classList.add('banner-left');
				this.orbitControls.enableDamping = false;
				this.orbitControls.enabled = false;
				this.moveCamera(
					LEFT_MONITOR_CAMERA_POSITION.x,
					LEFT_MONITOR_CAMERA_POSITION.y,
					LEFT_MONITOR_CAMERA_POSITION.z,
					1
				);
				this.rotateCamera(
					LEFT_MONITOR_CAMERA_QUATERNION.x,
					LEFT_MONITOR_CAMERA_QUATERNION.y,
					LEFT_MONITOR_CAMERA_QUATERNION.z,
					LEFT_MONITOR_CAMERA_QUATERNION.w,
					1.15,
					'leftMonitor'
				);
				this.changeTarget(
					LEFT_MONITOR_CAMERA_TARGET.x,
					LEFT_MONITOR_CAMERA_TARGET.y,
					LEFT_MONITOR_CAMERA_TARGET.z,
					1
				);
				break;
			case 'rightMonitor':
			case 'rightMonitorScreen':
				audioManager?.playSingleAudio('whoosh', 0.2);
				this.backButton?.classList.add('show-back-button');
				this.banner?.classList.add('banner-left');
				this.orbitControls.enableDamping = false;
				this.orbitControls.enabled = false;
				this.moveCamera(
					RIGHT_MONITOR_CAMERA_POSITION.x,
					RIGHT_MONITOR_CAMERA_POSITION.y,
					RIGHT_MONITOR_CAMERA_POSITION.z,
					1
				);
				this.rotateCamera(
					RIGHT_MONITOR_CAMERA_QUATERNION.x,
					RIGHT_MONITOR_CAMERA_QUATERNION.y,
					RIGHT_MONITOR_CAMERA_QUATERNION.z,
					RIGHT_MONITOR_CAMERA_QUATERNION.w,
					1.15,
					'rightMonitor'
				);
				this.changeTarget(
					RIGHT_MONITOR_CAMERA_TARGET.x,
					RIGHT_MONITOR_CAMERA_TARGET.y,
					RIGHT_MONITOR_CAMERA_TARGET.z,
					1
				);
				break;
		}

		this.isCameraMoving = true;
	}

	private onMouseMove = (e: MouseEvent): void => {
		const mouse = this.experience.mouse;
		mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
		mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

		if (this.currentStage === null && !this.isCameraMoving) {
			this.checkIntersection();
		}
	};

	private onMouseDown = (e: MouseEvent): void => {
		this.startClick.set(
			(e.clientX / window.innerWidth) * 2 - 1,
			-(e.clientY / window.innerHeight) * 2 + 1
		);
	};

	private onMouseUp = (): void => {
		const mouse = this.experience.mouse;
		if (this.startClick.x === mouse.x && this.startClick.y === mouse.y) {
			if (!this.isCameraMoving && this.objectRaycasted !== null) {
				this.flyToPosition(this.objectRaycasted);
			}
		}
		this.startClick.set(null as unknown as number, null as unknown as number);
	};

	private checkIntersection(): void {
		const raycaster = this.experience.raycaster;
		const camera = this.experience.camera.instance;
		const scene = this.experience.scene;
		const mouse = this.experience.mouse;

		raycaster.setFromCamera(mouse, camera);
		const intersects = raycaster.intersectObjects(scene.children, true);

		this.objectRaycasted = null;
		this.selectedObjects = [];

		for (const intersect of intersects) {
			let object: Object3D | null = intersect.object;

			while (object) {
				if (ELEMENTS_TO_RAYCAST.includes(object.name)) {
					this.objectRaycasted = object.name;
					this.selectedObjects = [object];
					break;
				}
				object = object.parent;
			}

			if (this.objectRaycasted) break;
		}

		// Update outline
		if (this.experience.renderer.postProcess.outlinePass) {
			this.experience.renderer.postProcess.outlinePass.selectedObjects = this.selectedObjects;
		}

		// Update cursor
		this.experience.webglElement.style.cursor = this.objectRaycasted ? 'pointer' : 'auto';
	}

	private moveCamera(x: number, y: number, z: number, duration: number): void {
		gsap.to(this.experience.camera.instance.position, {
			x,
			y,
			z,
			duration,
			ease: 'sine.out'
		});
	}

	private rotateCamera(
		x: number,
		y: number,
		z: number,
		w: number,
		duration: number,
		stage: string | null
	): void {
		gsap.to(this.experience.camera.instance.quaternion, {
			x,
			y,
			z,
			w,
			duration,
			ease: 'sine.out',
			onComplete: () => {
				this.currentStage = stage;
				if (this.currentStage === null) {
					this.orbitControls.enableDamping = true;
					this.orbitControls.enabled = true;
				}
				this.isCameraMoving = false;
				this.updateStage();
			}
		});
	}

	private changeTarget(x: number, y: number, z: number, duration: number): void {
		gsap.to(this.orbitControls.target, {
			x,
			y,
			z,
			duration,
			ease: 'sine.out'
		});
	}

	private updateStage(): void {
		switch (this.currentStage) {
			case 'arcadeMachine':
				this.orbitControls.enabled = false;
				this.experience.renderer.enableCSSInteraction();
				this.experience.world?.arcadeScreen?.activateControls();
				break;
			case 'leftMonitor':
				this.orbitControls.enabled = false;
				this.experience.renderer.enableCSSInteraction();
				this.experience.world?.leftMonitorScreen?.activateControls();
				break;
			case 'rightMonitor':
				this.orbitControls.enabled = false;
				this.experience.renderer.enableCSSInteraction();
				this.experience.world?.rightMonitorScreen?.activeControls();
				break;
			default:
				this.orbitControls.enabled = true;
				this.experience.renderer.disableCSSInteraction();
				break;
		}
	}

	activateControls(): void {
		this.orbitControls.enabled = true;
	}

	deactivateControls(): void {
		this.orbitControls.enabled = false;
	}

	update(): void {
		this.orbitControls.update();
	}

	destroy(): void {
		this.orbitControls.dispose();

		const webglElement = this.experience.webglElement;
		webglElement.removeEventListener('mousemove', this.onMouseMove);
		webglElement.removeEventListener('mousedown', this.onMouseDown);
		webglElement.removeEventListener('mouseup', this.onMouseUp);

		if (this.backButton) {
			this.backButton.removeEventListener('click', this.handleBackClick);
		}

		if (this.docsToggle) {
			this.docsToggle.removeEventListener('click', this.handleDocsToggle);
		}

		if (this.docsClose) {
			this.docsClose.removeEventListener('click', this.handleDocsClose);
		}

		if (this.hugoButton) {
			this.hugoButton.removeEventListener('click', this.handleHugoRedirect);
		}
	}
}
