// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	analyzeAndProcess = require("./analyzeAndProcess"),
	createSourcesFromPackages = require("./createSourcesFromPackages"),
	formatYaml = require("js-yaml").safeDump,
	fs = require("fs"),
	{ getSvgForYaml } = require("@devsnicket/eunice-renderer"),
	path = require("path"),
	{ promisify } = require("util"),
	writeHarness = require("@devsnicket/eunice-renderer-test-harness/writeHarness");

const
	ignoreDirectoryNamesDefault =
		[
			".devsnicket-plugin-discovery",
			".git",
			".vscode",
			"dist",
			"node_modules",
			"output",
			"test-cases",
			"test-coverage",
		],
	writeFile =
		promisify(fs.writeFile);

module.exports =
	async({
		babelParserPlugins,
		directoryToCreateOrAddToStacksFrom = null,
		ignoreDirectoryNames = ignoreDirectoryNamesDefault,
		ignorePathPattern = createIgnorePathPatternFromDirectoryNames(ignoreDirectoryNames),
		includeServiceWorkers = false,
		includeSourceMap = false,
		isFileContentReversed = false,
		outputPath,
		packages = null,
		sources,
	}) =>
		writeOutput({
			includeServiceWorkers,
			includeSourceMap,
			...outputPath,
			yaml:
				formatYaml(
					await analyzeAndProcess({
						babelParserPlugins,
						directoryToCreateOrAddToStacksFrom,
						ignorePathPattern,
						isFileContentReversed,
						packagePrefixAndScope:
							packages,
						sources:
							createSourcesWithPackages({
								packages,
								sources,
							}),
					}),
					{ lineWidth: Number.MAX_SAFE_INTEGER },
				),
		});

function createIgnorePathPatternFromDirectoryNames(
	directoryNames,
) {
	return new RegExp(`(^|\\${path.sep})(${directoryNames.join("|")})$`);
}

function createSourcesWithPackages({
	packages,
	sources,
}) {
	return (
		packages
		?
		[
			...createSourcesFromPackages(packages),
			...sources,
		]
		:
		sources
	);
}

async function writeOutput({
	baseFileName,
	directoryPath,
	includeServiceWorkers,
	includeSourceMap,
	yaml,
}) {
	const baseFilePath =
		baseFileName
		?
		path.join(directoryPath, baseFileName)
		:
		`${directoryPath}${path.sep}`;

	const yamlFilePath = `${baseFilePath}.yaml`;

	await writeFile(
		yamlFilePath,
		yaml,
	);

	await writeFile(
		`${baseFilePath}.svg`,
		getSvgForYaml({ yaml }),
	);

	await writeHarness({
		directoryPath,
		htmlFileName: `${baseFileName || ""}.html`,
		includeServiceWorkers,
		includeSourceMap,
		yamlFilePath,
	});
}