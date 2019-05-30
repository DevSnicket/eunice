const
	analyzeAndProcess = require("./analyzeAndProcess"),
	createSourcesFromPackages = require("./createSourcesFromPackages"),
	formatYaml = require("js-yaml").safeDump,
	fs = require("fs"),
	{ getSvgForYaml } = require("@devsnicket/eunice-renderer"),
	path = require("path"),
	{ promisify } = require("util"),
	removePackagePrefixFromYaml = require("./removePackagePrefixFromYaml"),
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
		directoryToCreateOrAddToStacksFrom = null,
		ignoreDirectoryNames = ignoreDirectoryNamesDefault,
		outputPath = { baseFileName: "eunice", directoryPath: "." },
		packageNames = [],
		packagePrefix = null,
		sources,
	}) => {
		const yaml =
			removePackagePrefixFromYaml({
				packagePrefix,
				yaml:
					formatYaml(
						analyzeAndProcess({
							directoryToCreateOrAddToStacksFrom,
							ignoreDirectoryNames,
							sources:
								[
									...createSourcesFromPackages({
										names: packageNames,
										prefix: packagePrefix,
									}),
									...sources,
								],
						}),
						{ lineWidth: Number.MAX_SAFE_INTEGER },
					),
			});

		await writeOutput({
			...outputPath,
			yaml,
		});
	};

async function writeOutput({
	baseFileName,
	directoryPath,
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
		includeServiceWorkers: false,
		includeSourceMap: false,
		yamlFilePath,
	});
}