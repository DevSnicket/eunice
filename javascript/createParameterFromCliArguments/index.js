// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createOutputPath = require("./createOutputPath"),
	createSources = require("./createSources");

module.exports =
	({
		babelParserPlugins,
		directories = ".",
		ignorePathPattern,
		includeServiceWorkers,
		includeSourceMap,
		isFileContentReversed,
		outputBaseFileName,
		outputDirectoryPath,
		packageNames,
		packagePrefix,
		packageScope,
		rootItemIdentifiers,
		...restOfOptions
	}) => (
		{
			...restOfOptions,
			babelParserPlugins:
				ensureArray(babelParserPlugins),
			ignorePathPattern:
				ignorePathPattern
				&&
				new RegExp(ignorePathPattern),
			includeServiceWorkers:
				parseBoolean(includeServiceWorkers),
			includeSourceMap:
				parseBoolean(includeSourceMap),
			isFileContentReversed:
				parseBoolean(isFileContentReversed),
			outputPath:
				createOutputPath({
					outputBaseFileName,
					outputDirectoryPath,
				}),
			packages:
				(packageNames || packagePrefix || packageScope)
				&&
				{
					names: ensureArray(packageNames),
					prefix: packagePrefix,
					scope: packageScope,
				},
			sources:
				[
					...createSources({
						directories,
						rootItemIdentifiers,
					}),
				],
		}
	);

function ensureArray(
	argument,
) {
	return (
		// property wont be defined by minimalist package
		// eslint-disable-next-line no-undefined
		argument === undefined || Array.isArray(argument)
		?
		argument
		:
		[ argument ]
	);
}

function parseBoolean(
	value,
) {
	return (
		(typeof value === "string" && value === "true")
		||
		value
	);
}