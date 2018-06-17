const
	addDependentsFromDependsUpon = require("./getSvgForYaml/addDependentsFromDependsUpon"),
	countDependencies = require("./getSvgForYaml/countDependencies"),
	createArrows = require("./getSvgForYaml/createArrows"),
	createDependencyCountGroupFactoryWhenRequired = require("./getSvgForYaml/createDependencyCountGroupFactoryWhenRequired"),
	createItemGroupsContainer = require("./getSvgForYaml/createItemGroupsContainer"),
	createItemStackDependencyGroupsAndCalculateSize = require("./getSvgForYaml/createItemStackDependencyGroupsAndCalculateSize"),
	createStackDependencyCountSummaryElementsContainer = require("./getSvgForYaml/createStackDependencyCountSummaryElementsContainer"),
	createStackElementsContainer = require("./getSvgForYaml/createStackElementsContainer"),
	createSvgElement = require("./getSvgForYaml/createSvgElement"),
	getDirectionalDependencyCount = require("./getSvgForYaml/getDirectionalDependencyCount"),
	getStackDirection = require("./getSvgForYaml/getStackDirection"),
	standardiseStack = require("./getSvgForYaml/standardiseStack");

module.exports =
	({
		createElement,
		getTextWidth,
		yaml,
	}) =>
		getSvgElementForStack({
			createElement,
			font:
				createFont({
					family: "arial",
					getTextWidth,
					size: 16,
				}),
			stack:
				yaml && (yaml.stack || [ yaml ]),
		});

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

function getSvgElementForStack({
	createElement,
	font,
	stack,
}) {
	const arrows = createArrows({ createElement, withPrecision });

	return (
		createSvgElement({
			childElementsContainer:
				stack && initaliseAndCreateElementsContainer(),
			createElement,
			font,
			symbols:
				Object.values(arrows)
				.map(arrow => arrow.element),
		})
	);

	function initaliseAndCreateElementsContainer() {
		standardiseStack(stack);
		addDependentsFromDependsUpon(stack);

		const stackDependencyCounts = [];

		return (
			createStackDependencyCountSummaryElementsContainer({
				arrows,
				counts:
					stackDependencyCounts,
				createDependencyCountGroupFactoryWhenRequired:
					({ arrow, count }) =>
						createDependencyCountGroupFactoryWhenRequired({
							arrow,
							count,
							createTextGroup,
							font,
						}),
				stackElementsContainer:
					createStackElementsContainer({
						addPadding,
						createItemGroupsContainer: createItemGroupsContainerWithStackDependencies,
						stack,
					}),
			})
		);

		function createItemGroupsContainerWithStackDependencies({
			items,
			top,
		}) {
			return (
				createItemGroupsContainer({
					addPadding,
					createDependencyGroupsAndCalculateSize:
						({ identifierGroupFactory, item, left }) =>
							countStackDependenciesAndCreateGroupsAndCalculateSizeForItem({
								identifierGroupFactory,
								item,
								left,
							}),
					createTextGroup,
					font,
					items,
					top,
					withPrecision,
				})
			);

			function countStackDependenciesAndCreateGroupsAndCalculateSizeForItem({
				identifierGroupFactory,
				item,
				left,
			}) {
				const itemStackDependencyCounts =
					getDirectionalDependencyCount({
						arrows,
						...countDependencies({
							getStackDirection:
								to =>
									getStackDirection({
										from: items,
										stack,
										to,
									}),
							item,
						}),
					});

				if (itemStackDependencyCounts)
					stackDependencyCounts.push(itemStackDependencyCounts);

				return (
					createItemStackDependencyGroupsAndCalculateSize({
						createDependencyCountGroupFactoryWhenRequired:
							({ arrow, count }) =>
								createDependencyCountGroupFactoryWhenRequired({
									arrow,
									count,
									createTextGroup,
									font,
								}),
						identifierGroupFactory,
						left,
						stackDependencies: itemStackDependencyCounts,
						top,
						withPrecision,
					})
				);
			}
		}
	}

	// x and y are attribute names in SVG
	/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
	function createTextGroup({
		attributes,
		className,
		elementName,
		height,
		left,
		paddingRight,
		text,
		top,
		width,
	}) {
		return (
			createElement(
				"g",
				className && { className },
				createElement(
					elementName,
					{
						...attributes,
						height,
						width,
						...left > 0 && { x: left },
						...top > 0 && { y: top },
					}
				),
				createElement(
					"text",
					{
						x: withPrecision(left + getTextLeftOffset()),
						y: withPrecision(top + getTextTopOffset()),
					},
					text
				)
			)
		);

		function getTextLeftOffset() {
			return (width - paddingRight) / 2;
		}

		function getTextTopOffset() {
			return (height / 2) + (font.size * 0.375);
		}
	}
}

function addPadding(
	offset
) {
	return (
		offset == 0
		?
		0
		:
		withPrecision(offset + 15)
	);
}

function withPrecision(
	value
) {
	return (value * 100).toFixed() / 100;
}