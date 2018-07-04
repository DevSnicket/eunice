const
	createArrows = require("./getSvgElementForYaml/createArrows"),
	createElementsContainer = require("./getSvgElementForYaml/createElementsContainer"),
	createStackFromParsedYaml = require("./getSvgElementForYaml/createStackFromParsedYaml"),
	createSvgElement = require("./getSvgElementForYaml/createSvgElement"),
	initializeDependenciesInStack = require("./getSvgElementForYaml/initializeDependenciesInStack"),
	withPrecision = require("./getSvgElementForYaml/withPrecision");

module.exports =
	({
		createElement,
		getTextWidth,
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
				symbols:
					Object.values(arrows)
					.map(arrow => arrow.element),
			})
		);

		function initaliseAndCreateElementsContainer() {
			const stack = createStackFromParsedYaml(yaml);

			initializeDependenciesInStack(stack);

			return (
				createElementsContainer({
					arrows,
					createElement,
					font,
					stack,
					withPrecision,
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