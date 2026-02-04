import { Vector2, ShaderMaterial, DoubleSide, NoBlending, PlaneGeometry, Mesh } from 'three';
import type { Object3D, Mesh as MeshType } from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import type Experience from './Experience';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
	ARCADE_SCREEN_WIDTH,
	ARCADE_SCREEN_HEIGHT,
	ARCADE_CSS_OBJECT_SCALE,
	ARCADE_CSS_OBJECT_POSITION,
	ARCADE_CSS_OBJECT_ROTATION_X,
	ARCADE_CSS_OBJECT_ROTATION_Y,
	CRT_UNIFORMS,
	ARCADE_IFRAME_SRC,
	ARCADE_IFRAME_PADDING
} from './constants';
import vertexShader from './shaders/screenEffect/vertex.glsl?raw';
import fragmentShader from './shaders/screenEffect/fragment.glsl?raw';

export default class ArcadeScreen {
	private experience: Experience;
	private screenSize: Vector2;
	private container: HTMLDivElement | null = null;
	private iframe: HTMLIFrameElement | null = null;
	isActive = false;

	constructor(experience: Experience) {
		this.experience = experience;
		this.screenSize = new Vector2(ARCADE_SCREEN_WIDTH, ARCADE_SCREEN_HEIGHT);

		this.setModel();
		this.setArcadeScreen();
	}

	private setModel(): void {
		const resources = this.experience.resources;
		const arcadeMachine = resources.items.arcadeMachine as GLTF;

		if (arcadeMachine?.scene) {
			arcadeMachine.scene.name = 'arcadeMachine';
			const material = this.experience.world?.baked?.model.material2;

			if (material) {
				arcadeMachine.scene.traverse((child: Object3D) => {
					if ((child as MeshType).isMesh) {
						(child as MeshType).material = material;
					}
				});
			}

			this.experience.scene.add(arcadeMachine.scene);
		}
	}

	private setArcadeScreen(): void {
		this.container = document.createElement('div');
		this.container.style.width = this.screenSize.x + 'px';
		this.container.style.height = this.screenSize.y + 'px';
		this.container.style.pointerEvents = 'none';

		this.iframe = document.createElement('iframe');
		this.iframe.src = ARCADE_IFRAME_SRC;
		this.iframe.style.width = this.screenSize.x + 'px';
		this.iframe.style.height = this.screenSize.y + 'px';
		this.iframe.style.padding = ARCADE_IFRAME_PADDING;
		this.iframe.style.boxSizing = 'border-box';
		this.iframe.style.background = 'black';
		this.iframe.style.border = 'none';
		this.iframe.style.pointerEvents = 'none';
		this.iframe.id = 'arcade-screen';

		this.container.appendChild(this.iframe);

		const css3DObject = new CSS3DObject(this.container);
		css3DObject.scale.copy(ARCADE_CSS_OBJECT_SCALE);
		css3DObject.position.copy(ARCADE_CSS_OBJECT_POSITION);
		css3DObject.rotateY(ARCADE_CSS_OBJECT_ROTATION_Y);
		css3DObject.rotateX(ARCADE_CSS_OBJECT_ROTATION_X);

		// Add to main scene for proper synchronization
		this.experience.scene.add(css3DObject);

		// CRT effect overlay
		const materialCRT = new ShaderMaterial({
			blending: NoBlending,
			side: DoubleSide,
			transparent: true,
			uniforms: {
				uCurvature: { value: CRT_UNIFORMS.uCurvature },
				uScreenResolution: { value: CRT_UNIFORMS.uScreenResolution },
				uScanLineOpacity: { value: CRT_UNIFORMS.uScanLineOpacity },
				uBaseColor: { value: CRT_UNIFORMS.uBaseColor },
				uColor: { value: CRT_UNIFORMS.uColor },
				uVignetteOpacity: { value: CRT_UNIFORMS.uVignetteOpacity },
				uBrightness: { value: CRT_UNIFORMS.uBrightness },
				uVignetteRoundness: { value: CRT_UNIFORMS.uVignetteRoundness }
			},
			vertexShader,
			fragmentShader
		});

		const screenGeometry = new PlaneGeometry(
			this.screenSize.x * ARCADE_CSS_OBJECT_SCALE.x,
			this.screenSize.y * ARCADE_CSS_OBJECT_SCALE.y
		);
		const screen = new Mesh(screenGeometry, materialCRT);
		screen.position.copy(ARCADE_CSS_OBJECT_POSITION);
		screen.position.x -= 0.01;
		screen.rotateY(ARCADE_CSS_OBJECT_ROTATION_Y);
		screen.rotateX(ARCADE_CSS_OBJECT_ROTATION_X);
		screen.name = 'arcadeMachineScreen';

		// Add directly to scene - models are static
		this.experience.scene.add(screen);
	}

	activateControls(): void {
		this.isActive = true;
		if (this.container) {
			this.container.style.pointerEvents = 'auto';
		}
		if (this.iframe) {
			this.iframe.style.pointerEvents = 'auto';
		}
	}

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
