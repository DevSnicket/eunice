const
	createArrows = require("./createArrows"),
	createParentGroupFactoryFromSubsetIdentifierHierarchy = require("./createParentGroupFactoryFromSubsetIdentifierHierarchy"),
	createStackWithSummaryGroupFactory = require("./createStackWithSummaryGroupFactory"),
	createSvgElement = require("./createSvgElement"),
	createTextGroup = require("./createTextGroup"),
	withPrecision = require("./withPrecision");

module.exports =
	(/** @type {import("./Parameter")} */{
		createElement,
		elementContainerFactory = null,
		getTextWidth,
		namespaces = null,
		stack,
		style = "",
		subsetIdentifierHierarchy = null,
	}) => {
		const
			arrows =
				createArrows({ createElement, withPrecision }),
			font =
				createFont({
					family: "arial",
					getTextWidth,
					size: 16,
				});

		return (
			createSvgElement({
				childGroupFactory:
					stack
					&&
					initializeAndCreateChildGroupFactory(),
				createElement,
				font,
				namespaces,
				style:
					/* cspell:disable-next-line */
					`g.anonymous>text{font-style:italic}g.parent>rect{fill:none;stroke:gray}g.item>rect{fill:lightgray}g.item>text{text-anchor:middle}g.dependency>text{fill:white;text-anchor:middle}${style}`,
				symbols:
					Object.values(arrows)
					.map(arrow => arrow.element),
				withPrecision,
			})
		);

		function initializeAndCreateChildGroupFactory() {
			return (
				subsetIdentifierHierarchy
				?
				createParentGroupFactoryFromSubsetIdentifierHierarchy({
					arrows,
					createGroupFactoryForStack,
					createTextGroup: createTextGroupWithFontSizeAndPrecision,
					font,
					stack,
					subsetIdentifierHierarchy,
				})
				:
				createGroupFactoryForStack(stack)
			);
		}

		function createGroupFactoryForStack(
			stackOrStackOfSubset,
		) {
			return (
				createStackWithSummaryGroupFactory({
					arrows,
					createTextGroup:
						createTextGroupWithFontSizeAndPrecision,
					elementContainerFactory,
					font,
					stack:
						stackOrStackOfSubset,
				})
			);
		}

		function createTextGroupWithFontSizeAndPrecision(
			parameters,
		) {
			return (
				createTextGroup({
					createElement,
					fontSize: font.size,
					withPrecision,
					...parameters,
				})
			);
		}
	};

function createFont({
	family,
	getTextWidth,
	size,
}) {
	const getTextWidthOptions = { font: family, size };

	return (
		{
			family,
			measure: text => withPrecision(getTextWidth(text, getTextWidthOptions)),
			size,
		}
	);
}