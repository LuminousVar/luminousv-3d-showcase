import { Vector2, Vector3, Color, Quaternion, PlaneGeometry, Euler } from 'three';

// Camera
export const CAMERA_POSITION = new Vector3(-23, 17, 23);
export const CAMERA_QUATERNION = new Quaternion(
	-0.19229498096591757,
	-0.3743024144764491,
	-0.07965118909235921,
	0.9036459654580388
);
export const CAMERA_TARGET = new Vector3(0, 2.5, 0);

// Carpet
export const CARPET_SHELLCOUNT = 32;
export const CARPET_UNIFORMS = {
	uColor: new Color(0.7529412, 0.5424671, 0.4392157).convertSRGBToLinear(),
	uShellCount: 32,
	uShellLength: 0.16,
	uDensity: 250,
	uThickness: 5
};
export const CARPET_GROUP_SCALE = new Vector3(0.05, 0.05, 0.05);
export const CARPET_GROUP_POSITION = new Vector3(0, 0, 0);
export const CARPET_GROUP_ROTATION = new Euler(-Math.PI / 2, 0, 0);

// Coffee
export const COFFEE_GEOMETRY = new PlaneGeometry(0.19, 0.31, 16, 64);
export const COFFEE_POSITION = new Vector3(-0.5633, 2.6, -1.405);

// Top Chair
export const TOP_CHAIR_POSITION = new Vector3(1.4027, 0.496728, -1.21048);

// Confetti
export const CONFETTI_AMOUNT = 600;

// Arcade Machine
export const ARCADE_SCREEN_WIDTH = 1006.986;
export const ARCADE_SCREEN_HEIGHT = 1210.1182617331252;
export const ARCADE_CSS_OBJECT_SCALE = new Vector3(0.00102, 0.00102, 0.00102);
export const ARCADE_CSS_OBJECT_POSITION = new Vector3(3.24776, 2.7421, 2.3009);
export const ARCADE_CSS_OBJECT_ROTATION_X = -Math.PI / 7;
export const ARCADE_CSS_OBJECT_ROTATION_Y = -Math.PI / 2;
export const CRT_UNIFORMS = {
	uCurvature: new Vector2(3, 3),
	uScreenResolution: new Vector2(ARCADE_SCREEN_WIDTH / 5, ARCADE_SCREEN_HEIGHT / 5),
	uScanLineOpacity: new Vector2(0.5, 0.5),
	uBaseColor: new Color(0.1, 0.1, 0.1).convertSRGBToLinear(),
	uColor: new Color(0.0, 0.0, 0.0).convertSRGBToLinear(),
	uVignetteOpacity: 1,
	uBrightness: 2.5,
	uVignetteRoundness: 1
};
export const ARCADE_IFRAME_SRC = 'https://joan-arcade-machine.vercel.app';
export const ARCADE_IFRAME_PADDING = '16px';
export const ARCADE_MACHINE_CAMERA_POSITION = new Vector3(-1.7, 5.5, 2.3009);
export const ARCADE_MACHINE_CAMERA_QUATERNION = new Quaternion(
	-0.17756084520729903,
	-0.6844502511134536,
	-0.17756084520729903,
	0.6844502511134535
);
export const ARCADE_MACHINE_CAMERA_TARGET = new Vector3(3.25776, 2.74209, 2.3009);
