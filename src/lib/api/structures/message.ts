import { CRBTscriptRegex } from '$lib/util/regex';
import { z } from 'zod';

export const MessageContentStructure = z.string().max(4096);

export const URLStructure = z.union([z.string().url().nullish(), z.literal('')]);

export const URLorCRBTscriptStructure = z
	.union([
		z.string().url({
			message: 'Invalid URL or CRBTscript syntax.'
		}),
		z.string().regex(CRBTscriptRegex),
		z.literal('')
	])
	.nullish();

export const MessageEmbedStructure = z
	.object({
		title: z.string().max(256).nullish(),
		url: URLStructure,
		description: z.string().max(4096).nullish(),
		thumbnail: z
			.object({
				url: URLorCRBTscriptStructure
			})
			.nullish(),
		image: z
			.object({
				url: URLorCRBTscriptStructure
			})
			.nullish(),
		fields: z
			.array(
				z.object({
					name: z.string().max(256),
					value: z.string().max(1024),
					inline: z.boolean().default(false)
				})
			)
			.max(25),
		footer: z
			.object({
				text: z.string().max(2048).optional(),
				icon_url: URLorCRBTscriptStructure
			})
			.nullish(),
		author: z
			.object({
				name: z.string().max(256).optional(),
				icon_url: URLorCRBTscriptStructure,
				url: URLStructure
			})
			.nullish(),
		color: z.number().int().nullish()
	})
	.partial()
	.strict();
