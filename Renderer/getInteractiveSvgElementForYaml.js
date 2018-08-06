const
	{ createElement } = require("react"),
	getTextWidth = require("string-pixel-width"),
	parseYaml = require("js-yaml").safeLoad;

const
	callOrCreateErrorElement = require("./getInteractiveSvgElementForYaml/callOrCreateErrorElement"),
	getSvgElementForYaml = require("./getSvgElementForYaml");

module.exports =
	yaml =>
		callOrCreateErrorElement(
			() => {
				const svgElement =
					getSvgElementForYaml({
						createElement,
						createItemGroupWrapperForIdentifier,
						getTextWidth,
						namespaces: { "xmlns:xlink": "http://www.w3.org/1999/xlink" },
						style: "g.item{cursor:pointer}",
						subsetIdentifierHierarchy: null,
						yaml: parseYaml(yaml),
					});

				return svgElement;
			}
		);

function createItemGroupWrapperForIdentifier({
	identifier,
	itemGroup,
}) {
	return (
		createElement(
			"a",
			{
				key: identifier,
				xlinkHref: `#${identifier}`,
			},
			itemGroup
		)
	);
}