import type Experience from './Experience';
import Baked from './Baked';
import Carpet from './Carpet';
import TopChair from './TopChair';
import CoffeeSteam from './CoffeSteam';
import Confetti from './Confetti';
import AudioManager from './AudioManager';
import ArcadeScreen from './ArcadeScreen';
import LeftMonitorScreen from './LeftMonitorScreen';
import RightMonitorScreen from './RightMonitorScreen';

export default class World {
	private experience: Experience;
	baked: Baked | null = null;
	carpet: Carpet | null = null;
	topChair: TopChair | null = null;
	coffeeSteam: CoffeeSteam | null = null;
	confetti: Confetti | null = null;
	audioManager: AudioManager | null = null;
	arcadeScreen: ArcadeScreen | null = null;
	leftMonitorScreen: LeftMonitorScreen | null = null;
	rightMonitorScreen: RightMonitorScreen | null = null;

	constructor(experience: Experience) {
		this.experience = experience;

		this.experience.resources.on('groupEnd', (group: unknown) => {
			const groupData = group as { name: string };
			if (groupData.name === 'base') {
				this.setAudioManager();
				this.setBaked();
				this.setCarpet();
				this.setTopChair();
				this.setCoffeeSteam();
				this.setConfetti();
				this.setArcadeScreen();
				this.setLeftMonitorScreen();
				this.setRightMonitorScreen();
			}
		});
	}

	private setBaked(): void {
		this.baked = new Baked(this.experience);
	}

	private setCarpet(): void {
		this.carpet = new Carpet(this.experience);
	}

	private setTopChair(): void {
		this.topChair = new TopChair(this.experience);
	}

	private setCoffeeSteam(): void {
		this.coffeeSteam = new CoffeeSteam(this.experience);
	}

	private setConfetti(): void {
		this.confetti = new Confetti(this.experience);
	}

	private setAudioManager(): void {
		this.audioManager = new AudioManager(this.experience);
	}

	private setArcadeScreen(): void {
		this.arcadeScreen = new ArcadeScreen(this.experience);
	}

	private setLeftMonitorScreen(): void {
		this.leftMonitorScreen = new LeftMonitorScreen(this.experience);
	}

	private setRightMonitorScreen(): void {
		this.rightMonitorScreen = new RightMonitorScreen(this.experience);
	}

	resize(): void {
		// Handle resize if needed
	}

	update(): void {
		if (this.topChair) this.topChair.update();
		if (this.coffeeSteam) this.coffeeSteam.update();
		if (this.confetti) this.confetti.update();
	}

	destroy(): void {
		// Cleanup resources
	}
}
