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
					{
						item:
							findItemWithIdentifier(
								dependUpon,
							)
							||
							dependUpon,
					}
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