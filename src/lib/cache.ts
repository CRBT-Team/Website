import Cache from 'node-cache';

export const cache = new Cache({
	stdTTL: 60 * 60 * 24,
	checkperiod: 60 * 60 * 24,
	useClones: false
});

export async function fetchWithCache<T>(
	key: string,
	fetchMethod: () => T | Promise<T>,
	force = false,
	ttl?: number
): Promise<T> {
	const result = force ? await fetchMethod() : cache.get<T>(key) ?? (await fetchMethod());

	cache.set(key, result, ttl);

	return result;
}
