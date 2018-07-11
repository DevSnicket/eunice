const path = require("path");

const
	getItemsInDirectory = require("./getItemsInDirectory"),
	getYamlForItemOrItems = require("./getYamlForItemOrItems"),
	isJestProcessFromArguments = require("../../Tests/isJestProcessFromArguments");

if (isJestProcessFromArguments(process.argv))
	describe(
		getYamlForItemOrItems,
		() =>
			it(
				"",
				() =>
					expect(getYamlForTestDirectory())
					.toBe(`- emptyFunction
- - twoEmptyFunctionsOne
- - twoEmptyFunctionsTwo`)
			)
	);
else
	// eslint-disable-next-line no-console
	console.log(getYamlForTestDirectory());

function getYamlForTestDirectory() {
	return (
		getYamlForItemOrItems(
			getItemsInDirectory(
				path.join(__dirname, "directory.testcases")
			)
		)
	);
}