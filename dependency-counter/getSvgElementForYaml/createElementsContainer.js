const
	countDependenciesOfItemRecursive = require("./createElementsContainer/countDependenciesOfItemRecursive"),
	createDependenciesInlineElements = require("./createElementsContainer/createDependenciesInlineElements"),
	createDependenciesInlineGroupFactories = require("./createElementsContainer/createDependenciesInlineGroupFactories"),
	createDependencyGroupFactoryWhenRequired = require("./createElementsContainer/createDependencyGroupFactoryWhenRequired"),
	createItemAndDependencyGroupsContainer = require("./createElementsContainer/createItemAndDependencyGroupsContainer"),
	createItemDependencyGroupsAndCalculateSize = require("./createElementsContainer/createItemDependencyGroupsAndCalculateSize"),
	createItemGroupFactory = require("./createElementsContainer/createItemGroupFactory"),
	createStackElementsContainer = require("./createElementsContainer/createStackElementsContainer"),
	createSummaryElementsContainer = require("./createElementsContainer/createSummaryElementsContainer"),
	getDependencyCountInBothDirections = require("./createElementsContainer/getDependencyCountInBothDirections");

module.exports =
	({
		arrows,
		createElement,
		createItemGroupWrapperForIdentifier,
		font,
		stack,
		withPrecision,
	}) => {
		const dependencyCounts = [];

		return (
			createSummaryElementsContainer({
				arrows,
				createInlineDependencyElements:
					({
						center,
						count,
						top,
					}) =>
						createDependenciesInlineElements({
							center,
							groupFactories:
								createDependenciesInlineGroupFactoriesForCount({
									countWithDirection: count,
									keyPrefix: "",
								}),
							top,
						}),
				dependencyCounts,
				stackElementsContainer:
					createStackElementsContainer({
						addPadding,
						createItemGroupsContainer:
							({
								items,
								top,
							}) =>
								createItemAndDependencyGroupsContainer({
									addPadding,
									createItemAndDependencyGroup:
										({
											item,
											left,
										}) =>
											countDependenciesOfAndCreateGroupsForItem({
												item,
												left,
												top,
											}),
									items,
									top,
									withPrecision,
								}),
						stack,
					}),
			})
		);

		function countDependenciesOfAndCreateGroupsForItem({
			item,
			left,
			top,
		}) {
			const dependencyCount = countDependenciesOfItemRecursive(item);

			if (dependencyCount)
				dependencyCounts.push(dependencyCount);

			return (
				createItemDependencyGroupsAndCalculateSize({
					createGroupFactoryWhenRequired:
						({ arrow, count, keySuffix }) =>
							createDependencyGroupFactoryWhenRequired({
								arrow,
								count,
								createTextGroup,
								font,
								key: `${item.id} dependency count outer ${keySuffix}`,
							}),
					dependencyCount:
						getDependencyCountInBothDirections({
							arrows,
							dependencyCount,
						}),
					itemGroupFactory:
						createItemGroupFactory({
							createItemGroupWrapperForIdentifier,
							createTextGroup,
							dependencyGroupFactories:
								dependencyCount
								&&
								dependencyCount.dependsUpon
								&&
								dependencyCount.dependsUpon.inner
								&&
								createDependenciesInlineGroupFactoriesForCount({
									countWithDirection: dependencyCount.dependsUpon.inner,
									keyPrefix: `${item.id} `,
								}),
							font,
							identifier: item.id,
						}),
					left,
					top,
					withPrecision,
				})
			);
		}

		function createDependenciesInlineGroupFactoriesForCount({
			countWithDirection,
			keyPrefix,
		}) {
			return (
				createDependenciesInlineGroupFactories({
					arrows,
					countWithDirection,
					createDependencyGroupFactoryWhenRequired:
						({ arrow, count, keySuffix }) =>
							createDependencyGroupFactoryWhenRequired({
								arrow,
								count,
								createTextGroup,
								font,
								key: `${keyPrefix}dependency count inner ${keySuffix}`,
							}),
				})
			);
		}

		// x and y are attribute names in SVG
		/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
		function createTextGroup({
			attributes,
			className,
			elementName,
			elementsBelowText,
			height,
			key,
			left,
			paddingBottom = 0,
			paddingRight,
			text,
			top,
			width,
		}) {
			return (
				createElement(
					"g",
					{
						...className && { className },
						key,
					},
					[
						createElement(
							elementName,
							{
								...attributes,
								height,
								key: "shape",
								width,
								...left > 0 && { x: left },
								...top > 0 && { y: top },
							}
						),
						createElement(
							"text",
							{
								key: "text",
								x: withPrecision(left + getTextLeftOffset()),
								y: withPrecision(top + getTextTopOffset()),
							},
							text
						),
						...elementsBelowText || [],
					]
				)
			);

			function getTextLeftOffset() {
				return (width - paddingRight) / 2;
			}

			function getTextTopOffset() {
				return (
					((height - paddingBottom) / 2)
					+
					(font.size * 0.36)
				);
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
	};