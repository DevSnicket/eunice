require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

const
	findItemWithIdentifierFromStack = require("./findItemWithIdentifierFromStack"),
	findItemsOfDependsUponOrGetIdentifiers = require("./findItemsOfDependsUponOrGetIdentifiers"),
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
				dependsUponItems:
					item.dependsUpon.flatMap(findItemsFromDependsUpon),
				item,
			});

		function findItemsFromDependsUpon(
			dependsUpon,
		) {
			return (
				findItemsWhenString()
				||
				findItemsOfDependsUponOrGetIdentifiers({
					dependsUpon,
					dependsUponItem:
						findItemWithIdentifier(
							dependsUpon.id,
						),
				})
			);

			function findItemsWhenString() {
				return (
					typeof dependsUpon === "string"
					&&
					[
						findItemWithIdentifier(
							dependsUpon,
						)
						||
						dependsUpon,
					]
				);
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