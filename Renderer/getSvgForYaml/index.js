const
	callWhenProcessEntryPoint = require("../../callWhenProcessEntryPoint"),
	{ createElement } = require("react"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	{ renderToStaticMarkup } = require("react-dom/server");

const getSvgElementForYaml = require("../getSvgElementForYaml");

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
		renderToStaticMarkup(
			getSvgElementForYaml({
				createElement,
				getTextWidth,
				subsetIdentifierHierarchy,
				yaml: parseYaml(yaml),
			}),
		)
	);
}