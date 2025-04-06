<script lang="ts">
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import { onMount } from 'svelte';

	export let images: string[] = [];
	export let title: string;
	
	let currentIndex = 0;
	let isFullscreen = false;
	let autoplayInterval: ReturnType<typeof setInterval>;
	
	onMount(() => {
		startAutoplay();
		return () => clearInterval(autoplayInterval);
	});
	
	function startAutoplay() {
		clearInterval(autoplayInterval);
		autoplayInterval = setInterval(() => {
			currentIndex = (currentIndex + 1) % images.length;
		}, 5000);
	}
	
	function pauseAutoplay() {
		clearInterval(autoplayInterval);
	}
	
	function changeImage(index: number) {
		currentIndex = index;
		startAutoplay();
	}
	
	function toggleFullscreen() {
		isFullscreen = !isFullscreen;
		if (isFullscreen) {
			pauseAutoplay();
		} else {
			startAutoplay();
		}
	}
</script>

<ContentSection id="gallery" title="Screenshots & Artwork">
	<div class="gallery-container">
		<div class="main-image" on:click={toggleFullscreen}>
			<img src={images[currentIndex]} alt={`${title} screenshot ${currentIndex + 1}`} />
			<div class="controls">
				<button 
					on:click|stopPropagation={() => changeImage((currentIndex - 1 + images.length) % images.length)}
					class="nav-button prev"
					aria-label="Previous image"
				>
					←
				</button>
				<button 
					on:click|stopPropagation={() => changeImage((currentIndex + 1) % images.length)}
					class="nav-button next"
					aria-label="Next image"
				>
					→
				</button>
			</div>
			<div class="fullscreen-hint">Click to enlarge</div>
		</div>
		
		<div class="thumbnails">
			{#each images as image, i}
				<div 
					class="thumbnail" 
					class:active={i === currentIndex}
					on:click={() => changeImage(i)}
				>
					<img src={image} alt={`${title} thumbnail ${i + 1}`} />
				</div>
			{/each}
		</div>
	</div>
</ContentSection>

{#if isFullscreen}
	<div class="fullscreen-overlay" on:click={toggleFullscreen}>
		<div class="fullscreen-content" on:click|stopPropagation>
			<img src={images[currentIndex]} alt={`${title} screenshot ${currentIndex + 1}`} />
			<button class="close-button" on:click={toggleFullscreen}>×</button>
			<div class="fs-controls">
				<button 
					on:click={() => changeImage((currentIndex - 1 + images.length) % images.length)}
					class="fs-nav-button prev"
				>
					←
				</button>
				<span class="counter">{currentIndex + 1} / {images.length}</span>
				<button 
					on:click={() => changeImage((currentIndex + 1) % images.length)}
					class="fs-nav-button next"
				>
					→
				</button>
			</div>
		</div>
	</div>
{/if}

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.gallery-container {
		width: 100%;
	}
	
	.main-image {
		position: relative;
		width: 100%;
		height: 500px;
		overflow: hidden;
		border-radius: 12px;
		margin-bottom: 1rem;
		cursor: pointer;
		
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s ease;
		}
		
		&:hover {
			img {
				transform: scale(1.02);
			}
			
			.controls {
				opacity: 1;
			}
			
			.fullscreen-hint {
				opacity: 1;
			}
		}
		
		.controls {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			opacity: 0;
			transition: opacity 0.3s ease;
			
			.nav-button {
				background: rgba(0, 0, 0, 0.5);
				color: white;
				border: none;
				width: 50px;
				height: 50px;
				border-radius: 50%;
				font-size: 1.5rem;
				cursor: pointer;
				display: flex;
				align-items: center;
				justify-content: center;
				margin: 0 1rem;
				backdrop-filter: blur(5px);
				
				&:hover {
					background: rgba(0, 0, 0, 0.7);
				}
			}
		}
		
		.fullscreen-hint {
			position: absolute;
			bottom: 20px;
			right: 20px;
			background: rgba(0, 0, 0, 0.5);
			color: white;
			padding: 0.5rem 1rem;
			border-radius: 20px;
			font-size: 0.9rem;
			opacity: 0;
			transition: opacity 0.3s ease;
			backdrop-filter: blur(5px);
		}
	}
	
	.thumbnails {
		display: flex;
		gap: 1rem;
		overflow-x: auto;
		padding-bottom: 1rem;
		
		.thumbnail {
			width: 120px;
			height: 80px;
			flex-shrink: 0;
			cursor: pointer;
			position: relative;
			border-radius: 8px;
			overflow: hidden;
			
			&::after {
				content: '';
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				border: 3px solid transparent;
				box-sizing: border-box;
				transition: all 0.3s ease;
			}
			
			&.active::after {
				border-color: var(--color--primary);
			}
			
			img {
				width: 100%;
				height: 100%;
				object-fit: cover;
			}
			
			&:hover img {
				opacity: 0.8;
			}
		}
	}
	
	.fullscreen-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.9);
		z-index: 1000;
		display: flex;
		align-items: center;
		justify-content: center;
		
		.fullscreen-content {
			position: relative;
			max-width: 90vw;
			max-height: 90vh;
			
			img {
				max-width: 100%;
				max-height: 90vh;
				object-fit: contain;
			}
			
			.close-button {
				position: absolute;
				top: -40px;
				right: 0;
				background: none;
				border: none;
				color: white;
				font-size: 2rem;
				cursor: pointer;
				
				&:hover {
					color: var(--color--primary);
				}
			}
			
			.fs-controls {
				position: absolute;
				bottom: -50px;
				left: 0;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 2rem;
				
				.fs-nav-button {
					background: rgba(255, 255, 255, 0.2);
					color: white;
					border: none;
					width: 40px;
					height: 40px;
					border-radius: 50%;
					font-size: 1.2rem;
					cursor: pointer;
					
					&:hover {
						background: var(--color--primary);
					}
				}
				
				.counter {
					color: white;
					font-size: 1rem;
				}
			}
		}
	}
</style>
