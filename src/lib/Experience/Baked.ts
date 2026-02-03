import {
	Mesh,
	MeshBasicMaterial,
	SRGBColorSpace,
	Vector3,
	type Texture,
	type Object3D
} from 'three';
import type Experience from './Experience';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { render } from 'svelte/server';

// Baked 3D effect
export default class Baked {
	private experience: Experience;
	model: {
		material: MeshBasicMaterial;
		material2: MeshBasicMaterial;
		material3: MeshBasicMaterial;
	};

	constructor(experience: Experience) {
		this.experience = experience;

		const resources = this.experience.resources;
		const renderer = this.experience.renderer.instance;
		const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();

		//  Setup materials wit baked textures
		const baked1 = resources.items.baked1 as Texture;
		const baked2 = resources.items.baked2 as Texture;
		const baked3 = resources.items.baked3 as Texture;

		if (baked1) {
			baked1.flipY = false;
			baked1.colorSpace = SRGBColorSpace;
			baked1.anisotropy = maxAnisotropy;
		}

		if (baked2) {
			baked2.flipY = false;
			baked2.colorSpace = SRGBColorSpace;
			baked2.anisotropy = maxAnisotropy;
		}

		if (baked3) {
			baked3.flipY = false;
			baked3.colorSpace = SRGBColorSpace;
			baked3.anisotropy = maxAnisotropy;
		}

		this.model = {
			material: new MeshBasicMaterial({ map: baked1 }),
			material2: new MeshBasicMaterial({ map: baked2 }),
			material3: new MeshBasicMaterial({ map: baked3 })
		};

		this.setModels();
	}

	private setModels(): void {
		const resources = this.experience.resources;
		const scene = this.experience.scene;

		// Room Model 1
		const roomModel1 = resources.items._roomModel as GLTF;
		if (roomModel1?.scene) {
			roomModel1.scene.traverse((child: Object3D) => {
				if ((child as Mesh).isMesh) {
					const childName = child.name.toLowerCase();

					if (childName.includes('carpet') || childName.includes('rug')) {
						child.visible = false;
					} else {
						(child as Mesh).material = this.model.material;
					}
				}
			});

			scene.add(roomModel1.scene);
		}

		// Room Model 2
		const roomModel2 = resources.items._roomModel2 as GLTF;
		if (roomModel2?.scene) {
			roomModel2.scene.traverse((child: Object3D) => {
				if ((child as Mesh).isMesh) {
					(child as Mesh).material = this.model.material2;
				}
			});
			scene.add(roomModel2.scene);
		}

		// Room Model 3
		const roomModel3 = resources.items._roomModel3 as GLTF;
		if (roomModel3?.scene) {
			roomModel3.scene.traverse((child: Object3D) => {
				if ((child as Mesh).isMesh) {
					// Hide clapper board - mesh in bookshelf area
					const worldPos = child.getWorldPosition(new Vector3());
					if (
						worldPos.x > 1.5 &&
						worldPos.x < 3.5 &&
						worldPos.y > 3.5 &&
						worldPos.y < 5.5 &&
						worldPos.z > -5 &&
						worldPos.z < -3.5
					) {
						child.visible = false;
					} else {
						(child as Mesh).material = this.model.material3;
					}
				}
			});
			scene.add(roomModel3.scene);
		}

		// Social icons
		this.addSocialIcon('linkedin');
		this.addSocialIcon('github');
		this.addSocialIcon('itchio');
	}

	private addSocialIcon(name: string): void {
		const resources = this.experience.resources;
		const model = resources.items[name] as GLTF;

		if (model?.scene) {
			model.scene.name = name;
			model.scene.traverse((child: Object3D) => {
				if ((child as Mesh).isMesh) {
					(child as Mesh).material = this.model.material3;
				}
			});

			this.experience.scene.add(model.scene);
		}
	}
}
