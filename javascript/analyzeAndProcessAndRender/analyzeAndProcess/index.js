// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	analyzer = require("@devsnicket/eunice-javascript-analyzer"),
	babelParserPluginsDefault = require("../../babelParserPluginsDefault"),
	{ stacking: { createOrAddToStacksUsingFileSystem } } = require("@devsnicket/eunice-processors"),
	path = require("path"),
	processItems = require("./processItems");

module.exports =
	async({
		babelParserPlugins = babelParserPluginsDefault,
		dependencyPermeableIdentifiers,
		directoryToCreateOrAddToStacksFrom,
		fileExtensions,
		ignorePathPattern,
		isFileContentReversed,
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
			const items =
				await analyzer.getOrCreateItemsInDirectory({
					babelParserPlugins,
					directory,
					fileExtensions,
					ignorePathPattern,
				});

			return processWhenAnyItems() || [];

			function processWhenAnyItems() {
				return (
					items.length
					&&
					processItems({
						dependencyPermeableIdentifiers,
						directoryToCreateOrAddToStacksFrom:
							directory,
						identifierSeparator:
							path.sep,
						isFileContentReversed,
						items,
						modifyStacksFile,
						packagePrefixAndScope,
						rootItemIdentifier,
					})
				);
			}
		}

		function createOrAddToStacks(
			items,
		) {
			return (
				directoryToCreateOrAddToStacksFrom
				?
				createOrAddToStacksUsingFileSystem({
					directory: directoryToCreateOrAddToStacksFrom,
					items,
				})
				:
				items
			);
		}
	};