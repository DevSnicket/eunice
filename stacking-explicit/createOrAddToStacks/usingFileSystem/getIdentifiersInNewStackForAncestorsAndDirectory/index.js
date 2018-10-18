const
	fs = require("fs"),
	parseYaml = require("js-yaml").safeLoad,
	path = require("path");

module.exports =
	({
		ancestors,
		directory,
	}) => {
		return (
			everyAncestorHasIdentifier()
			&&
			getIdentifiersInNewStackFromPath(
				getStackFilePath(),
			)
		);

		function everyAncestorHasIdentifier() {
			return ancestors.every(ancestor => ancestor.id);
		}

		function getStackFilePath() {
			return (
				path.join(
					directory,
					...ancestors.map(ancestor => ancestor.id),
					".devsnicket.eunice.stack.yaml",
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