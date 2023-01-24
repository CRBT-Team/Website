export * as errors from './genericErrors';
export { validateAccess, decodeAPIToken } from './validateAccess';

enum TokenTypes {
	API = 'API'
}

export interface APITokenData {
	token: string;
	data: {
		userId: string;
		guildId?: string;
	};
	type: TokenTypes.API;
}
