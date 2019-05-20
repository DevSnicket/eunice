const
	analyzeAndProcessPackage = require("./analyzeAndProcessPackage"),
	analyzeDirectory = require("./analyzeDirectory"),
	processItems = require("./processItems"),
	{ createOrAddToStacksUsingFileSystem } = require("@devsnicket/eunice-processors").stacking;

module.exports =
	({
		identifierSeparator,
		packageNames,
		rootDirectory,
	}) => {
		return (
			createOrAddToStacksUsingFileSystem({
				directory:
					rootDirectory,
				items:
					[
						analyzeAndProcessRoot(),
						...analyzeAndProcessPackages(),
					],
			})
		);

		function analyzeAndProcessRoot() {
			return (
				processItems({
					identifierSeparator,
					items:
						analyzeDirectory(
							rootDirectory,
						),
					rootPrefix:
						null,
				})
			);
		}

		function analyzeAndProcessPackages() {
			return (
				packageNames
				.map(
					packageName =>
						analyzeAndProcessPackage({
							packageName,
							processItems:
								items =>
									processItems({
										identifierSeparator,
										items,
										rootPrefix:
											packageName,
									}),
						}),
				)
			);
		}
	};