/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import babelParserPluginsDefault from "../../babelParserPluginsDefault";
import { createOrAddToStacksUsingFileSystem } from "../../../stacking-explicit";
import { getOrCreateItemsInDirectory } from "../../../javascript/analyzer";
import processItems from "./processItems";

export default async(/** @type {import("./Parameter.d")} */{
	babelParserPlugins = babelParserPluginsDefault,
	dependencyPermeableIdentifiers,
	directoryToCreateOrAddToStacksFrom,
	fileExtensions = [ ".js", ".jsx", ".ts", ".tsx" ],
	ignorePathPattern,
	isInferStacksEnabled,
	modifyStacksFile,
	packagePrefixAndScope,
	sortItems,
	sources,
	structureItems,
}) => {
	return (
		createOrAddToStacks(
			await whenSingleSource()
			||
			await Promise.all(
				sources.map(analyzeAndProcessSource),
			),
		)
	);

	function whenSingleSource() {
		return (
			sources.length === 1
			&&
			analyzeAndProcessSource(sources[0])
		);
	}

	async function analyzeAndProcessSource({
		directory,
		rootItemIdentifier,
	}) {
		const identifierOrItemOrLevelOrStack =
			await getOrCreateItemsInDirectory({
				babelParserPlugins,
				directory,
				fileExtensions,
				ignorePathPattern,
				rootItemIdentifier,
				sortItems,
				structureItems,
			});

		return processWhenAnyItems() || [];

		function processWhenAnyItems() {
			return (
				identifierOrItemOrLevelOrStack
				&&
				processItems({
					dependencyPermeableIdentifiers,
					directoryToCreateOrAddToStacksFrom:
						directory,
					identifierOrItemOrLevelOrStack,
					isInferStacksEnabled,
					modifyStacksFile,
					packagePrefixAndScope,
					rootItemIdentifier,
				})
			);
		}
	}

	function createOrAddToStacks(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			directoryToCreateOrAddToStacksFrom
			?
			createOrAddToStacksUsingFileSystem({
				directory: directoryToCreateOrAddToStacksFrom,
				identifierOrItemOrLevelOrStack,
			})
			:
			identifierOrItemOrLevelOrStack
		);
	}
};