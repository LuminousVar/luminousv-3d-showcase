export interface AssetItem {
	name: string;
	source: string | string[];
	type?: 'model' | 'texture' | 'cubeTexture';
}

export interface AssetGroup {
	name: string;
	data: Record<string, unknown>;
	items: AssetItem[];
}

const assets: AssetGroup[] = [
	{
		name: 'base',
		data: {},
		items: [
			{
				name: 'topChairModel',
				source: '/assets/models/topChair.glb',
				type: 'model'
			},
			{
				name: 'rubiksCube',
				source: '/assets/models/Rubik.glb',
				type: 'model'
			},
			{
				name: 'skyTexture',
				source: '/assets/textures/skyTexture.ktx2',
				type: 'texture'
			},
			{
				name: 'baked1',
				source: '/assets/textures/baked1.ktx2',
				type: 'texture'
			},
			{
				name: 'baked2',
				source: '/assets/textures/baked2.ktx2',
				type: 'texture'
			},
			{
				name: 'baked3',
				source: '/assets/textures/baked3.ktx2',
				type: 'texture'
			},
			{
				name: '_roomModel',
				source: '/assets/models/room.glb',
				type: 'model'
			},
			{
				name: '_roomModel2',
				source: '/assets/models/room2.glb',
				type: 'model'
			},
			{
				name: '_roomModel3',
				source: '/assets/models/room3.glb',
				type: 'model'
			},
			{
				name: 'leftMonitor',
				source: '/assets/models/leftMonitor.glb',
				type: 'model'
			},
			{
				name: 'rightMonitor',
				source: '/assets/models/rightMonitor.glb',
				type: 'model'
			},
			{
				name: 'arcadeMachine',
				source: '/assets/models/arcadeMachine.glb',
				type: 'model'
			},
			{
				name: 'linkedin',
				source: '/assets/models/linkedin.glb',
				type: 'model'
			},
			{
				name: 'github',
				source: '/assets/models/github.glb',
				type: 'model'
			},
			{
				name: 'itchio',
				source: '/assets/models/itchio.glb',
				type: 'model'
			}
		]
	}
];

export default assets;
