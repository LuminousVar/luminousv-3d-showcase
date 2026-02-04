import type Experience from './Experience';
import { TOP_CHAIR_POSITION } from './constants';
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { Object3D, Mesh } from 'three';

export default class TopChair {
	private experience: Experience;
	private model: { group: Object3D | null };
	private startTime: number;

	constructor(experience: Experience) {
		this.experience = experience;
		this.model = { group: null };
		this.startTime = Date.now();
		this.setModel();
	}

	private setModel(): void {
		const resources = this.experience.resources;
		const topChairModel = resources.items.topChairModel as GLTF;

		if (topChairModel?.scene) {
			this.model.group = topChairModel.scene;
			this.model.group.position.copy(TOP_CHAIR_POSITION);

			const material = this.experience.world?.baked?.model.material2;
			if (material) {
				this.model.group.traverse((child: Object3D) => {
					if ((child as Mesh).isMesh) {
						(child as Mesh).material = material;
					}
				});
			}

			this.experience.scene.add(this.model.group);
		}
	}

	update(): void {
		if (this.model.group) {
			const elapsed = (Date.now() - this.startTime) / 1000;
			this.model.group.position.y = TOP_CHAIR_POSITION.y + Math.sin(elapsed * 2) * 0.05;
			this.model.group.rotation.y = elapsed * 0.5;
		}
	}
}
