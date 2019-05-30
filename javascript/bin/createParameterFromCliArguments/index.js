const createSources = require("./createSources");

module.exports =
	({
		directories = ".",
		identifierPrefixesOfRootItems,
		ignoreDirectoryNames,
		outputDirectoryPath,
		outputBaseFileName,
		...restOfOptions
	}) => (
		{
			...restOfOptions,
			ignoreDirectoryNames:
				ensureArray(ignoreDirectoryNames),
			...createOutputPathProperty({
				baseFileName: outputBaseFileName,
				directoryPath: outputDirectoryPath,
			}),
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

function createOutputPathProperty({
	baseFileName,
	directoryPath,
}) {
	return (
		(baseFileName || directoryPath)
		&&
		{ outputPath: { baseFileName, directoryPath } }
	);
}