const
	analyzeAndProcess = require("./analyzeAndProcess"),
	createSourcesFromPackages = require("./createSourcesFromPackages"),
	formatYaml = require("js-yaml").safeDump,
	fs = require("fs"),
	{ getSvgForYaml } = require("@devsnicket/eunice-renderer"),
	{ promisify } = require("util"),
	removePackagePrefixFromYaml = require("./removePackagePrefixFromYaml");

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
		outputFilePrefix = "eunice",
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

		await writeFile(
			`${outputFilePrefix}.yaml`,
			yaml,
		);

		await writeFile(
			`${outputFilePrefix}.svg`,
			getSvgForYaml({ yaml }),
		);
	};