const
	{ createElement } = require("react"),
	getSvgElementForYaml = require("../getSvgElementForYaml"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	{ renderToStaticMarkup } = require("react-dom/server");

module.exports =
	({
		subsetIdentifierHierarchy,
		yaml,
	}) =>
		renderToStaticMarkup(
			getSvgElementForYaml({
				createElement,
				getTextWidth,
				subsetIdentifierHierarchy,
				yaml: parseYaml(yaml),
			}),
		);