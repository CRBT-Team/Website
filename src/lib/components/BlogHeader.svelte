<script lang="ts">
	import { authors as authorData } from '../../routes/blog/_authors';
	import dayjs from 'dayjs';

	export let metadata: {
		category: string;
		title: string;
		description: string;
		author: string | string[];
		date: string;
		minutes?: number;
		banner?: string;
	};

	let authors =
		typeof metadata.author === 'object'
			? metadata.author.map((author) => authorData.find(({ id }) => author === id))
			: [authorData.find(({ id }) => id === metadata.author)];
</script>

<header class="blog-hero">
	{#if metadata.banner}
		<div class="blog-hero-banner">
			<img src={metadata.banner} alt={metadata.title} />
		</div>
	{/if}
	<div class="blog-head">
		<p class="blog-head-category">{metadata.category}</p>
		<h1 class="blog-head-title">{metadata.title}</h1>
	</div>
	<div class="blog-meta">
		{#if authors.length > 1}
			<div class="avatar-stack">
				{#each authors as author}
					<img
						loading="lazy"
						draggable="false"
						class="blog-meta-avatar"
						src={author.pfp}
						alt={author.name}
					/>
				{/each}
			</div>
		{:else}
			<img
				loading="lazy"
				draggable="false"
				class="blog-meta-avatar"
				src={authors[0].pfp}
				alt={authors[0].name}
			/>
		{/if}
		<div class="blog-author">
			<p class="blog-author-name">{authors.map(({ name }) => name).join(' & ')}</p>
			<span class="blog-meta-date">
				<time datetime={dayjs(metadata.date).toISOString()}>
					{dayjs(metadata.date).format('MMMM D, YYYY')}
				</time>
				{#if metadata.minutes}
					• {metadata.minutes} minutes read
				{/if}
			</span>
		</div>
	</div>
</header>

<style lang="scss">
	header.blog-hero {
		.blog-hero-banner {
			display: flex;
			justify-content: center;
			margin-bottom: 1rem;
			img {
				max-width: 100%;
				width: 100%;
				height: 300px;
				margin: 0 auto;
				object-fit: cover;
			}
		}

		.blog-head {
			p.blog-head-category {
				margin: 0;
				font-size: 1.5rem;
				color: var(--light);
				text-transform: uppercase;
				font-weight: 500;
			}
			h1.blog-head-title {
				margin: 0 0 0.5rem;
				font-size: 2.5rem;
			}
		}
		.blog-meta {
			display: flex;
			padding: 1rem 0;
			align-items: center;
			gap: 0.5rem;

			img.blog-meta-avatar {
				height: 70px;
				width: 70px;
				border-radius: 50%;
				border: 4px solid var(--bg);
			}

			.avatar-stack {
				display: flex;
				flex-direction: row;
				padding-right: 1rem;
				img.blog-meta-avatar {
					margin: 0 -1rem 0 0;
				}
			}
			.blog-author {
				p.blog-author-name {
					margin: 0;
					font-size: 1.3rem;
					font-weight: 500;
				}
				.blog-meta-date {
					opacity: 0.9;
				}
			}
		}
	}
</style>
