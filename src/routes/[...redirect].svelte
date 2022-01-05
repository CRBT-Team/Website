<script context="module" lang="ts">
	import { redirects } from '$lib/redirects';
	import type { RequestHandler } from '@sveltejs/kit';

	export const load: RequestHandler = ({ url }) => {
		const path = url.pathname.split('/');

		for (const [key, value] of Object.entries(redirects)) {
			if (key === url.pathname)
				return {
					redirect: value,
					status: 301
				};
			else if (key === `/${path[1]}/*`)
				return {
					redirect: value.replace('/*', url.pathname.replace(`/${path[1]}`, '') ?? ''),
					status: 301
				};
		}
	};
</script>
