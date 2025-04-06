<script lang="ts">
	import Hero from '$lib/components/organisms/Hero.svelte';
	import About from '$lib/components/organisms/About.svelte';
	import RecentPosts from '$lib/components/organisms/RecentPosts.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import type { Feature, BlogPost, Game } from '$lib/utils/types';
	import { onMount } from 'svelte';

	export let data: {
		features: Feature[];
		posts: BlogPost[];
		games: Game[];
	};

	let { posts, games } = data;
	let gameElements: HTMLElement[] = [];
	
	onMount(() => {
		// Setup intersection observer for animation on scroll
		if (typeof IntersectionObserver !== 'undefined') {
			const observer = new IntersectionObserver(
				(entries) => {
					entries.forEach(entry => {
						if (entry.isIntersecting) {
							entry.target.classList.add('visible');
							observer.unobserve(entry.target);
						}
					});
				},
				{ threshold: 0.2 }
			);
			
			gameElements.forEach(el => observer.observe(el));
		} else {
			// Fallback for browsers that don't support IntersectionObserver
			gameElements.forEach(el => el.classList.add('visible'));
		}
	});
</script>

<div class="container">
	<Hero />
	<About />
	
	{#if games && games.length > 0}
		<section id="games">
			<h2 class="section-title">Our Games</h2>
			
			{#each games as game, i}
				<div 
					class="game-section {i % 2 === 0 ? 'left' : 'right'}" 
					bind:this={gameElements[i]}
				>
					<div class="game-image">
						<img src={game.coverImage} alt={game.title} />
						<div class="game-image-overlay"></div>
					</div>
					<div class="game-content">
						<h3>{game.title}</h3>
						<p>{game.shortDescription}</p>
						
						<div class="game-meta">
							{#if game.platforms && game.platforms.length > 0}
								<div class="platforms">
									{#each game.platforms as platform}
										<span class="platform">{platform}</span>
									{/each}
								</div>
							{/if}
							
							{#if game.tags && game.tags.length > 0}
								<div class="tags">
									{#each game.tags.slice(0, 3) as tag}
										<span class="tag">{tag}</span>
									{/each}
								</div>
							{/if}
						</div>
						
						<div class="game-cta">
							<Button href={`/games/${game.slug}`}>Learn More</Button>
							{#if game.storeLinks && game.storeLinks.length > 0}
								<Button href={game.storeLinks[0].url} style="understated">
									Buy Now {game.price ? game.price : ''}
								</Button>
							{/if}
						</div>
					</div>
				</div>
			{/each}
		</section>
	{/if}
	
	{#if posts && posts.length > 0}
		<RecentPosts {posts} />
	{/if}
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';
	
	.section-title {
		text-align: center;
		font-size: 2.5rem;
		margin: 80px 0 60px;
		color: var(--color--primary);
		position: relative;
		
		&::after {
			content: '';
			position: absolute;
			bottom: -15px;
			left: 50%;
			transform: translateX(-50%);
			width: 80px;
			height: 4px;
			background: var(--color--primary);
			border-radius: 2px;
		}
	}
	
	.game-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 60px;
		margin-bottom: 120px;
		opacity: 1;
		transform: translateY(50px);
		transition: opacity 0.8s ease, transform 0.8s ease;
		
		&.visible {
			opacity: 1;
			transform: translateY(0);
		}
		
		&.right {
			direction: rtl;
			
			.game-content {
				direction: ltr;
			}
			
			.game-image {
				direction: ltr;
			}
		}
		
		@include for-tablet-portrait-down {
			grid-template-columns: 1fr;
			direction: ltr;
			gap: 30px;
			margin-bottom: 80px;
			
			.game-content {
				direction: ltr;
			}
		}
	}
	
	.game-image {
		position: relative;
		height: 400px;
		border-radius: 12px;
		overflow: hidden;
		box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
		transition: transform 0.3s ease;
		
		&:hover {
			transform: translateY(-10px);
			
			img {
				transform: scale(1.05);
			}
		}
		
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.5s ease;
		}
		
		.game-image-overlay {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background: linear-gradient(
				to bottom,
				rgba(0, 0, 0, 0.1) 0%,
				rgba(0, 0, 0, 0.3) 100%
			);
		}
	}
	
	.game-content {
		display: flex;
		flex-direction: column;
		justify-content: center;
		
		h3 {
			font-size: 2.2rem;
			margin-bottom: 20px;
			color: var(--color--primary);
		}
		
		p {
			font-size: 1.1rem;
			line-height: 1.6;
			margin-bottom: 30px;
			color: var(--color--text);
		}
	}
	
	.game-meta {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		margin-bottom: 30px;
		
		.platforms, .tags {
			display: flex;
			flex-wrap: wrap;
			gap: 8px;
		}
		
		.platform, .tag {
			padding: 6px 14px;
			border-radius: 20px;
			font-size: 0.9rem;
			font-weight: 600;
		}
		
		.platform {
			background-color: var(--color--card-background);
			color: var(--color--text);
			box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
		}
		
		.tag {
			background-color: var(--color--primary-tint);
			color: var(--color--primary);
		}
	}
	
	.game-cta {
		display: flex;
		gap: 15px;
		
		@include for-phone-only {
			flex-direction: column;
			width: 100%;
			
			:global(a) {
				width: 100%;
				text-align: center;
			}
		}
	}
	
	.games-cta {
		display: flex;
		justify-content: center;
		margin: 60px 0 100px;
		
		:global(a) {
			padding: 12px 40px;
		}
	}
</style>
