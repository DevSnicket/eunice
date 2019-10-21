// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createOutputPath = require("./createOutputPath"),
	createSources = require("./createSources");

module.exports =
	({
		babelParserPlugins,
		dependencyPermeableIdentifiers,
		directories = ".",
		fileExtensions,
		ignorePathPattern = "(^|/)(\\..*|node_modules)$",
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
		pathSeparator,
		rootItemIdentifiers,
		...restOfOptions
	}) => (
		{
			...restOfOptions,
			babelParserPlugins:
				ensureArray(babelParserPlugins),
			dependencyPermeableIdentifiers:
				ensureArray(dependencyPermeableIdentifiers),
			fileExtensions:
				ensureArray(fileExtensions),
			ignorePathPattern:
				ignorePathPattern
				&&
				createPathRegularExpression({
					pattern: ignorePathPattern,
					separator: pathSeparator,
				}),
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

function createPathRegularExpression({
	pattern,
	separator,
}) {
	return (
		pattern
		&&
		new RegExp(
			pattern.replace(
				/\//g,
				separator.replace("\\", "\\\\"),
			),
		)
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