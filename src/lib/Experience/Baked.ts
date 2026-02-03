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
	}
}
