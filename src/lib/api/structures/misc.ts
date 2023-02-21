import { SnowflakeRegex } from '@purplet/utils';
import { z } from 'zod';

export const SnowflakeStructure = z.string().regex(SnowflakeRegex);
