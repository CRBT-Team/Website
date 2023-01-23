<script lang="ts">
	export let position: 'horizontal' | 'vertical' = 'vertical';
</script>

<div class="divider {position}" />

<style>
	.divider {
		--divider-margin: 15px;
		border: 0.5px solid var(--color-surface-variant);
	}

	.divider.vertical {
		width: 100%;
		margin: var(--divider-margin) 0;
	}

	.divider.horizontal {
		height: 100%;
		margin: 0 var(--divider-margin);
	}
</style>
