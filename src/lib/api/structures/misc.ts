import { CustomEmojiRegex, SnowflakeRegex } from '@purplet/utils';
import { z } from 'zod';
import EmojiJSON from '../../json/emoji.json';

export const SnowflakeStructure = z.string().regex(SnowflakeRegex);

export const PreprocessedDateStructure = z.preprocess((arg) => {
	if (typeof arg == 'string') return new Date(arg);
}, z.date());

export const EmojiStructure = z
	.string()
	.refine(
		(arg) => !!EmojiJSON.find((e) => e.char === arg) || CustomEmojiRegex.test(arg),
		'Only custom emojis (formatted as <a:name:123>) and Unicode emojis are supported.'
	);
