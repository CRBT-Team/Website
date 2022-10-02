import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (param: string) => {
	return param === '@me' ? true : /^[0-9]\d{17,20}/.test(param);
};
