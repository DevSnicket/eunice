const
	formatYaml = require("js-yaml").safeDump,
	parse = require("acorn").parse,
	path = require("path"),
	walk = require("acorn/dist/walk");

const
	createVisitors = require("./createVisitors"),
	runTestsInFileSystem = require("../../runTestsInFileSystem");

runTestsInFileSystem({
	action: getYamlForJavaScript,
	caseFileName: ".js",
	directory: path.join(__dirname, "tests/"),
	expectedFileName: ".yaml",
	processArguments: process.argv,
});

function getYamlForJavaScript(
	javaScript
) {
	const yaml = getItemsForJavaScript(javaScript);

	return (
		yaml
		?
		formatYaml(yaml)
		.trim()
		:
		""
	);
}

function getItemsForJavaScript(
	javaScript
) {
	const visitors = createVisitors();

	walk.ancestor(
		parse(javaScript, { ecmaVersion: 9 }),
		visitors
	);

	return visitors.getItems();
}