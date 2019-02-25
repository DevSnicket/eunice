const
	{ createElement } = require("react"),
	{ createStackFromYaml } = require("@devsnicket/eunice-dependency-and-structure"),
	getSvgElementForStack = require("../getSvgElementForStack"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	{ renderToStaticMarkup } = require("react-dom/server");

module.exports =
	({
		yaml,
		...restOfParameters
	}) =>
		renderToStaticMarkup(
			getSvgElementForStack({
				...restOfParameters,
				createElement,
				getTextWidth,
				stack:
					yaml
					&&
					createStackFromYaml(parseYaml(yaml)),
			}),
		);