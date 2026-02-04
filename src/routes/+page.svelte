<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';
	import Experience from '$lib/Experience/Experience';

	let webglContainer: HTMLDivElement | undefined = $state();
	let cssContainer: HTMLDivElement | undefined = $state();
	let experience: Experience | null = null;
	let isLoading = $state(true);
	let loadingProgress = $state(0);
	let isMobile = $state(false);

	onMount(() => {
		if (!browser) return;
		if (!webglContainer) return;

		// Checking if user is using mobile device
		isMobile =
			/Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
				navigator.userAgent
			) || window.innerWidth <= 768;

		if (isMobile) {
			isLoading = false;
			return;
		}

		experience = new Experience({
			webglElement: webglContainer,
			cssElement: cssContainer
		});

		// Loading Progress
		experience.resources.on('progress', (data) => {
			const progress = data as { loaded: number; total: number };
			loadingProgress = Math.round((progress.loaded / progress.total) * 100);
		});

		experience.resources.on('ready', () => {
			setTimeout(() => {
				isLoading = false;

				if (experience) {
					experience.navigation.activateControls();
				}
			}, 500);
		});
	});

	onDestroy(() => {
		if (experience) {
			experience.destroy();
		}
	});
</script>

<svelte:head>
	<title>LuminousV | Portofolio</title>
	<meta
		name="description"
		content="Interactive 3D Portofolio built with Bun, SvelteKit, Three.js and GASP"
	/>
</svelte:head>

{#if isMobile}
	<div class="mobile-notice">
		<h1>Mobile Not Supported</h1>
		<p>Please visit my portofolio on a desktop browser for full experience</p>
	</div>
{:else}
	<!-- Loading Screen -->
	{#if isLoading}
		<div class="loading-screen">
			<div class="loading-content">
				<h1>Loading.....</h1>
				<div class="progress-bar">
					<div class="progress-fill" style="width: {loadingProgress}%"></div>
				</div>
				<p>{loadingProgress}%</p>
			</div>
		</div>
	{/if}

	<!-- Back button -->
	<button id="back-button" class="back-button">
		<svg
			width="18"
			height="18"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="2.5"
			stroke-linecap="round"
			stroke-linejoin="round"
		>
			<path d="M19 12H5M12 19l-7-7 7-7" />
		</svg>
		<span>Back</span>
	</button>

	<!-- Navigation banner -->
	<nav class="banner">
		<div class="banner-container">
			<button class="banner-link" id="leftMonitor" title="About Me - Fedora Desktop">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="8" r="4" />
					<path d="M20 21a8 8 0 1 0-16 0" />
				</svg>
				<span>About Me</span>
			</button>
			<button class="banner-link" id="rightMonitor" title="Lofi Music & Chill">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<circle cx="12" cy="12" r="10" />
					<path d="M9 12l2 2 4-4" />
					<path d="M12 6v6l4 2" />
				</svg>
				<span>Lofi Music</span>
			</button>
			<button class="banner-link" id="arcadeMachine" title="Play Arcade Games">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<rect x="2" y="6" width="20" height="12" rx="2" />
					<line x1="6" y1="12" x2="6" y2="12" />
					<line x1="10" y1="12" x2="10" y2="12" />
					<circle cx="17" cy="12" r="2" />
				</svg>
				<span>Arcade</span>
			</button>
			<div class="banner-divider"></div>
			<button class="banner-link docs-toggle" id="docsToggle" title="Blog & Configuration Notes">
				<svg
					width="20"
					height="20"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				>
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
					<polyline points="14 2 14 8 20 8" />
					<line x1="16" y1="13" x2="8" y2="13" />
					<line x1="16" y1="17" x2="8" y2="17" />
					<polyline points="10 9 9 9 8 9" />
				</svg>
				<span>Docs</span>
			</button>
		</div>
	</nav>
{/if}

<style>
	:global(body) {
		margin: 0;
		padding: 0;
		overflow: hidden;
		background-color: #1a1a2e;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	}

	#webgl {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 2;
		pointer-events: auto;
	}

	#css3d {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 1;
		pointer-events: none;
		overflow: hidden;
	}

	:global(#css3d *) {
		pointer-events: inherit;
	}

	:global(#webgl canvas) {
		background: transparent !important;
	}

	.loading-screen {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1000;
	}

	.loading-content {
		text-align: center;
		color: white;
	}

	.loading-content h1 {
		font-size: 2rem;
		margin-bottom: 2rem;
		font-weight: 300;
	}

	.progress-bar {
		width: 300px;
		height: 4px;
		background: rgba(255, 255, 255, 0.2);
		border-radius: 2px;
		overflow: hidden;
		margin: 0 auto 1rem;
	}

	.progress-fill {
		height: 100%;
		background: linear-gradient(90deg, #e94560, #0f3460);
		transition: width 0.3s ease;
	}

	.loading-content p {
		font-size: 1rem;
		opacity: 0.7;
	}

	.back-button {
		position: fixed;
		top: 2rem;
		left: 2rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 0.5rem;
		padding: 0.65rem 1.25rem 0.65rem 1rem;
		background: rgba(15, 15, 25, 0.75);
		backdrop-filter: blur(20px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50px;
		color: rgba(255, 255, 255, 0.95);
		cursor: pointer;
		font-size: 0.95rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		z-index: 100;
		opacity: 0;
		transform: translateX(-20px);
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		pointer-events: none;
		box-shadow:
			0 4px 24px rgba(0, 0, 0, 0.2),
			0 2px 8px rgba(0, 0, 0, 0.15),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
	}

	.back-button svg {
		width: 18px;
		height: 18px;
		transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		stroke-width: 2.5;
	}

	.back-button span {
		line-height: 1;
		padding-top: 1px;
	}

	.back-button:global(.show-back-button) {
		opacity: 1;
		transform: translateX(0);
		pointer-events: auto;
	}

	.back-button:hover {
		background: rgba(20, 20, 35, 0.85);
		border-color: rgba(255, 255, 255, 0.2);
		box-shadow:
			0 6px 32px rgba(0, 0, 0, 0.3),
			0 3px 12px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.12);
		transform: translateX(0) scale(1.02);
	}

	.back-button:hover svg {
		transform: translateX(-2px);
	}

	.back-button:active {
		transform: translateX(0) scale(0.98);
	}

	.mobile-notice {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100vh;
		text-align: center;
		color: white;
		padding: 2rem;
		background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
	}

	.mobile-notice h1 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}

	.mobile-notice p {
		opacity: 0.7;
		max-width: 300px;
	}

	/* Navigation Banner */
	.banner {
		position: fixed;
		bottom: 2rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 100;
		pointer-events: auto;
		transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	/* Banner position when viewing left monitor */
	.banner:global(.banner-left) {
		left: 2rem;
		bottom: 50%;
		transform: translateX(0) translateY(50%);
	}

	.banner:global(.banner-left) .banner-container {
		flex-direction: column;
		padding: 0.75rem 0.5rem;
		border-radius: 16px;
	}

	.banner:global(.banner-left) .banner-link {
		width: 100%;
		justify-content: flex-start;
	}

	.banner:global(.banner-left) .banner-divider {
		width: 80%;
		height: 1px;
		margin: 0.25rem 0;
	}

	.banner-container {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		background: rgba(15, 15, 25, 0.8);
		backdrop-filter: blur(24px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50px;
		box-shadow:
			0 8px 32px rgba(0, 0, 0, 0.3),
			0 4px 16px rgba(0, 0, 0, 0.2),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
		transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
	}

	.banner-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.6rem 1rem;
		background: transparent;
		border: none;
		border-radius: 40px;
		color: rgba(255, 255, 255, 0.8);
		cursor: pointer;
		font-size: 0.875rem;
		font-weight: 500;
		letter-spacing: 0.02em;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		white-space: nowrap;
	}

	.banner-link svg {
		width: 18px;
		height: 18px;
		opacity: 0.8;
		transition: all 0.3s ease;
	}

	.banner-link:hover {
		background: rgba(255, 255, 255, 0.1);
		color: rgba(255, 255, 255, 1);
		transform: translateY(-2px);
	}

	.banner-link:hover svg {
		opacity: 1;
		transform: scale(1.1);
	}

	.banner-link:active {
		transform: translateY(0) scale(0.98);
	}

	.banner-divider {
		width: 1px;
		height: 24px;
		background: rgba(255, 255, 255, 0.15);
		margin: 0 0.25rem;
	}

	.docs-toggle {
		background: linear-gradient(135deg, rgba(233, 69, 96, 0.15), rgba(15, 52, 96, 0.15));
	}

	.docs-toggle:hover {
		background: linear-gradient(135deg, rgba(233, 69, 96, 0.3), rgba(15, 52, 96, 0.3));
	}

	/* Docs Panel */
	.docs-panel {
		position: fixed;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%) scale(0.9);
		width: min(90vw, 600px);
		max-height: 80vh;
		background: rgba(15, 15, 25, 0.95);
		backdrop-filter: blur(24px) saturate(180%);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 20px;
		box-shadow:
			0 24px 80px rgba(0, 0, 0, 0.5),
			0 8px 32px rgba(0, 0, 0, 0.3),
			inset 0 1px 0 rgba(255, 255, 255, 0.08);
		z-index: 200;
		opacity: 0;
		visibility: hidden;
		transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
		overflow: hidden;
	}

	.docs-panel:global(.show-docs) {
		opacity: 1;
		visibility: visible;
		transform: translate(-50%, -50%) scale(1);
	}

	.docs-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 1.25rem 1.5rem;
		border-bottom: 1px solid rgba(255, 255, 255, 0.1);
		background: rgba(255, 255, 255, 0.02);
	}

	.docs-header h2 {
		font-size: 1.25rem;
		font-weight: 600;
		color: white;
		margin: 0;
	}

	.docs-close {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		background: rgba(255, 255, 255, 0.05);
		border: 1px solid rgba(255, 255, 255, 0.1);
		border-radius: 50%;
		color: rgba(255, 255, 255, 0.7);
		cursor: pointer;
		transition: all 0.3s ease;
	}

	.docs-close:hover {
		background: rgba(233, 69, 96, 0.2);
		border-color: rgba(233, 69, 96, 0.4);
		color: white;
		transform: rotate(90deg);
	}

	.docs-content {
		padding: 1.5rem;
		overflow-y: auto;
		max-height: calc(80vh - 80px);
	}

	.docs-section {
		margin-bottom: 1.5rem;
		padding: 1rem;
		background: rgba(255, 255, 255, 0.03);
		border: 1px solid rgba(255, 255, 255, 0.06);
		border-radius: 12px;
		transition: all 0.3s ease;
	}

	.docs-section:hover {
		background: rgba(255, 255, 255, 0.05);
		border-color: rgba(255, 255, 255, 0.1);
	}

	.docs-section:last-child {
		margin-bottom: 0;
	}

	.docs-section h3 {
		font-size: 1rem;
		font-weight: 600;
		color: white;
		margin: 0 0 0.75rem 0;
	}

	.docs-section ul {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	.docs-section li {
		font-size: 0.875rem;
		color: rgba(255, 255, 255, 0.7);
		padding: 0.4rem 0;
		border-bottom: 1px solid rgba(255, 255, 255, 0.05);
	}

	.docs-section li:last-child {
		border-bottom: none;
	}

	.docs-section li strong {
		color: rgba(255, 255, 255, 0.9);
		font-weight: 500;
	}

	/* Scrollbar styling */
	.docs-content::-webkit-scrollbar {
		width: 6px;
	}

	.docs-content::-webkit-scrollbar-track {
		background: rgba(255, 255, 255, 0.05);
		border-radius: 3px;
	}

	.docs-content::-webkit-scrollbar-thumb {
		background: rgba(255, 255, 255, 0.2);
		border-radius: 3px;
	}

	.docs-content::-webkit-scrollbar-thumb:hover {
		background: rgba(255, 255, 255, 0.3);
	}

	/* Hugo Documentation Button */
	.hugo-redirect {
		text-align: center;
		background: linear-gradient(135deg, rgba(233, 69, 96, 0.1), rgba(15, 52, 96, 0.1));
		border-color: rgba(233, 69, 96, 0.2);
	}

	.docs-intro {
		font-size: 0.9rem;
		color: rgba(255, 255, 255, 0.8);
		line-height: 1.5;
		margin: 0.75rem 0 1.5rem 0;
	}

	.hugo-button {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.75rem 1.5rem;
		background: linear-gradient(135deg, #e94560, #0f3460);
		border: none;
		border-radius: 25px;
		color: white;
		font-size: 0.9rem;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
		box-shadow: 0 4px 16px rgba(233, 69, 96, 0.3);
	}

	.hugo-button:hover {
		transform: translateY(-2px) scale(1.05);
		box-shadow: 0 8px 24px rgba(233, 69, 96, 0.4);
	}

	.hugo-button:active {
		transform: translateY(0) scale(0.98);
	}

	.hugo-button svg {
		width: 18px;
		height: 18px;
		transition: transform 0.3s ease;
	}

	.hugo-button:hover svg {
		transform: translateX(2px) rotate(15deg);
	}
</style>
