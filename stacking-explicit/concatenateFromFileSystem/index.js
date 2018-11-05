require("array.prototype.flat")
.shim();

const
	callWithYamlOutputWhenProcessEntryPoint = require("../callWithYamlOutputWhenProcessEntryPoint"),
	fs = require("fs"),
	parseYaml = require("js-yaml").safeLoad;

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWithYamlOutputWhenProcessEntryPoint({
	action: ({ files }) => concatenateFromFileSystem(files),
	standardInputParameter: null,
});

module.exports = concatenateFromFileSystem;

function concatenateFromFileSystem(
	files,
) {
	return (
		files.reduce(
			(stack, file) =>
				[
					...stack,
					...ensureInLevel(readYamlFile(file)),
				],
			[],
		)
	);
}

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