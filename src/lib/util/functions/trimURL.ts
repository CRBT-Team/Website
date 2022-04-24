export const trimURL = (url: string) => {
	// only keep the domain
	return url.replace(/^(?:https?:\/\/)?(?:www\.)?/, '').replace(/\/.*$/, '');

	// return url
	// 	.replace(/^https?:\/\/(www\.)?/i, '')
	// 	.replace(/\?.*$/, '')
	// 	.replace(/\/$/, '');
};
