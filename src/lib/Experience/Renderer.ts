import {
	WebGLRenderer,
	Vector2,
	WebGLRenderTarget,
	LinearFilter,
	Color,
	HalfFloatType,
	Line
} from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader.js';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import type Experience from './Experience';
import { Linear } from 'gsap';
import { outline } from 'three/examples/jsm/tsl/display/OutlineNode.js';

export default class Renderer {
	private experience: Experience;
	private usePostprocess = false;

	instance: WebGLRenderer;
	cssInstance: CSS3DRenderer;
	postProcess: {
		composer: EffectComposer;
		outlinePass: OutlinePass;
	};

	constructor(experience: Experience) {
		this.experience = experience;

		// WebGL Renderer
		this.instance = new WebGLRenderer({
			antialias: true,
			alpha: true,
			premultipliedAlpha: true
		});

		this.instance.setSize(this.experience.config.width, this.experience.config.height);
		this.instance.setPixelRatio(this.experience.config.pixelRatio);
		this.instance.setClearColor(0x000000, 0);
		this.instance.autoClear = false;
		this.instance.domElement.style.pointerEvents = 'auto';
		this.experience.webglElement.appendChild(this.instance.domElement);

		// Single CSS3D Renderer for all CSS objects
		this.cssInstance = new CSS3DRenderer();
		this.cssInstance.setSize(this.experience.config.width, this.experience.config.height);
		this.cssInstance.domElement.style.position = 'absolute';
		this.cssInstance.domElement.style.top = '0';
		this.cssInstance.domElement.style.left = '0';
		this.cssInstance.domElement.style.pointerEvents = 'none';
		if (this.experience.cssElement) {
			this.experience.cssElement.appendChild(this.cssInstance.domElement);
		}

		this.postProcess = this.setupPostProcess();
	}

	// method postProcess
	private setupPostProcess(): { composer: EffectComposer; outlinePass: OutlinePass } {
		const renderTarget = new WebGLRenderTarget(
			this.experience.config.width,
			this.experience.config.height,
			{
				minFilter: LinearFilter,
				magFilter: LinearFilter,
				type: HalfFloatType,
				stencilBuffer: false
			}
		);

		const composer = new EffectComposer(this.instance, renderTarget);
		composer.renderToScreen = true;

		// Render Pass
		const renderPass = new RenderPass(this.experience.scene, this.experience.camera.instance);
		composer.addPass(renderPass);

		// Outline Pass
		const outlinePass = new OutlinePass(
			new Vector2(this.experience.config.width, this.experience.config.height),
			this.experience.scene,
			this.experience.camera.instance
		);

		outlinePass.edgeStrength = 3;
		outlinePass.edgeGlow = 0.5;
		outlinePass.edgeThickness = 1;
		outlinePass.pulsePeriod = 2;
		outlinePass.visibleEdgeColor = new Color(0xffffff);
		outlinePass.hiddenEdgeColor = new Color(0x190a05);
		composer.addPass(outlinePass);

		// Gamma correction
		const gammaCorrectionPass = new ShaderPass(GammaCorrectionShader);
		composer.addPass(gammaCorrectionPass);

		return { composer, outlinePass };
	}

	// Method Resize
	resize(): void {
		this.instance.setSize(this.experience.config.width, this.experience.config.height);
		this.experience.setPixelRatio(this.experience.config.pixelRatio);

		this.cssInstance.setSize(this.experience.config.width, this.experience.config.height);

		this.postProcess.composer.setSize(this.experience.config.width, this.experience.config.height);

		this.postProcess.outlinePass.setSize(
			this.experience.config.width,
			this.experience.config.height
		);
	}

	// Method for Update
	update(): void {
		this.cssInstance.render(this.experience.scene, this.experience.camera.instance);

		this.instance.clear();

		if (this.usePostprocess) {
			this.postProcess.composer.render();
		} else {
			this.instance.render(this.experience.scene, this.experience.camera.instance);
		}
	}

	// Method enable for interaction
	enableCSSInteraction(): void {
		this.instance.domElement.style.pointerEvents = 'none';

		if (this.experience.cssElement) {
			this.experience.cssElement.style.pointerEvents = 'auto';
			this.experience.cssElement.style.zIndex = '10';
		}
		this.cssInstance.domElement.style.pointerEvents = 'auto';
	}

	// Method disable for interaction
	disableCSSInteraction(): void {
		this.instance.domElement.style.pointerEvents = 'auto';
		if (this.experience.cssElement) {
			this.experience.cssElement.style.pointerEvents = 'none';
			this.experience.cssElement.style.zIndex = '1';
		}
		this.cssInstance.domElement.style.pointerEvents = 'none';
	}

	// Method destroy
	destroy(): void {
		this.instance.dispose();
		this.postProcess.composer.dispose();
	}
}
