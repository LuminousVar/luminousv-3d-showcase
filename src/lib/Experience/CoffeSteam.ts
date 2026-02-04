import { ShaderMaterial, Mesh, DoubleSide, PlaneGeometry } from 'three';
import type Experience from './Experience';
import { COFFEE_GEOMETRY, COFFEE_POSITION } from './constants';
import vertexShader from './shaders/coffeeSteam/vertex.glsl?raw';
import fragmentShader from './shaders/coffeeSteam/fragment.glsl?raw';

export default class CoffeSteam {
	private experience: Experience;
	private material: ShaderMaterial;
	private startTime: number;

	constructor(experience: Experience) {
		this.experience = experience;
		this.startTime = Date.now();

		const geometry = new PlaneGeometry(0.19, 0.31, 16, 64);
		this.material = new ShaderMaterial({
			transparent: true,
			side: DoubleSide,
			depthWrite: false,
			uniforms: {
				uTime: { value: 0 },
				uPerlinTexture: { value: null }
			},
			vertexShader,
			fragmentShader
		});

		const mesh = new Mesh(geometry, this.material);
		mesh.position.copy(COFFEE_POSITION);
		this.experience.scene.add(mesh);
	}

	// Method Update
	update(): void {
		const elapsed = (Date.now() - this.startTime) / 1000;
		this.material.uniforms.uTime.value = elapsed;
	}
}
