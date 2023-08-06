import { formatError } from './genericErrors';
import { MASTER_TOKEN } from '$env/static/private';

export async function validateAccess(request: Request) {
	let errorMessage: ReturnType<typeof formatError> | null = null;

	if (!request.headers.get('Authorization')) {
		errorMessage = formatError('You must provide an Authorization header');
	}

	if (request.headers.get('Authorization') !== MASTER_TOKEN) {
		errorMessage = formatError('Invalid token');
	}

	return {
		errorMessage
	};
}
