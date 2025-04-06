<script lang="ts">
	import ContentSection from '$lib/components/organisms/ContentSection.svelte';

	export let systemRequirements: {
		minimal: { [key: string]: string };
		recommended?: { [key: string]: string };
	};
	
	let activeTab = 'minimal';
</script>

<ContentSection id="system-requirements" title="System Requirements">
	<div class="requirements-container">
		<div class="tabs">
			<button 
				class:active={activeTab === 'minimal'} 
				on:click={() => activeTab = 'minimal'}
			>
				Minimal
			</button>
			
			{#if systemRequirements.recommended}
				<button 
					class:active={activeTab === 'recommended'} 
					on:click={() => activeTab = 'recommended'}
				>
					Recommended
				</button>
			{/if}
		</div>
		
		<div class="requirements-content">
			{#if activeTab === 'minimal'}
				<div class="requirements-list">
					{#each Object.entries(systemRequirements.minimal) as [key, value]}
						<div class="requirement-item">
							<div class="requirement-label">{key}</div>
							<div class="requirement-value">{value}</div>
						</div>
					{/each}
				</div>
			{:else if systemRequirements.recommended}
				<div class="requirements-list">
					{#each Object.entries(systemRequirements.recommended) as [key, value]}
						<div class="requirement-item">
							<div class="requirement-label">{key}</div>
							<div class="requirement-value">{value}</div>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</div>
</ContentSection>

<style lang="scss">
	@import '$lib/scss/breakpoints.scss';

	.requirements-container {
		width: 100%;
		max-width: 800px;
		margin: 0 auto;
	}
	
	.tabs {
		display: flex;
		margin-bottom: 2rem;
		border-bottom: 1px solid var(--color--border);
		
		button {
			background: none;
			border: none;
			padding: 1rem 2rem;
			font-size: 1rem;
			font-weight: 600;
			color: var(--color--text-shade);
			cursor: pointer;
			position: relative;
			
			&:after {
				content: '';
				position: absolute;
				bottom: -1px;
				left: 0;
				width: 100%;
				height: 3px;
				background: transparent;
				transition: background 0.3s ease;
			}
			
			&.active {
				color: var(--color--primary);
				
				&:after {
					background: var(--color--primary);
				}
			}
			
			&:hover:not(.active) {
				color: var(--color--text);
			}
		}
	}
	
	.requirements-list {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1.5rem;
		
		@include for-phone-only {
			grid-template-columns: 1fr;
		}
		
		.requirement-item {
			.requirement-label {
				font-weight: 600;
				margin-bottom: 0.5rem;
				color: var(--color--primary);
			}
			
			.requirement-value {
				color: var(--color--text);
			}
		}
	}
</style>
