import { SnowflakeRegex } from '@purplet/utils';
import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return SnowflakeRegex.test(param);
};
