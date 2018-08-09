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
		createItemGroupWrapperForItem,
		createTextGroup,
		font,
		padding,
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
						createItemGroupsContainer:
							({
								items,
								top,
							}) =>
								createItemAndDependencyGroupsContainer({
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
									left: padding.left,
									top,
									withPrecision,
								}),
						stack,
						top: padding.top,
						withPrecision,
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
							createItemGroupWrapper:
								itemGroup =>
									createItemGroupWrapperForItem({
										item,
										itemGroup,
									}),
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
	};