import { SnowflakeRegex } from '@purplet/utils';
import { z } from 'zod';

export const SnowflakeStructure = z.string().regex(SnowflakeRegex);

export const PreprocessedDateStructure = z.preprocess((arg) => {
	if (typeof arg == 'string') return new Date(arg);
}, z.date());
