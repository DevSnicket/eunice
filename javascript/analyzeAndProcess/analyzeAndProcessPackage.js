const
	analyzeDirectory = require("./analyzeDirectory"),
	{ createOrAddToStacksUsingFileSystem } = require("@devsnicket/eunice-processors").stacking;

module.exports =
	({
		packageName,
		processItems,
	}) => {
		const directory = `node_modules/${packageName}`;

		return (
			createOrAddToStacksFromPackageDirectory(
				processItems(
					analyzeDirectory(
						directory,
					),
				),
			)
		);

		function createOrAddToStacksFromPackageDirectory(
			items,
		) {
			return (
				createOrAddToStacksUsingFileSystem({
					directory,
					items,
					subsetIdentifierHierarchy: [ packageName ],
				})
			);
		}
	};