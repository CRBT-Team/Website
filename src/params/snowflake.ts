export const match = (param: string) => {
	return param === '@me' ? true : param.match(/^[0-9]\d{17,20}/);
};
