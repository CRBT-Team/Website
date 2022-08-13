interface BaseToken {
	token: string;
}

enum TokenTypes {
	API = 'API',
	Redeem = 'REDEEM'
}

export interface APITokenData extends BaseToken {
	data: {
		userId: string;
		guildId?: string;
	};
	type: TokenTypes.API;
}
