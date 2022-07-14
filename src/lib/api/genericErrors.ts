export const unauthorized = {
	status: 401,
	body: {
		error: 'Unauthorized'
	}
};

export const badRequest = {
	status: 400,
	body: {
		error: 'Bad Request'
	}
};

export const internalServerError = {
	status: 500,
	body: {
		error: 'Internal Server Error'
	}
};
