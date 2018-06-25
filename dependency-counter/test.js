const
	createElement = require("react").createElement,
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	path = require("path"),
	renderElement = require("react-dom/server").renderToStaticMarkup;

const
	getSvgElementForYaml = require("./getSvgElementForYaml"),
	runTestsInFileSystem = require("../runTestsInFileSystem.js");

runTestsInFileSystem({
	action: getSvgForYaml,
	caseFileName: ".yaml",
	directory: path.join(__dirname, "tests/"),
	expectedFileName: ".svg",
	processArguments: process.argv,
});

function getSvgForYaml(
	yaml
) {
	return (
		renderElement(
			getSvgElementForYaml({
				createElement,
				getTextWidth,
				yaml: parseYaml(yaml),
			})
		)
	);
}