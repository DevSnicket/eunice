const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	fs = require("fs"),
	getIdentifierOrStackDescendantsUsingAncestors = require("../getIdentifierOrStackDescendantsUsingAncestors"),
	parseYaml = require("js-yaml").safeLoad,
	path = require("path");

callWithYamlItemsAndOutputWhenProcessEntryPoint(createOrAddToStacksUsingFileSystem);

module.exports = createOrAddToStacksUsingFileSystem;

/* istanbul ignore next: only used when JavaScript file is process entry point or from test harness */
function createOrAddToStacksUsingFileSystem({
	directory,
	items,
}) {
	return (
		getIdentifierOrStackDescendantsUsingAncestors({
			getIdentifiersToStackForAncestors,
			identifierOrItemOrLevelOrStack: items,
		})
	);

	function getIdentifiersToStackForAncestors(
		ancestors,
	) {
		return (
			getIdentifiersToStackFromPath(
				getStackFilePath(),
			)
		);

		function getStackFilePath() {
			return (
				path.join(
					directory,
					...ancestors.map(ancestor => ancestor.id || ancestor),
					".devsnicket.eunice.stack.yaml",
				)
			);
		}
	}

	function getIdentifiersToStackFromPath(
		stackFilePath,
	) {
		return (
			fs.existsSync(stackFilePath)
			&&
			readStack()
		);

		function readStack() {
			return (
				parseYaml(
					fs.readFileSync(
						stackFilePath,
						"utf-8",
					),
				)
			);
		}
	}
}