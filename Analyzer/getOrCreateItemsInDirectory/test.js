const
	fs = require("fs"),
	path = require("path");

const
	getOrCreateItemsInDirectory = require("."),
	getYamlForItemOrItems = require("../getYamlForItemOrItems");

const testcasesDirectory = path.join(__dirname, "testcases");

test(
	"",
	() =>
		expect(getYamlForDirectory(testcasesDirectory))
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
			path.join(testcasesDirectory, "expected.yaml"),
			"utf-8",
		)
	);
}