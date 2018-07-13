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
				dependsUpon: item.dependsUpon,
				findItemWithIdentifier,
				item,
			});
	}

	function findItemWithIdentifier(
		identifier
	) {
		return (
			findItemWithIdentifierInStackOrParents({
				identifier,
				stack,
			})
		);
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
	for (const level of stack) {
		const foundItem = findIn(level);

		if (foundItem)
			return foundItem;
	}

	return null;

	function findIn(
		items
	) {
		for (const item of items)
			if (item.id === identifier)
				return item;
			else if (item.items) {
				const foundItem =
					findItemWithIdentifierInStack({
						identifier,
						stack: item.items,
					});

				if (foundItem)
					return foundItem;
			}

		return null;
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