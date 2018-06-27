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
			findItemWithIdentifierInStacks({
				identifier,
				ignoreStack: null,
				stack,
			})
		);
	}
}

function findItemWithIdentifierInStacks({
	ignoreStack,
	identifier,
	stack,
}) {
	for (const level of stack) {
		const foundItem = findIn(level);

		if (foundItem)
			return foundItem;
	}

	return (
		stack.parent
		&&
		findItemWithIdentifierInStacks({
			identifier,
			ignoreStack: stack,
			stack: stack.parent.level.stack,
		})
	);

	function findIn(
		items
	) {
		for (const item of items)
			if (item.id == identifier)
				return item;
			else if (item.items != ignoreStack) {
				const foundItem =
					findItemWithIdentifierInStacks({
						identifier,
						ignoreStack,
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