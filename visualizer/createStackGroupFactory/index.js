// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat-map";

import * as aggregateGroupFactoriesWithOrientation from "../aggregateGroupFactoriesWithOrientation";
import createItemGroupFactory from "./createItemGroupFactory";

export default (/** @type {import("./Parameter.d")} */{
	createTextGroup,
	dependencyGroupFactories,
	elementContainerFactory,
	font,
	stack,
}) => {
	const spacing = 15;

	return (
		aggregateGroupFactoriesWithOrientation.vertical({
			groupFactories:
				stack.map(createLevelGroupFactory),
			spacing,
		})
	);

	function createLevelGroupFactory(
		level,
	) {
		return (
			aggregateGroupFactoriesWithOrientation.horizontal({
				groupFactories:
					level.map(createGroupFactoryForItem),
				spacing,
			})
		);
	}

	function createGroupFactoryForItem(
		item,
	) {
		return (
			dependencyGroupFactories.createOuter({
				contentGroupFactory:
					createItemGroupFactoryWithDependsUponCounts(),
				item,
			})
		);

		function createItemGroupFactoryWithDependsUponCounts() {
			return (
				createItemGroupFactory({
					createTextGroup:
						getCreateTextGroupWhenInContainer()
						||
						createTextGroup,
					font,
					identifier:
						item.id,
					innerDependencyGroupFactory:
						createInnerDependencyGroupFactory(),
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

			function createInnerDependencyGroupFactory() {
				return (
					whenHasCount()
					||
					asEmpty()
				);

				function whenHasCount() {
					return (
						dependencyGroupFactories.createInner({
							count:
								item.dependencyCount
								&&
								item.dependencyCount.inner,
							keyPrefix:
								`${item.id} `,
						})
					);
				}

				function asEmpty() {
					return {
						createAtPosition:
							() => null,
						height:
							0,
						width:
							0,
					};
				}
			}
		}
	}
};