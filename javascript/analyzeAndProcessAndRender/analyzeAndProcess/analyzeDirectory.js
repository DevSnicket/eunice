const analyzer = require("@devsnicket/eunice-javascript-analyzer");

module.exports =
	directory =>
		analyzer.getOrCreateItemsInDirectory({
			directory,
			ignoreDirectoryNames:
				[
					".devsnicket-plugin-discovery",
					".git",
					".vscode",
					"dist",
					"node_modules",
					"output",
					"test-cases",
					"test-coverage",
				],
		});