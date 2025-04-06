<script lang="ts">
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';

	export let features: { title: string; description: string; icon?: string }[] = [];
</script>

<ContentSection id="features" title="Game Features">
	<div class="features-grid">
		{#each features as feature}
			<div class="feature-card">
				{#if feature.icon}
					<div class="icon">
						<img src={feature.icon} alt={feature.title} />
					</div>
				{/if}
				<h3>{feature.title}</h3>
				<p>{feature.description}</p>
			</div>
		{/each}
	</div>
</ContentSection>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.features-grid {
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 2rem;
		
		@include for-tablet-portrait-down {
			grid-template-columns: repeat(2, 1fr);
		}
		
		@include for-phone-only {
			grid-template-columns: 1fr;
		}
	}
	
	.feature-card {
		background: var(--color--card-background);
		padding: 2rem;
		border-radius: 12px;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
		transition: transform 0.3s ease, box-shadow 0.3s ease;
		
		&:hover {
			transform: translateY(-5px);
			box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
		}
		
		.icon {
			width: 60px;
			height: 60px;
			margin-bottom: 1.5rem;
			
			img {
				width: 100%;
				height: 100%;
				object-fit: contain;
			}
		}
		
		h3 {
			margin-bottom: 1rem;
			color: var(--color--primary);
		}
		
		p {
			color: var(--color--text);
			line-height: 1.6;
		}
	}
</style>
