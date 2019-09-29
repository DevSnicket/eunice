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
		modifyFileStacksFile,
		outputBaseFileName,
		outputDirectoryPath,
		outputHtml = true,
		outputSvg,
		outputYaml,
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
			modifyFileStacksFilePath:
				modifyFileStacksFile,
			output:
				{
					enabled:
						{
							html: parseBoolean(outputHtml),
							svg: parseBoolean(outputSvg),
							yaml: parseBoolean(outputYaml),
						},
					path:
						createOutputPath({
							outputBaseFileName,
							outputDirectoryPath,
						}),
				},
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
		value
		&&
		(value === true || whenString())
	);

	function whenString() {
		return (
			typeof value === "string"
			&&
			value.toLowerCase() === "true"
		);
	}
}