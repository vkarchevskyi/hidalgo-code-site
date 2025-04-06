<script lang="ts">
	import Button from '$lib/components/atoms/Button.svelte';
	import SparklingHighlight from '$lib/components/molecules/SparklingHighlight.svelte';
	import { onMount } from 'svelte';

	export let title: string;
	export let coverImage: string;
	export let shortDescription: string;
	export let platforms: string[] = [];
	export let storeLinks: { platform: string; url: string }[] = [];
	export let trailer: string | undefined = undefined;
	export let releaseDate: Date | undefined = undefined;

	let isParallax = true;
	let offsetY = 0;

	onMount(() => {
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			isParallax = false;
		}
	});

	function handleScroll(e) {
		if (!isParallax) return;
		offsetY = window.pageYOffset * 0.5;
	}

	$: formattedReleaseDate = releaseDate ? new Date(releaseDate).toLocaleDateString() : 'Coming soon';
</script>

<svelte:window on:scroll={handleScroll} />

<section id="game-hero" class="game-hero">
	<div class="hero-background" style="transform: translateY({offsetY}px)">
		<div class="overlay"></div>
		<img src={coverImage} alt={title} />
	</div>
	
	<div class="hero-content">
		<h1>
			<SparklingHighlight color="secondary">{title}</SparklingHighlight>
		</h1>
		
		<p class="tagline">{shortDescription}</p>
		
		<div class="platforms">
			{#each platforms as platform}
				<span class="platform">{platform}</span>
			{/each}
			<span class="release-date">Release: {formattedReleaseDate}</span>
		</div>
		
		<div class="cta-buttons">
			{#if trailer}
				<Button href={trailer} variant="secondary">Watch Trailer</Button>
			{/if}
			
			{#if storeLinks && storeLinks.length > 0}
				{#each storeLinks as link}
					<Button href={link.url}>Buy on {link.platform}</Button>
				{/each}
			{:else}
				<Button>Coming Soon</Button>
			{/if}
		</div>
	</div>
</section>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';
	
	.game-hero {
		position: relative;
		height: 80vh;
		min-height: 600px;
		display: flex;
		align-items: center;
		overflow: hidden;
		
		@include for-phone-only {
			height: auto;
			min-height: 500px;
		}
	}
	
	.hero-background {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: 0;
		
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		
		.overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0.7) 0%,
				rgba(0, 0, 0, 0.5) 50%,
				rgba(0, 0, 0, 0.8) 100%
			);
			z-index: 1;
		}
	}
	
	.hero-content {
		position: relative;
		z-index: 2;
		color: white;
		width: 80%;
		max-width: 1200px;
		margin: 0 auto;
		padding: 2rem;
		
		h1 {
			font-size: 4rem;
			margin-bottom: 1rem;
			text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			
			@include for-phone-only {
				font-size: 2.5rem;
			}
		}
		
		.tagline {
			font-size: 1.5rem;
			margin-bottom: 2rem;
			max-width: 600px;
			text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
			
			@include for-phone-only {
				font-size: 1.2rem;
			}
		}
		
		.platforms {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			margin-bottom: 2rem;
			
			.platform, .release-date {
				background-color: rgba(255, 255, 255, 0.2);
				padding: 0.5rem 1rem;
				border-radius: 20px;
				font-weight: 600;
				font-size: 0.9rem;
				backdrop-filter: blur(10px);
			}
		}
		
		.cta-buttons {
			display: flex;
			gap: 1rem;
			flex-wrap: wrap;
		}
	}
</style>
