const
	createArrows = require("./getSvgElementForYaml/createArrows"),
	createElementsContainer = require("./getSvgElementForYaml/createElementsContainer"),
	createParentContainer = require("./getSvgElementForYaml/createParentContainer"),
	createStackFromParsedYaml = require("./getSvgElementForYaml/createStackFromParsedYaml"),
	createSvgElement = require("./getSvgElementForYaml/createSvgElement"),
	createTextGroup = require("./getSvgElementForYaml/createTextGroup"),
	findStackOfSubsetIdentifierHierarchyWhenSpecified = require("./getSvgElementForYaml/findStackOfSubsetIdentifierHierarchyWhenSpecified"),
	initializeDependenciesInStack = require("./getSvgElementForYaml/initializeDependenciesInStack"),
	withPrecision = require("./getSvgElementForYaml/withPrecision");

module.exports =
	({
		createElement,
		createItemGroupWrapperForItem = ({ itemGroup }) => itemGroup,
		getTextWidth,
		namespaces = null,
		style = "",
		subsetIdentifierHierarchy,
		yaml,
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
				childElementsContainer:
					yaml
					&&
					initaliseAndCreateElementsContainer(),
				createElement,
				font,
				namespaces,
				style: `g.anonymous text{font-style:italic}g.parent>rect{fill:none;stroke:gray}g.item>rect{fill:lightgray}g.item>text{text-anchor:middle}g.dependency>text{fill:white;text-anchor:middle}${style}`,
				symbols:
					Object.values(arrows)
					.map(arrow => arrow.element),
			})
		);

		function initaliseAndCreateElementsContainer() {
			const stack = createStackFromParsedYaml(yaml);

			initializeDependenciesInStack(stack);

			return (
				subsetIdentifierHierarchy
				?
				createParentContainer({
					createTextGroup:
						createTextGroupWithFontSizeAndPrecision,
					parent:
						subsetIdentifierHierarchy.slice(-1)[0],
					summaryElementsContainer:
						createElementsContainerWithPadding({
							left: 10,
							top: 40,
						}),
				})
				:
				createElementsContainerWithPadding({
					left: 0,
					top: 0,
				})
			);

			function createElementsContainerWithPadding(
				padding
			) {
				return (
					createElementsContainer({
						arrows,
						createItemGroupWrapperForItem,
						createTextGroup:
							createTextGroupWithFontSizeAndPrecision,
						font,
						padding,
						stack:
							subsetIdentifierHierarchy
							?
							findStackOfSubsetIdentifierHierarchyWhenSpecified({
								stack,
								subsetIdentifierHierarchy,
							})
							:
							stack,
						withPrecision,
					})
				);
			}

			function createTextGroupWithFontSizeAndPrecision(
				parameters
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