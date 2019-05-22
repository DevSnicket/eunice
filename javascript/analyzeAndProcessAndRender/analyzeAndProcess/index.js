const
	analyzeDirectory = require("./analyzeDirectory"),
	{ createOrAddToStacksUsingFileSystem } = require("@devsnicket/eunice-processors").stacking,
	path = require("path"),
	processItems = require("./processItems");

module.exports =
	({
		directoryToCreateOrAddToStacksFrom,
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
			return (
				processItems({
					directoryToCreateOrAddToStacksFrom:
						directory,
					identifierPrefixOfRootItems,
					identifierSeparator:
						path.sep,
					items:
						analyzeDirectory(directory),
				})
			);
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