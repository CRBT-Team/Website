import type { Rest } from '@purplet/rest';
import type { APIUser, RESTGetAPICurrentUserGuildsResult } from 'discord-api-types/v10';

declare global {
	namespace App {
		interface Error {
			message: string;
			stack?: any;
		}

		export interface Locals {
			rest: Rest;
			user: APIUser;
			guilds: RESTGetAPICurrentUserGuildsResult;
		}
	}
}

export {};
