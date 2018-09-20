require("array.prototype.flatmap")
.shim();

module.exports = findItemWithIdentifierInStackOrParents;

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
		stacks,
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
		items,
	) {
		return items.find(item => item.id === identifier);
	}
}