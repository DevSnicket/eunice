const
	{ createElement } = require("react"),
	getSvgElementForYaml = require("../getSvgElementForYaml"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	{ renderToStaticMarkup } = require("react-dom/server");

module.exports =
	({
		yaml,
		...restOfParameters
	}) =>
		renderToStaticMarkup(
			getSvgElementForYaml({
				...restOfParameters,
				createElement,
				getTextWidth,
				yaml: parseYaml(yaml),
			}),
		);