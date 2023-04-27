import { formatError } from './genericErrors';

export function handlePagination(url: URL, defaultLimit = 10) {
	let paginationError: any;
	let limit = Number(url.searchParams.get('limit') || defaultLimit);
	let page = Number(url.searchParams.get('page') || 0);

	if (isNaN(limit)) {
		paginationError = formatError("Expected number on property 'limit'", 401);
	}

	if (isNaN(page)) {
		paginationError = formatError("Expected number on property 'page'", 401);
	}

	return {
		paginationError,
		limit,
		page
	};
}
