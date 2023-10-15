/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import * as itemSorting from "../../analyzer/getItemOrItemsFromJavascript/itemSorting";
import createOutputPath from "./createOutputPath";
import createSources from "./createSources";
import stackItemsWhenMultiple from "../../analyzer/getItemOrItemsFromJavascript/stackItemsWhenMultiple";

export default (/** @type {import("./Parameter.d")} */{
	babelParserPlugins,
	dependencyPermeableIdentifiers,
	directories = ".",
	fileExtensions,
	ignorePathPattern = "(^|/)(\\..*|node_modules)$",
	includeServiceWorkers,
	inferStacks,
	jsxElementsToIgnore,
	modifyStacksFile,
	modifyStacksKey,
	modifyStacksPattern,
	outputBaseFileName,
	outputDirectoryPath,
	outputHtml = true,
	outputSvg,
	outputYaml,
	packageNames,
	packagePrefix,
	packageScope,
	pathSeparator,
	reverseFileContent,
	rootItemIdentifiers,
	stackFileContent,
	...restOfOptions
}) => (
	{
		...restOfOptions,
		babelParserPlugins:
			ensureArray(babelParserPlugins),
		dependencyPermeableIdentifiers:
			ensureArray(dependencyPermeableIdentifiers),
		fileExtensions:
			ensureArray(fileExtensions),
		ignorePathPattern:
			ignorePathPattern
			&&
			createPathRegularExpression({
				pattern: ignorePathPattern,
				separator: pathSeparator,
			}),
		includeServiceWorkers:
			parseBoolean(includeServiceWorkers),
		isInferStacksEnabled:
			parseBoolean(inferStacks),
		jsxElementsToIgnore:
			ensureArray(jsxElementsToIgnore),
		modifyStacksFile:
			modifyStacksFile
			&&
			{
				filePath:
					modifyStacksFile,
				key:
					modifyStacksKey,
				pattern:
					modifyStacksPattern
					&&
					new RegExp(modifyStacksPattern),
			},
		output:
			{
				enabled:
					{
						html: parseBoolean(outputHtml),
						svg: parseBoolean(outputSvg),
						yaml: parseBoolean(outputYaml),
					},
				path:
					createOutputPath({
						outputBaseFileName,
						outputDirectoryPath,
					}),
			},
		packages:
			(packageNames || packagePrefix || packageScope)
			&&
			{
				names: ensureArray(packageNames),
				prefix: packagePrefix,
				scope: packageScope,
			},
		sortItems:
			sortItemsByReverseFileContent[parseBoolean(reverseFileContent)],
		sources:
			[
				...createSources({
					directories,
					rootItemIdentifiers,
				}),
			],
		structureItems:
			parseBoolean(stackFileContent) && stackItemsWhenMultiple,
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

function createPathRegularExpression({
	pattern,
	separator,
}) {
	return (
		pattern
		&&
		new RegExp(
			pattern.replace(
				/\//g,
				separator.replace("\\", "\\\\"),
			),
		)
	);
}

function parseBoolean(
	value,
) {
	return (
		value
		&&
		(value === true || whenString())
	);

	function whenString() {
		return (
			typeof value === "string"
			&&
			value.toLowerCase() === "true"
		);
	}
}

const sortItemsByReverseFileContent = {
	false: itemSorting.moveVariablesThenParametersThenImportsToBottom,
	true: itemSorting.reverse,
};