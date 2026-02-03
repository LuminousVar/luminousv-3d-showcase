import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	assetsInclude: ['**/*.glb', '**/*.gltf', '**/*.ktx2'],
	optimizeDeps: {
		exclude: ['three']
	},
	ssr: {
		noExternal: ['three']
	}
});
