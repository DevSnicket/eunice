const
	fs = require("fs"),
	path = require("path");

const
	getOrCreateItemsInDirectory = require("."),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

const testCasesDirectory = path.join(__dirname, "test-cases");

test(
	"",
	() =>
		expect(getYamlForDirectory(testCasesDirectory))
		.toBe(readExpectedFile()),
);

function getYamlForDirectory(
	directory,
) {
	return (
		getYamlForItemOrItems(
			getOrCreateItemsInDirectory({
				directory,
				ignoreDirectoryNames: [ "node_modules" ],
			}),
		)
	);
}

function readExpectedFile() {
	return (
		fs.readFileSync(
			path.join(testCasesDirectory, "expected.yaml"),
			"utf-8",
		)
	);
}