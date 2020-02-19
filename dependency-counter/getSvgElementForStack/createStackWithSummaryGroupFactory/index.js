// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import aggregateGroupFactoriesWithOrientation from "../aggregateGroupFactoriesWithOrientation";
import countDependenciesOfItemAndDescendants from "./countDependenciesOfItemAndDescendants";
import createDependenciesInlineGroupFactories from "./createDependenciesInlineGroupFactories";
import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";
import createGroupsCenteredHorizontally from "./createGroupsCenteredHorizontally";
import createItemGroupFactory from "./createItemGroupFactory";
import createOuterDependencyGroupFactory from "../createOuterDependencyGroupFactory";
import createSummaryGroupFactory from "./createSummaryGroupFactory";
import getDependencyCountInBothDirections from "../getDependencyCountInBothDirections";

export default (/** @type {import("./Parameter.d")} */{
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
				item,
				parentStack: stack,
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
							level: keys.level,
							relationship: keys.relationship,
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