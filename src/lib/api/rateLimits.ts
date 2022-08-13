export const rateLimitMap = new Map<
	string,
	{
		timeWindowMs: number;
		maxRequests: number;
		lastRequestMs: number;
		requests: number;
	}
>();

export const rateLimit = (
	token: string,
	timeWindowMs: number = 60 * 1000,
	maxRequests: number = 5
): boolean => {
	const now = Date.now();
	const rateLimit = rateLimitMap.get(token);
	if (!rateLimit) {
		rateLimitMap.set(token, {
			timeWindowMs,
			maxRequests,
			lastRequestMs: now,
			requests: 1
		});
		return false;
	}
	if (now - rateLimit.lastRequestMs < timeWindowMs) {
		if (rateLimit.requests >= maxRequests) {
			return true;
		}
		rateLimit.requests++;
	} else {
		rateLimit.requests = 1;
		rateLimit.lastRequestMs = now;
	}

	rateLimitMap.set(token, rateLimit);
	return false;
};
