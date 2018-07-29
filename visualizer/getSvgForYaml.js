const
	callWhenProcessEntryPoint = require("../callWhenProcessEntryPoint"),
	createElement = require("react").createElement,
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	renderElement = require("react-dom/server").renderToStaticMarkup;

const getSvgElementForYaml = require("./getSvgElementForYaml");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWhenProcessEntryPoint({
	action:
		processArguments =>
			getSvgForYaml({
				...processArguments,
				subsetIdentifierHierarchy:
					typeof processArguments.subsetIdentifierHierarchy === "string"
					?
					[ processArguments.subsetIdentifierHierarchy ]
					:
					processArguments.subsetIdentifierHierarchy,
			}),
	standardInputParameter:
		"yaml",
});

module.exports = getSvgForYaml;

function getSvgForYaml({
	subsetIdentifierHierarchy,
	yaml,
}) {
	return (
		renderElement(
			getSvgElementForYaml({
				createElement,
				getTextWidth,
				subsetIdentifierHierarchy,
				yaml: parseYaml(yaml),
			})
		)
	);
}