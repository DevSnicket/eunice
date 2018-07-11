const
	createElement = require("react").createElement,
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad,
	renderElement = require("react-dom/server").renderToStaticMarkup;

const
	getSvgElementForYaml = require("./getSvgElementForYaml");

module.exports =
	yaml =>
		renderElement(
			getSvgElementForYaml({
				createElement,
				getTextWidth,
				yaml: parseYaml(yaml),
			})
		);