<script lang="ts">
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';
	import type { Award } from '$lib/utils/types';

	export let awards: Award[] = [];
</script>

<ContentSection id="awards" title="Awards & Recognition">
	<div class="awards-grid">
		{#each awards as award}
			<div class="award-card">
				{#if award.image}
					<div class="award-image">
						<img src={award.image} alt="{award.name} award" />
					</div>
				{/if}
				<div class="award-content">
					<h3>{award.name}</h3>
					<p class="award-info">{award.organization} • {award.year}</p>
					{#if award.description}
						<p class="award-description">{award.description}</p>
					{/if}
				</div>
			</div>
		{/each}
	</div>
</ContentSection>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';
	
	.awards-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		width: 100%;
		
		@include for-tablet-portrait-down {
			grid-template-columns: repeat(2, 1fr);
		}
		
		@include for-phone-only {
			grid-template-columns: 1fr;
		}
	}
	
	.award-card {
		display: flex;
		flex-direction: column;
		background: var(--color--card-background);
		border-radius: 12px;
		overflow: hidden;
		box-shadow: var(--card-shadow);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		height: 100%;
		
		&:hover {
			transform: translateY(-5px);
			box-shadow: var(--card-shadow-hover);
		}
	}
	
	.award-image {
		height: 180px;
		overflow: hidden;
		
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
			transition: transform 0.3s ease;
		}
		
		&:hover img {
			transform: scale(1.05);
		}
	}
	
	.award-content {
		padding: 1.5rem;
		flex-grow: 1;
		display: flex;
		flex-direction: column;
		
		h3 {
			font-size: 1.4rem;
			margin-bottom: 0.5rem;
			color: var(--color--primary);
		}
		
		.award-info {
			font-size: 0.9rem;
			color: var(--color--text-shade);
			margin-bottom: 1rem;
		}
		
		.award-description {
			color: var(--color--text);
			font-size: 1rem;
			line-height: 1.5;
		}
	}
</style>
