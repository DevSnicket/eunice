const
	analyzeAndProcess = require("./analyzeAndProcess"),
	createSourcesFromPackages = require("./createSourcesFromPackages"),
	formatYaml = require("js-yaml").safeDump,
	fs = require("fs"),
	{ getSvgForYaml } = require("@devsnicket/eunice-renderer"),
	path = require("path"),
	{ promisify } = require("util"),
	removePackageScopeAndPrefixFromYaml = require("./removePackageScopeAndPrefixFromYaml"),
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
	({
		directoryToCreateOrAddToStacksFrom = null,
		ignoreDirectoryNames = ignoreDirectoryNamesDefault,
		isHtmlSingleFile = true,
		outputPath,
		packages = null,
		sources,
	}) =>
		writeOutput({
			isHtmlSingleFile,
			...outputPath,
			yaml:
				createYaml({
					directoryToCreateOrAddToStacksFrom,
					ignoreDirectoryNames,
					packages,
					sources,
				}),
		});

function createYaml({
	directoryToCreateOrAddToStacksFrom,
	ignoreDirectoryNames,
	packages,
	sources,
}) {
	return (
		removePackageScopeAndPrefixFromYaml({
			packages,
			yaml:
				formatYaml(
					analyzeAndProcess({
						directoryToCreateOrAddToStacksFrom,
						ignoreDirectoryNames,
						sources:
							createSourcesWithPackages(),
					}),
					{ lineWidth: Number.MAX_SAFE_INTEGER },
				),
		})
	);

	function createSourcesWithPackages() {
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
}

async function writeOutput({
	baseFileName,
	directoryPath,
	isHtmlSingleFile,
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
		includeServiceWorkers: !isHtmlSingleFile,
		includeSourceMap: !isHtmlSingleFile,
		yamlFilePath,
	});
}