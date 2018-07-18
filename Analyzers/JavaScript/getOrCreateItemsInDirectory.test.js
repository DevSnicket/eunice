const
	fs = require("fs"),
	path = require("path");

const
	getOrCreateItemsInDirectory = require("./getOrCreateItemsInDirectory"),
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
					expect(getYamlForDirectory(testcasesDirectory))
					.toBe(readExpectedFile())
			)
	);
else
	// eslint-disable-next-line no-console
	console.log(
		getYamlForDirectory(
			process.argv.length == 3
			?
			path.join(__dirname, process.argv[2])
			:
			testcasesDirectory
		)
	);

function getYamlForDirectory(
	directory
) {
	return (
		getYamlForItemOrItems(
			getOrCreateItemsInDirectory({
				directory,
				ignoreDirectoryNames: [ "node_modules" ],
			})
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