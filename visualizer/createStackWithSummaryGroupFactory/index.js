// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import * as aggregateGroupFactoriesWithOrientation from "../aggregateGroupFactoriesWithOrientation";
import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";
import createGroupsCenteredHorizontally from "./createGroupsCenteredHorizontally";
import createItemGroupFactory from "./createItemGroupFactory";
import createOuterDependencyGroupFactory from "../createOuterDependencyGroupFactory";
import createSummaryGroupFactory from "./createSummaryGroupFactory";
import getDependencyCountFromStack from "./getDependencyCountFromStack";

export default (/** @type {import("./Parameter.d")} */{
	arrows,
	createTextGroup,
	elementContainerFactory,
	font,
	stack,
}) => {
	const dependencySpacing = 4;

	return (
		createSummaryGroupFactory({
			arrows,
			createInlineDependencyGroups,
			dependencyCount:
				getDependencyCountFromStack(stack),
			stackGroupFactory:
				createStackGroupFactory(),
		})
	);

	function createInlineDependencyGroups({
		center,
		count,
		top,
	}) {
		return (
			createGroupsCenteredHorizontally({
				center,
				groupFactories:
					createDependenciesInlineGroupFactoriesForCount({
						dependencyCountInner: count,
						keyPrefix: "",
					}),
				spacing:
					dependencySpacing,
				top,
			})
		);
	}

	function createStackGroupFactory() {
		return (
			aggregateGroupFactoriesWithOrientation.vertical({
				groupFactories:
					stack.map(createLevelGroupFactory),
				spacing:
					15,
			})
		);

		function createLevelGroupFactory(
			level,
		) {
			return (
				aggregateGroupFactoriesWithOrientation.horizontal({
					groupFactories:
						level.map(createGroupFactoryForItem),
					spacing:
						15,
				})
			);
		}

		function createGroupFactoryForItem(
			item,
		) {
			return (
				createOuterDependencyGroupFactory({
					arrows,
					createGroupFactoryWhenRequired,
					dependencyCount:
						item.dependencyCount,
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
							item.dependencyCount
							&&
							createDependenciesInlineGroupFactoriesForCount({
								dependencyCountInner: item.dependencyCount.inner,
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
	}

	function createDependenciesInlineGroupFactoriesForCount({
		dependencyCountInner,
		keyPrefix,
	}) {
		return (
			dependencyCountInner
			&&
			[
				{
					arrow: arrows.down,
					direction: "below",
				},
				{
					arrow: arrows.up,
					direction: "above",
				},
				{
					arrow: arrows.right,
					direction: "same",
				},
			]
			.flatMap(
				({ arrow, direction }) =>
					createDependencyGroupFactoryWhenRequired({
						arrow,
						count:
							dependencyCountInner[direction],
						createTextGroup,
						font,
						key:
							`${keyPrefix}dependency count inner ${direction}`,
					})
					||
					[],
			)
		);
	}
};