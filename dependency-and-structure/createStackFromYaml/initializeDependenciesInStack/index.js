// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "core-js/features/array/flat";
import "core-js/features/array/flat-map";

import createDependsUpon from "./createDependsUpon";
import findItemWithIdentifierFromStack from "./findItemWithIdentifierFromStack";
import updateItem from "./updateItem";

export default initializeDependenciesInStack;

function initializeDependenciesInStack(
	stack,
) {
	for (const level of stack)
		for (const item of level) {
			updateItemWhenRequired(item);

			if (item.items)
				initializeDependenciesInStack(item.items);
		}

	function updateItemWhenRequired(
		item,
	) {
		if (item.dependsUpon)
			updateItem({
				dependsUpon:
					item.dependsUpon.flatMap(findItemAndCreateDependsUpon),
				item,
			});

		function findItemAndCreateDependsUpon(
			dependUpon,
		) {
			return (
				whenString()
				||
				createDependsUpon({
					ancestor:
						findItemWithIdentifier(
							dependUpon.id,
						),
					dependUpon,
					dependent:
						item,
				})
			);

			function whenString() {
				return (
					typeof dependUpon === "string"
					&&
					createWithItem(
						findItemWithIdentifier(
							dependUpon,
						),
					)
				);

				function createWithItem(
					dependUponItem,
				) {
					return {
						item:
							dependUponItem || dependUpon,
						...createItemOrFirstAncestorItemProperty(),
					};

					function createItemOrFirstAncestorItemProperty() {
						return (
							dependUponItem
							&&
							{ itemOrFirstAncestorItem: dependUponItem }
						);
					}
				}
			}

			function findItemWithIdentifier(
				identifier,
			) {
				return (
					findItemWithIdentifierFromStack({
						dependent:
							item,
						identifier,
						stack:
							item.items || stack,
					})
				);
			}
		}
	}
}