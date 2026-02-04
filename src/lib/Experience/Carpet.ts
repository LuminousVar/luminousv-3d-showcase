import { Group, ShaderMaterial, DoubleSide, PlaneGeometry, Mesh, Vector3, Box3 } from 'three';
import type Experience from './Experience';
import vertexShader from './shaders/shellTexturingCarpet/vertex.glsl?raw';
import fragmentShader from './shaders/shellTexturingCarpet/fragment.glsl?raw';
import {
	CARPET_UNIFORMS,
	CARPET_SHELLCOUNT,
	CARPET_GROUP_SCALE,
	CARPET_GROUP_ROTATION
} from './constants';

export default class Carpet {
	private experience: Experience;
	private carpetGroup: Group;

	constructor(experience: Experience) {
		this.experience = experience;
		this.carpetGroup = new Group();

		setTimeout(() => {
			this.setCarpet();
		}, 0);
	}

	private setCarpet(): void {
		let originalPosition = new Vector3(-2.5, 0, -1);
		let geometrySize = 80;

		const originalCarpet = this.findOriginalCarpet();
		if (originalCarpet) {
			originalCarpet.getWorldPosition(originalPosition);

			// Calculate the size
			const box = new Box3().setFromObject(originalCarpet);
			const size = new Vector3();
			box.getSize(size);

			const diameter = Math.max(size.x, size.z);

			//  Adjust geometry size based on uniform
			if (diameter > 0) {
				geometrySize = diameter / CARPET_GROUP_SCALE.x;
			}

			originalCarpet.visible = false;
		}

		const shellCount = CARPET_SHELLCOUNT;
		const geometry = new PlaneGeometry(geometrySize, geometrySize);

		for (let i = 0; i < shellCount; ++i) {
			const shaderMaterial = new ShaderMaterial({
				vertexShader,
				fragmentShader,
				side: DoubleSide,
				transparent: true,
				depthWrite: false,
				uniforms: {
					uColor: { value: CARPET_UNIFORMS.uColor },
					uShellCount: { value: CARPET_UNIFORMS.uShellCount },
					uShellIndex: { value: i },
					uShellLength: { value: CARPET_UNIFORMS.uShellLength },
					uDensity: { value: CARPET_UNIFORMS.uDensity },
					uThickness: { value: CARPET_UNIFORMS.uThickness }
				}
			});

			const mesh = new Mesh(geometry, shaderMaterial);
			mesh.rotation.copy(CARPET_GROUP_ROTATION);

			mesh.position.y = i * 0.05;

			mesh.receiveShadow = true;
			mesh.castShadow = true;
			this.carpetGroup.add(mesh);
		}

		this.carpetGroup.name = 'Carpet';
		this.carpetGroup.scale.copy(CARPET_GROUP_SCALE);
		this.carpetGroup.position.copy(originalPosition);

		if (this.carpetGroup.position.y < 0.015) {
			this.carpetGroup.position.y = 0.015;
		}

		this.experience.scene.add(this.carpetGroup);
	}

	private findOriginalCarpet() {
		let found: any = null;

		this.experience.scene.traverse((child) => {
			if (found) return;

			// if not
			const name = child.name.toLowerCase();
			if ((name.includes('carpet') || name.includes('rug')) && child.type === 'Mesh') {
				// Ignore our own carpet group children
				if (child.parent === this.carpetGroup) return;
				found = child;
			}
		});

		return found;
	}
}
