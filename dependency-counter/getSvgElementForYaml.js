const
	createArrows = require("./getSvgForYaml/createArrows"),
	createElementsContainer = require("./getSvgForYaml/createElementsContainer"),
	createStackFromParsedYaml = require("./getSvgForYaml/createStackFromParsedYaml"),
	createSvgElement = require("./getSvgForYaml/createSvgElement"),
	initializeDependenciesInStack = require("./getSvgForYaml/initializeDependenciesInStack"),
	withPrecision = require("./getSvgForYaml/withPrecision");

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