const
	analyzeAndProcess = require("./analyzeAndProcess"),
	createSourcesFromPackages = require("./createSourcesFromPackages"),
	formatYaml = require("js-yaml").safeDump,
	fs = require("fs"),
	{ getSvgForYaml } = require("@devsnicket/eunice-renderer"),
	{ promisify } = require("util"),
	removePackagePrefixFromYaml = require("./removePackagePrefixFromYaml");

const writeFile = promisify(fs.writeFile);

module.exports =
	({
		directoryToCreateOrAddToStacksFrom = null,
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

		writeYaml();
		renderAndWriteSvg();

		async function writeYaml() {
			await writeFile(
				`${outputFilePrefix}.yaml`,
				yaml,
			);
		}

		async function renderAndWriteSvg() {
			await writeFile(
				`${outputFilePrefix}.svg`,
				getSvgForYaml({ yaml }),
			);
		}
	};