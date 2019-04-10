const
	fs = require("fs"),
	path = require("path");

const
	getOrCreateItemsInDirectory = require("."),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

const testCasesDirectory = path.join(__dirname, "test-cases");

test(
	"Valid JavaScript files return expected YAML",
	() => {
		const supportedTestCasesDirectory =
			path.join(
				testCasesDirectory,
				"valid",
			);

		expect(
			getYamlForItemOrItems(
				getOrCreateItemsInDirectory({
					directory: supportedTestCasesDirectory,
					ignoreDirectoryNames: [ "node_modules" ],
				}),
			),
		)
		.toBe(readExpectedFile());

		function readExpectedFile() {
			return (
				fs.readFileSync(
					path.join(supportedTestCasesDirectory, "expected.yaml"),
					"utf-8",
				)
			);
		}
	},
);

test(
	"File with not supported declaration throws error with file path",
	() =>
		expect(
			() =>
				getOrCreateItemsInDirectory(
					{ directory: path.join(testCasesDirectory, "invalid") },
				),
		)
		.toThrowError(
			"Analysis of file \"index.js\" raised the following error.\n\nUnexpected token (1:1)",
		),
);