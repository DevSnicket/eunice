const
	analyzer = require("@devsnicket/eunice-javascript-analyzer"),
	{ createOrAddToStacksUsingFileSystem } = require("@devsnicket/eunice-processors").stacking,
	path = require("path"),
	processItems = require("./processItems");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
		ignoreDirectoryNames,
		sources,
	}) => {
		return (
			sources.length === 1
			?
			analyzeAndProcessSource(sources[0])
			:
			createOrAddToStacks(
				sources.map(analyzeAndProcessSource),
			)
		);

		function analyzeAndProcessSource({
			directory,
			identifierPrefixOfRootItems,
		}) {
			const items =
				analyzer.getOrCreateItemsInDirectory({
					directory,
					ignoreDirectoryNames,
				});

			return processWhenAnyItems() || [];

			function processWhenAnyItems() {
				return (
					items.length
					&&
					processItems({
						directoryToCreateOrAddToStacksFrom:
							directory,
						identifierPrefixOfRootItems,
						identifierSeparator:
							path.sep,
						items,
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