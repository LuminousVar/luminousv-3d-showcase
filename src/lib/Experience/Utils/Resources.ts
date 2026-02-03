import * as THREE from 'three';
import { GLTFLoader, type GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader.js';
import EventEmitter from './EventEmitter';
import { AssetGroup, type AssetItem } from '../assets';

export default class Resources extends EventEmitter {
	items: Record<string, LoadedItem> = {};
	private toLoad = 0;
	private loaded = 0;
	private groups: AssetGroup[];
	private gltfLoader: GLTFLoader;
	private textureLoader: THREE.TextureLoader;
	private cubeTextureLoader: THREE.CubeTextureLoader;
	private ktx2Loader: KTX2Loader | null = null;
	private renderer: THREE.WebGLRenderer | null = null;

	constructor(assets: AssetGroup[]) {
		super();
		this.groups = assets;

		// Setup loaders
		const dracoLoader = new DRACOLoader();
		dracoLoader.setDecoderPath('/draco/');

		this.gltfLoader = new GLTFLoader();
		this.gltfLoader.setDRACOLoader(dracoLoader);

		this.textureLoader = new THREE.TextureLoader();
		this.cubeTextureLoader = new THREE.CubeTextureLoader();
	}

	setRenderer(renderer: THREE.WebGLRenderer): void {
		this.renderer = renderer;

		// Setup KTX2 loader with renderer
		this.ktx2Loader = new KTX2Loader();
		this.ktx2Loader.setTranscoderPath('/basis/');
		this.ktx2Loader.detectSupport(renderer);

		// Start loading
		this.startLoading();
	}

	private startLoading(): void {
		this.groups.forEach((group) => {
			this.toLoad += group.items.length;

			group.items.forEach((item) => {
				this.loadItem(item, group.name);
			});
		});
	}

	private loadItem(item: AssetItem, groupName: string): void {
		const source = Array.isArray(item.source) ? item.source : [item.source];
		const isKTX2 = source[0].endsWith('.ktx2');
		const isGLB = source[0].endsWith('.glb') || source[0].endsWith('.gltf');
		const isCubeTexture = item.type === 'cubeTexture';

		if (isGLB || item.type === 'model') {
			this.gltfLoader.load(
				source[0],
				(gltf) => {
					this.itemLoaded(item.name, gltf, groupName);
				},
				undefined,
				(error) => {
					console.error(`Error loading model ${item.name}:`, error);
					this.itemLoaded(item.name, null, groupName);
				}
			);
		} else if (isKTX2 && this.ktx2Loader) {
			this.ktx2Loader.load(
				source[0],
				(texture) => {
					texture.flipY = false;
					texture.colorSpace = THREE.SRGBColorSpace;
					this.itemLoaded(item.name, texture, groupName);
				},
				undefined,
				(error) => {
					console.error(`Error loading KTX2 texture ${item.name}:`, error);
					this.itemLoaded(item.name, null, groupName);
				}
			);
		} else if (isCubeTexture && Array.isArray(item.source)) {
			this.cubeTextureLoader.load(
				item.source,
				(texture) => {
					this.itemLoaded(item.name, texture, groupName);
				},
				undefined,
				(error) => {
					console.error(`Error loading cube texture ${item.name}:`, error);
					this.itemLoaded(item.name, null, groupName);
				}
			);
		} else {
			this.textureLoader.load(
				source[0],
				(texture) => {
					this.itemLoaded(item.name, texture, groupName);
				},
				undefined,
				(error) => {
					console.error(`Error loading texture ${item.name}:`, error);
					this.itemLoaded(item.name, null, groupName);
				}
			);
		}
	}

	private itemLoaded(name: string, item: LoadedItem | null, groupName: string): void {
		if (item) {
			this.items[name] = item;
		}
		this.loaded++;

		this.emit('progress', { loaded: this.loaded, total: this.toLoad });

		if (this.loaded === this.toLoad) {
			this.emit('ready');
			this.emit('groupEnd', { name: groupName });
		}
	}

	get loader() {
		return {
			resourcesLoaded: this.loaded === this.toLoad
		};
	}
}
