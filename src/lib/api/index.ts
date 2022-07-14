import jwt from 'jsonwebtoken';
import 'dotenv/config';

export { jwt };
export * as errors from './genericErrors';
export { validateAccess } from './validateAccess';

export interface CRBTTokenPayload {
	userId: string;
	guildId?: string;
}
