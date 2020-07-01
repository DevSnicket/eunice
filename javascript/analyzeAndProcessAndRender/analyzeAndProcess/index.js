// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import babelParserPluginsDefault from "../../babelParserPluginsDefault";
import { createOrAddToStacksUsingFileSystem } from "@devsnicket/eunice-stacking";
import { getOrCreateItemsInDirectory } from "@devsnicket/eunice-javascript-analyzer";
import processItems from "./processItems";

export default async(/** @type {import("./Parameter.d")} */{
	babelParserPlugins = babelParserPluginsDefault,
	dependencyPermeableIdentifiers,
	directoryToCreateOrAddToStacksFrom,
	fileExtensions,
	ignorePathPattern,
	isFileContentReversed,
	isInferStacksEnabled,
	modifyStacksFile,
	packagePrefixAndScope,
	sources,
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
				areFilesBottomUp: isFileContentReversed,
				babelParserPlugins,
				directory,
				fileExtensions,
				ignorePathPattern,
				rootItemIdentifier,
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