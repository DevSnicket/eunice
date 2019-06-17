const
	createOutputPath = require("./createOutputPath"),
	createSources = require("./createSources");

module.exports =
	({
		directories = ".",
		identifierPrefixesOfRootItems,
		ignoreDirectoryNames,
		isHtmlSingleFile,
		outputDirectoryPath,
		outputBaseFileName,
		packageNames,
		packagePrefix,
		packageScope,
		...restOfOptions
	}) => (
		{
			...restOfOptions,
			ignoreDirectoryNames:
				ensureArray(ignoreDirectoryNames),
			isHtmlSingleFile:
				isHtmlSingleFile && isHtmlSingleFile === "true",
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
						identifierPrefixesOfRootItems,
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