<script lang="ts">
	import FeaturedGameCarousel from '$lib/components/organisms/FeaturedGameCarousel.svelte';
	import GameGrid from '$lib/components/organisms/GameGrid.svelte';
	
	export let data;
	const { allGames, featuredGames, gameCategories } = data;
</script>

{#if featuredGames && featuredGames.length > 0}
	<FeaturedGameCarousel games={featuredGames} />
{/if}

<div class="container">
	<GameGrid 
		games={allGames}
		title="All Games"
		description="Browse our full collection of amazing games"
	/>
	
	{#if gameCategories && gameCategories.length > 0}
		{#each gameCategories as category}
			{#if category.games.length > 0}
				<GameGrid
					games={category.games}
					title={category.name}
					description={`The best ${category.name} games in our collection`}
				/>
			{/if}
		{/each}
	{/if}
</div>

<style lang="scss">
	.container {
		max-width: 1200px;
		margin: 0 auto;
		padding: 50px 20px;
	}
</style>
