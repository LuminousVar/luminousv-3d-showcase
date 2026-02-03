<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import Experience from "$lib/Experience/Experience";
	import { div } from "three/tsl";

    let webglContainer: HTMLDivElement | undefined = $state();
    let cssContainer: HTMLDivElement | undefined = $state();
	let experience: Experience | null = null;
	let isLoading = $state(true);
	let loadingProgress = $state(0);
	let isMobile = $state(false);

</script>

<svelte:head>
    <title>LuminousV | Portofolio</title>
    <meta name="description" content="Interactive 3D Portofolio built with Bun, SvelteKit, Three.js and GASP">
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
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
			<path d="M19 12H5M12 19l-7-7 7-7"/>
		</svg>
		<span>Back</span>
    </button>

    <!-- Navigation banner -->
    <nav class="banner">
		<div class="banner-container">
			<button class="banner-link" id="leftMonitor" title="About Me - Fedora Desktop">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="8" r="4"/>
					<path d="M20 21a8 8 0 1 0-16 0"/>
				</svg>
				<span>About Me</span>
			</button>
			<button class="banner-link" id="rightMonitor" title="Lofi Music & Chill">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"/>
					<path d="M9 12l2 2 4-4"/>
					<path d="M12 6v6l4 2"/>
				</svg>
				<span>Lofi Music</span>
			</button>
			<button class="banner-link" id="arcadeMachine" title="Play Arcade Games">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<rect x="2" y="6" width="20" height="12" rx="2"/>
					<line x1="6" y1="12" x2="6" y2="12"/>
					<line x1="10" y1="12" x2="10" y2="12"/>
					<circle cx="17" cy="12" r="2"/>
				</svg>
				<span>Arcade</span>
			</button>
			<div class="banner-divider"></div>
			<button class="banner-link docs-toggle" id="docsToggle" title="Blog & Configuration Notes">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
					<polyline points="14 2 14 8 20 8"/>
					<line x1="16" y1="13" x2="8" y2="13"/>
					<line x1="16" y1="17" x2="8" y2="17"/>
					<polyline points="10 9 9 9 8 9"/>
				</svg>
				<span>Docs</span>
			</button>
		</div>
	</nav>

{/if}

<style></style>