import {
	PlaneGeometry,
	InstancedMesh,
	MeshBasicMaterial,
	Object3D,
	DoubleSide,
	Color,
	Matrix4
} from 'three';
import type Experience from './Experience';
import { CONFETTI_AMOUNT } from './constants';

export default class Confetti {
	private experience: Experience;
	private particles: InstancedMesh;
	private infoParticles: {
		position: { x: number; y: number; z: number };
		velocity: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		color: Color;
	}[] = [];
	private dummy: Object3D;
	hasExploded = false;
	private startTime = 0;

	constructor(experience: Experience) {
		this.experience = experience;
		this.dummy = new Object3D();

		const geometry = new PlaneGeometry(0.05, 0.05);
		const material = new MeshBasicMaterial({
			color: 0xffffff,
			side: DoubleSide
		});

		this.particles = new InstancedMesh(geometry, material, CONFETTI_AMOUNT);
		this.particles.visible = false;
		this.experience.scene.add(this.particles);
	}

	explode(position: { x: number; y: number; z: number }): void {
		if (this.hasExploded) return;

		this.hasExploded = true;
		this.particles.visible = true;
		this.startTime = Date.now();

		const colors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff, 0xffffff];

		for (let i = 0; i < CONFETTI_AMOUNT; i++) {
			const color = new Color(colors[Math.floor(Math.random() * colors.length)]);

			this.infoParticles.push({
				position: {
					x: position.x + (Math.random() - 0.5) * 0.5,
					y: position.y + (Math.random() - 0.5) * 0.5,
					z: position.z + (Math.random() - 0.5) * 0.5
				},
				velocity: {
					x: (Math.random() - 0.5) * 0.2,
					y: Math.random() * 0.2 + 0.1,
					z: (Math.random() - 0.5) * 0.2
				},
				rotation: {
					x: Math.random() * Math.PI * 2,
					y: Math.random() * Math.PI * 2,
					z: Math.random() * Math.PI * 2
				},
				color
			});
		}
	}

	update(): void {
		if (!this.hasExploded) return;

		const gravity = 0.005;

		for (let i = 0; i < this.infoParticles.length; i++) {
			const particle = this.infoParticles[i];

			particle.velocity.y -= gravity;
			particle.position.x += particle.velocity.x;
			particle.position.y += particle.velocity.y;
			particle.position.z += particle.velocity.z;

			particle.rotation.x += 0.1;
			particle.rotation.y += 0.1;

			this.dummy.position.set(particle.position.x, particle.position.y, particle.position.z);
			this.dummy.rotation.set(particle.rotation.x, particle.rotation.y, particle.rotation.z);
			this.dummy.updateMatrix();

			this.particles.setMatrixAt(i, this.dummy.matrix);
			this.particles.setColorAt(i, particle.color);
		}

		this.particles.instanceMatrix.needsUpdate = true;
		if (this.particles.instanceColor) {
			this.particles.instanceColor.needsUpdate = true;
		}
	}
}
