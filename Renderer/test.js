const
	createElement = require("react").createElement,
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	renderElement = require("react-dom/server").renderToStaticMarkup;

const
	getSvgElementForYaml = require("./getSvgElementForYaml"),
	runTestsInFileSystem = require("../runTestsInFileSystem.js");

runTestsInFileSystem({
	action: getSvgForYaml,
	argument: process.argv[2],
	caseFileName: ".yaml",
	directory: "tests/",
	expectedFileName: ".svg",
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
		));
}