<script lang="ts">
	import { authors } from '../../routes/blog/_authors';
	import dayjs from 'dayjs';

	export let metadata: {
		category: string;
		title: string;
		description: string;
		author: string;
		date: string;
	};
</script>

<header class="blog-hero">
	<div class="blog-head">
		<p class="blog-head-category">{metadata.category}</p>
		<h1 class="blog-head-title">{metadata.title}</h1>
	</div>
	<div class="blog-meta">
		<img
			loading="lazy"
			no-grab
			class="blog-meta-avatar"
			src={authors[metadata.author ?? 'CRBT'].avatar}
			alt=""
		/>
		<div class="blog-author">
			<p class="blog-author-name">{metadata.author ?? 'CRBT'}</p>
			<time class="blog-meta-date" datetime={dayjs(metadata.date).toISOString()}>
				{dayjs(metadata.date).format('MMMM D, YYYY')}
			</time>
		</div>
	</div>
</header>
