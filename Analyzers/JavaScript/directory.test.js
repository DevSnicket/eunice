const
	fs = require("fs"),
	path = require("path");

const
	getItemsInDirectory = require("./getItemsInDirectory"),
	getYamlForItemOrItems = require("./getYamlForItemOrItems"),
	isJestProcessFromArguments = require("../../Tests/isJestProcessFromArguments");

const testcasesDirectory = path.join(__dirname, "directory.testcases");

if (isJestProcessFromArguments(process.argv))
	describe(
		getYamlForItemOrItems,
		() =>
			it(
				"",
				() =>
					expect(getYamlForTestDirectory())
					.toBe(readExpectedFile())
			)
	);
else
	// eslint-disable-next-line no-console
	console.log(getYamlForTestDirectory());

function getYamlForTestDirectory() {
	return (
		getYamlForItemOrItems(
			getItemsInDirectory(
				testcasesDirectory
			)
		)
	);
}

function readExpectedFile() {
	return (
		fs.readFileSync(
			path.join(testcasesDirectory, "expected.yaml"),
			"utf-8"
		)
	);
}