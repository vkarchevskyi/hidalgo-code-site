<script lang="ts">
	import type { BlogPost, Game } from '$lib/utils/types';
	import GameHero from '$lib/components/organisms/GameHero.svelte';
	import GameFeatures from '$lib/components/organisms/GameFeatures.svelte';
	import GameGallery from '$lib/components/organisms/GameGallery.svelte';
	import GameAwards from '$lib/components/organisms/GameAwards.svelte';
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import Header from '$lib/components/organisms/Header.svelte';
	import BlogPostCard from '$lib/components/molecules/BlogPostCard.svelte';

	export let data: { game: Game, posts: BlogPost[] };
	$: ({ game, posts } = data);
</script>

<div class="game-page">
	<Header />

	<GameHero 
		title={game.title}
		coverImage={game.coverImage}
		shortDescription={game.shortDescription}
		platforms={game.platforms}
		storeLinks={game.storeLinks}
		trailer={game.trailer}
		releaseDate={game.releaseDate}
	/>
	
	<ContentSection id="about" title="About the Game">
		<div class="about-content">
			{@html game.description}
		</div>
	</ContentSection>
	
	{#if game.features && game.features.length > 0}
		<div class="section-container">
			<GameFeatures features={game.features} />
		</div>
	{/if}
	
	{#if game.gallery && game.gallery.length > 0}
		<div class="section-container">
			<GameGallery images={game.gallery} title={game.title} />
		</div>
	{/if}
	
	{#if game.awards && game.awards.length > 0}
		<div class="section-container">
			<GameAwards awards={game.awards} />
		</div>
	{/if}

	{#if posts && posts.length > 0}
		<ContentSection
			id="recent-posts"
			title="Blog posts"
			align="top"
		>
			<div class="grid">
				{#each posts as post}
					<BlogPostCard
						slug={post.slug}
						title={post.title}
						excerpt={post.excerpt}
						tags={post.tags}
						readingTime={post.readingTime}
						showImage={false}
					/>
				{/each}
			</div>
		</ContentSection>
	{/if}
	
	<ContentSection id="game-cta" title="Ready to Play?" align="top">
		<div class="cta-section">
			<p>Start your adventure today and join thousands of players in {game.title}!</p>
			<div class="cta-buttons">
				{#if game.storeLinks && game.storeLinks.length > 0}
					{#each game.storeLinks as link}
						<Button href={link.url} variant="primary" size="large">
							Buy on {link.platform} {game.price ? `- ${game.price}` : ''}
						</Button>
					{/each}
				{:else}
					<Button size="large">Coming Soon</Button>
				{/if}
			</div>
		</div>
	</ContentSection>
</div>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.game-page {
		background: var(--color--page-background);
	}
	
	.about-content {
		max-width: 800px;
		margin: 0 auto;
		font-size: 1.1rem;
		line-height: 1.7;
		
		:global(p) {
			margin-bottom: 1.5rem;
		}
		
		:global(h2), :global(h3) {
			margin-top: 2rem;
			margin-bottom: 1rem;
			color: var(--color--primary);
		}
		
		:global(ul), :global(ol) {
			margin-bottom: 1.5rem;
			padding-left: 1.5rem;
			
			:global(li) {
				margin-bottom: 0.5rem;
			}
		}
		
		.cta-section {
			margin-top: 3rem;
			padding: 2rem;
			background: var(--color--card-background);
			border-radius: 12px;
			box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
			text-align: center;
			
			.price {
				font-size: 2rem;
				font-weight: 700;
				color: var(--color--primary);
				margin-bottom: 1.5rem;
			}
			
			.cta-buttons {
				display: flex;
				justify-content: center;
				gap: 1rem;
				flex-wrap: wrap;
			}
		}
	}

	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 0 20px;
	}
	
	.game-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
		margin-top: 1rem;
	}
	
	.cta-section {
		text-align: center;
		max-width: 800px;
		margin: 0 auto;
		
		p {
			font-size: 1.2rem;
			margin-bottom: 2rem;
		}
		
		.cta-buttons {
			display: flex;
			flex-wrap: wrap;
			gap: 1rem;
			justify-content: center;
		}
	}

	.section-container {
		max-width: 1200px;
		margin: 0 auto;
		width: 100%;
		padding: 0 20px;
	}
</style>
