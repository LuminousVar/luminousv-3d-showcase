import {
	Vector2,
	ShaderMaterial,
	DoubleSide,
	PlaneGeometry,
	Mesh,
	SRGBColorSpace,
	MirroredRepeatWrapping,
	type Texture
} from 'three';
import type Experience from './Experience';
import fragmentShader from './shaders/sky/fragment.glsl?raw';
import vertexShader from './shaders/sky/vertex.glsl?raw';

export default class Skybox {
	private experience: Experience;

	constructor(experience: Experience) {
		this.experience = experience;
		this.setSkybox();
	}

	private setSkybox(): void {
		const resources = this.experience.resources;
		const skyTexture = resources.items.skyTexture as Texture;

		if (skyTexture) {
			skyTexture.colorSpace = SRGBColorSpace;
			skyTexture.wrapS = MirroredRepeatWrapping;
			skyTexture.wrapT = MirroredRepeatWrapping;
		}

		const planeGeom = new PlaneGeometry(40, 25);
		const planeMat = new ShaderMaterial({
			side: DoubleSide,
			uniforms: {
				uTexture: { value: skyTexture },
				uTime: { value: 0 }
			},
			vertexShader,
			fragmentShader
		});

		const plane = new Mesh(planeGeom, planeMat);
		plane.rotateY(-Math.PI / 2);
		plane.position.x = 7;
		this.experience.scene.add(plane);
	}
}
