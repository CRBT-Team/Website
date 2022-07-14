import { db } from '$lib/prisma';
import { jwt, type CRBTTokenPayload } from '.';

export async function validateAccess(request: Request) {
	let isAuthorized = true;

	if (!request.headers.has('Authorization')) isAuthorized = false;

	let token = await db.tokens.findFirst({
		where: { token: request.headers.get('Authorization') || undefined }
	});

	if (!token?.token) isAuthorized = false;

	const tokenData = jwt.verify(token?.token, process.env.JWT_SECRET) as CRBTTokenPayload;

	if (!tokenData) isAuthorized = false;

	return {
		isAuthorized,
		tokenData
	};
}
