<script lang="ts">
	export let src: string;
	export let alt: string;
	export let size = '4rem';
</script>

<div class="avatar" style="--size: {size}" {...$$restProps}>
	<img {src} {alt} />
</div>

<style lang="scss">
	.avatar {
		width: var(--size);
		height: var(--size);

		img {
			width: var(--size);
			height: var(--size);
			object-fit: cover;
			border-radius: 2rem;
			max-width: max-content;
		}
	}
</style>
