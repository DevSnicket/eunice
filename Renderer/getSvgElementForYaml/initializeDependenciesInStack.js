require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

module.exports = initializeDependenciesInStack;

function initializeDependenciesInStack(
	stack
) {
	for (const level of stack)
		for (const item of level) {
			updateItemWhenRequired(item);

			if (item.items)
				initializeDependenciesInStack(item.items);
		}

	function updateItemWhenRequired(
		item
	) {
		if (item.dependsUpon)
			updateItem({
				dependsUpon:
					item.dependsUpon,
				findItemWithIdentifier,
				item,
			});

		function findItemWithIdentifier(
			identifier
		) {
			return (
				findItemWithIdentifierInStackOrParents({
					identifier,
					stack: item.items || stack,
				})
			);
		}
	}
}

function findItemWithIdentifierInStackOrParents({
	identifier,
	stack,
}) {
	return findInStack() || findInParent();

	function findInStack() {
		return (
			findItemWithIdentifierInStack({
				identifier,
				stack,
			})
		);
	}

	function findInParent() {
		return (
			stack.parent
			&&
			findItemWithIdentifierInStackOrParents({
				identifier,
				stack: stack.parent.level.stack,
			})
		);
	}
}

function findItemWithIdentifierInStack({
	identifier,
	stack,
}) {
	return findItemInStacks([ stack ]);

	function findItemInStacks(
		stacks
	) {
		const itemsOfStacks = stacks.flat(3);

		return (
			findItemWithIdentifier(itemsOfStacks)
			||
			findItemInStacksOfItems()
		);

		function findItemInStacksOfItems() {
			const stacksOfItems =
				itemsOfStacks.flatMap(item => item.items || []);

			return (
				stacksOfItems.length
				&&
				findItemInStacks(stacksOfItems)
			);
		}
	}

	function findItemWithIdentifier(
		items
	) {
		return items.find(item => item.id === identifier);
	}
}

function updateItem({
	dependsUpon,
	findItemWithIdentifier,
	item,
}) {
	for (let index = 0; index < dependsUpon.length; index++) {
		const dependsUponItem =
			findItemWithIdentifier(
				dependsUpon[index]
			);

		if (dependsUponItem) {
			dependsUpon[index] = dependsUponItem;

			addDependent({
				dependent: item,
				item: dependsUponItem,
			});
		}
	}
}

function addDependent({
	item,
	dependent,
}) {
	if (item.dependents)
		item.dependents.push(dependent);
	else
		item.dependents = [ dependent ];
}