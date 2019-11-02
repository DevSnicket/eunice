/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

const
	createDependsUpon = require("./createDependsUpon"),
	findItemWithIdentifierFromStack = require("./findItemWithIdentifierFromStack"),
	updateItem = require("./updateItem");

module.exports = initializeDependenciesInStack;

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
					item.id === identifier
					?
					item
					:
					findItemWithIdentifierFromStack({
						identifier,
						stack: item.items || stack,
					})
				);
			}
		}
	}
}