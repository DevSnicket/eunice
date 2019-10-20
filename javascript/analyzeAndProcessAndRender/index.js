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

const writeFile = promisify(fs.writeFile);

module.exports =
	async({
		babelParserPlugins,
		date,
		dependencyPermeableIdentifiers,
		directoryToCreateOrAddToStacksFrom = null,
		ignorePathPattern,
		includeServiceWorkers = false,
		includeSourceMap = false,
		isFileContentReversed = false,
		modifyFileStacksFilePath,
		output,
		packages = null,
		sources,
		version,
	}) =>
		renderAndWriteOutput({
			enabled:
				output.enabled,
			header:
				formatHeader({
					date,
					version,
				}),
			includeServiceWorkers,
			includeSourceMap,
			...output.path,
			yaml:
				formatYaml(
					await analyzeAndProcess({
						babelParserPlugins,
						dependencyPermeableIdentifiers,
						directoryToCreateOrAddToStacksFrom,
						ignorePathPattern,
						isFileContentReversed,
						modifyFileStacksFilePath,
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

function formatHeader({
	date,
	version,
}) {
	return `created by Eunice (http://www.devsnicket.com/eunice) version ${version} on ${formatDate()}`;

	function formatDate() {
		return (
			new Date(date)
			.toISOString()
		);
	}
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

async function renderAndWriteOutput({
	baseFileName,
	directoryPath,
	enabled,
	header,
	includeServiceWorkers,
	includeSourceMap,
	yaml,
}) {
	const
		baseFilePath =
			baseFileName
			?
			path.join(directoryPath, baseFileName)
			:
			`${directoryPath}${path.sep}`,
		yamlWithHeader =
			`# ${header}\n${yaml}`;

	if (enabled.yaml)
		await writeFile(
			`${baseFilePath}.yaml`,
			yamlWithHeader,
		);

	if (enabled.svg)
		await writeFile(
			`${baseFilePath}.svg`,
			`<!-- ${header}-->\n${getSvgForYaml({ yaml })}`,
		);

	if (enabled.html)
		await writeHarness({
			directoryPath,
			htmlFileName: `${baseFileName || ""}.html`,
			includeServiceWorkers,
			includeSourceMap,
			yaml: yamlWithHeader,
		});
}