import { PerspectiveCamera } from 'three';
import type Experience from './Experience';
import { CAMERA_POSITION } from './constants';

export default class Camera {
	private experience: Experience;
	instance: PerspectiveCamera;

	constructor(experience: Experience) {
		this.experience = experience;
		this.instance = new PerspectiveCamera(
			20,
			this.experience.config.width / this.experience.config.height,
			0.1,
			1000
		);

		this.instance.rotation.reorder('XYZ');
		this.instance.position.copy(CAMERA_POSITION);
		this.experience.scene.add(this.instance);
	}

	// Method resize camera
	resize(): void {
		this.instance.aspect = this.experience.config.width;
		this.instance.updateProjectionMatrix();
	}

	// Method update camera
	update(): void {
		this.instance.updateMatrixWorld();
	}
}
