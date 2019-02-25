const
	aggregateGroupFactoriesWithOrientation = require("../aggregateGroupFactoriesWithOrientation"),
	countDependenciesOfItem = require("../countDependenciesOfItem"),
	countDependenciesOfItemAndDescendants = require("./countDependenciesOfItemAndDescendants"),
	createDependenciesInlineGroupFactories = require("./createDependenciesInlineGroupFactories"),
	createDependencyGroupFactoryWhenRequired = require("../createDependencyGroupFactoryWhenRequired"),
	createGroupsCenteredHorizontally = require("./createGroupsCenteredHorizontally"),
	createItemGroupFactory = require("./createItemGroupFactory"),
	createOuterDependencyGroupFactory = require("../createOuterDependencyGroupFactory"),
	createSummaryGroupFactory = require("./createSummaryGroupFactory"),
	getDependencyCountInBothDirections = require("../getDependencyCountInBothDirections"),
	sumDependencyCount = require("../sumDependencyCount");

module.exports =
	({
		arrows,
		createTextGroup,
		elementContainerFactory,
		font,
		stack,
	}) => {
		const
			dependencyCounts = [],
			dependencySpacing = 4;

		return (
			createSummaryGroupFactory({
				arrows,
				createInlineDependencyGroups:
					({
						center,
						count,
						top,
					}) =>
						createGroupsCenteredHorizontally({
							center,
							groupFactories:
								createDependenciesInlineGroupFactoriesForCount({
									countWithDirection: count,
									keyPrefix: "",
								}),
							spacing:
								dependencySpacing,
							top,
						}),
				dependencyCounts,
				stackGroupFactory:
					aggregateGroupFactoriesWithOrientation.vertical({
						groupFactories:
							stack
							.map(
								level =>
									aggregateGroupFactoriesWithOrientation.horizontal({
										groupFactories:
											level.map(countDependenciesOfAndCreateGroupFactoryForItem),
										spacing:
											15,
									}),
							),
						spacing:
							15,
					}),
			})
		);

		function countDependenciesOfAndCreateGroupFactoryForItem(
			item,
		) {
			const dependencyCount =
				countDependenciesOfItemAndDescendants({
					countDependenciesOfItem,
					item,
					parentStack: stack,
					sumCount: sumDependencyCount,
				});

			if (dependencyCount)
				dependencyCounts.push(dependencyCount);

			return (
				createOuterDependencyGroupFactory({
					aggregateGroupFactoriesWithOrientation,
					createGroupFactoryWhenRequired,
					dependencyCount:
						getDependencyCountInBothDirections({
							arrows,
							dependencyCount,
						}),
					itemGroupFactory:
						createItemGroupFactoryWithDependsUponCounts(),
				})
			);

			function createGroupFactoryWhenRequired({
				arrow,
				count,
				keys,
			}) {
				return (
					createDependencyGroupFactoryWhenRequired({
						arrow,
						count,
						createTextGroup:
							getCreateTextGroupWhenInContainer()
							||
							createTextGroup,
						font,
						key:
							`${item.id} dependency count outer ${keys.relationship} ${keys.structure}`,
					})
				);

				function getCreateTextGroupWhenInContainer() {
					return (
						elementContainerFactory
						&&
						elementContainerFactory.createForDependencyCount
						&&
						createInContainer
					);

					function createInContainer(
						parameters,
					) {
						return (
							elementContainerFactory.createForDependencyCount({
								element: createTextGroup(parameters),
								item,
								relationship: keys.relationship,
								structure: keys.structure,
							})
						);
					}
				}
			}

			function createItemGroupFactoryWithDependsUponCounts() {
				return (
					createItemGroupFactory({
						createTextGroup:
							getCreateTextGroupWhenInContainer()
							||
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
						dependencySpacing,
						font,
						identifier:
							item.id,
					})
				);

				function getCreateTextGroupWhenInContainer() {
					return (
						elementContainerFactory
						&&
						elementContainerFactory.createForItem
						&&
						createInContainer
					);

					function createInContainer(
						parameters,
					) {
						return (
							elementContainerFactory.createForItem({
								element: createTextGroup(parameters),
								item,
							})
						);
					}
				}
			}
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