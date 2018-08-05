const
	{ createElement } = require("react"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad;

const
	getSvgElementForYaml = require("./getSvgElementForYaml");

module.exports =
	yaml => {
		try {
			return (
				getSvgElementForYaml({
					createElement,
					getTextWidth,
					subsetIdentifierHierarchy: null,
					yaml: parseYaml(yaml),
				})
			);
		} catch (error) {
			return createElement("div", null, error.message);
		}
	};