// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import addPackagesToSources from "./addPackagesToSources";
import analyzeAndProcess from "./analyzeAndProcess";
import fileSystem from "fs-extra";
import { safeDump as formatYaml } from "js-yaml";
import { getSvgForYaml } from "@devsnicket/eunice-renderer";
import path from "path";
import writeHarness from "@devsnicket/eunice-renderer-test-harness/writeHarness";

export default async(/** @type {import("./Parameter.d")} */{
	babelParserPlugins,
	date,
	dependencyPermeableIdentifiers,
	directoryToCreateOrAddToStacksFrom,
	fileExtensions,
	ignorePathPattern,
	includeServiceWorkers = false,
	isFileContentReversed = true,
	isInferStacksEnabled = true,
	modifyStacksFile,
	output,
	packages,
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
		...output.path,
		yaml:
			formatYaml(
				await analyzeAndProcess({
					babelParserPlugins,
					dependencyPermeableIdentifiers,
					directoryToCreateOrAddToStacksFrom,
					fileExtensions,
					ignorePathPattern,
					isFileContentReversed,
					isInferStacksEnabled,
					modifyStacksFile,
					packagePrefixAndScope:
						packages,
					sources:
						addPackagesToSources({
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

async function renderAndWriteOutput({
	baseFileName,
	directoryPath,
	enabled,
	header,
	includeServiceWorkers,
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
		await fileSystem.writeFile(
			`${baseFilePath}.yaml`,
			yamlWithHeader,
		);

	if (enabled.svg)
		await fileSystem.writeFile(
			`${baseFilePath}.svg`,
			`<!-- ${header}-->\n${getSvgForYaml({ yaml })}`,
		);

	if (enabled.html)
		await writeHarness({
			directoryPath,
			htmlFileName:
				`${baseFileName || ""}.html`,
			includeServiceWorkers,
			sourceDirectoryPath:
				path.join(__dirname, "..", "dist", "interactive"),
			yaml:
				yamlWithHeader,
		});
}