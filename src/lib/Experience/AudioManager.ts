import * as THREE from 'three';
import type Experience from './Experience';

interface AudioItem {
	audio: THREE.Audio;
	buffer: AudioBuffer | null;
}

export default class AudioManager {
	private experience: Experience;
	private listener: THREE.AudioListener;
	private audioLoader: THREE.AudioLoader;
	private sounds: Map<string, AudioItem> = new Map();

	constructor(experience: Experience) {
		this.experience = experience;
		this.listener = new THREE.AudioListener();
		this.audioLoader = new THREE.AudioLoader();
		this.experience.camera.instance.add(this.listener);

		this.loadSounds();
	}

	private loadSounds(): void {
		const soundFiles = [
			'whoosh',
			'confetti',
			'rubik_1',
			'rubik_2',
			'rubik_3',
			'trophy',
			'marker-open'
		];

		soundFiles.forEach((name) => {
			const audio = new THREE.Audio(this.listener);
			this.audioLoader.load(
				`/assets/sounds/${name}.mp3`,
				(buffer) => {
					this.sounds.set(name, { audio, buffer });
				},
				undefined,
				() => {
					// Try with .ogg if mp3 fails
					this.audioLoader.load(
						`/assets/sounds/${name}.ogg`,
						(buffer) => {
							this.sounds.set(name, { audio, buffer });
						},
						undefined,
						() => {
							console.warn(`Could not load sound: ${name}`);
						}
					);
				}
			);
		});
	}

	// Method play audio
	playSingleAudio(name: string, volume = 0.5): void {
		const sound = this.sounds.get(name);
		if (sound && sound.buffer) {
			if (sound.audio.isPlaying) {
				sound.audio.stop();
			}

			sound.audio.setBuffer(sound.buffer);
			sound.audio.setVolume(volume);
			sound.audio.play();
		}
	}

	// Method stop audio
	stopAudio(name: string): void {
		const sound = this.sounds.get(name);
		if (sound && sound.audio.isPlaying) {
			sound.audio.stop();
		}
	}
}
