const
	fs = require("fs"),
	getAncestorIdentifiersWhenValid = require("./getAncestorIdentifiersWhenValid"),
	parseYaml = require("js-yaml").safeLoad,
	path = require("path");

module.exports =
	({
		ancestors,
		directory,
		subsetIdentifierHierarchy,
	}) => {
		const ancestorIdentifiers =
			getAncestorIdentifiersWhenValid({
				ancestors,
				subsetIdentifierHierarchy,
			});

		return (
			ancestorIdentifiers
			&&
			getIdentifiersInNewStackFromPath(
				getStackFilePath(),
			)
		);

		function getStackFilePath() {
			return (
				path.join(
					directory,
					...ancestorIdentifiers,
					".devsnicket-eunice-stack.yaml",
				)
			);
		}
	};

function getIdentifiersInNewStackFromPath(
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