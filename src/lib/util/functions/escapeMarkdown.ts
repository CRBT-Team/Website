export function removeMarkdown(str: string) {
	return str.replace(/[\*_`\[\]\(\)#\+\-]/g, '');
}

export function escapeMarkdown(str: string) {
	return str.replace(/([\\`*_{}[\]()#+\-.!])/g, '\\$1');
}
