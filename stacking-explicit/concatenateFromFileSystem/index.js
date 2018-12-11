require("array.prototype.flat")
.shim();

const
	fs = require("fs"),
	parseYaml = require("js-yaml").safeLoad;

module.exports =
	files =>
		files.reduce(
			(stack, file) =>
				[
					...stack,
					...ensureInLevel(readYamlFile(file)),
				],
			[],
		);

function ensureInLevel(
	yaml,
) {
	return (
		Array.isArray(yaml)
		?
		yaml
		:
		[ yaml ]
	);
}

function readYamlFile(
	file,
) {
	return (
		parseYaml(
			fs.readFileSync(
				file,
				"utf-8",
			),
		)
	);
}