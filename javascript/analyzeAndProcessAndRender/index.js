/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import addPackagesToSources from "./addPackagesToSources";
import analyzeAndProcess from "./analyzeAndProcess";
import fileSystem from "fs-extra";
import { safeDump as formatYaml } from "js-yaml";
import getSvgForYaml from "./getSvgForYaml";
import path from "path";
import { reverse as sortItemsInReverse } from "../analyzer/getItemOrItemsFromJavascript/itemSorting.js";
import writeHarness from "../../interactive/writeHarness";

export default async(/** @type {import("./Parameter.d")} */{
	babelParserPlugins,
	date,
	dependencyPermeableIdentifiers,
	directoryToCreateOrAddToStacksFrom,
	fileExtensions,
	ignorePathPattern,
	includeServiceWorkers = false,
	isInferStacksEnabled = true,
	modifyStacksFile,
	output,
	packages,
	sortItems = sortItemsInReverse,
	sources,
	structureItems = items => items,
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
					isInferStacksEnabled,
					modifyStacksFile,
					packagePrefixAndScope:
						packages,
					sortItems,
					sources:
						addPackagesToSources({
							packages,
							sources,
						}),
					structureItems,
				}),
				{ lineWidth: Number.MAX_SAFE_INTEGER },
			),
	});

function formatHeader({
	date,
	version,
}) {
	return `created by Eunice for JavaScript (https://devsnicket.com/eunice) version ${version} on ${formatDate()}`;

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
			`<!-- ${header}-->\n${getSvgForYaml(yaml)}`,
		);

	if (enabled.html)
		await writeHarness({
			areDependenciesOfAncestorsIncluded:
				false,
			directoryPath,
			htmlFileName:
				`${baseFileName || ""}.html`,
			includeServiceWorkers,
			isInferStacksEnabled:
				false,
			sourceDirectoryPath:
				path.join(__dirname, "..", "dist", "interactive"),
			yaml:
				yamlWithHeader,
		});
}