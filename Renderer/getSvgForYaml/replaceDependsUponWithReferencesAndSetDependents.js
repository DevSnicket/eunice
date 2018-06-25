module.exports =
	stack => {
		for (const items of stack)
			for (const item of items) {
				updateItemWhenRequired(item);

				if (item.items)
					for (const itemStack of item.items)
						for (const childItem of itemStack)
							updateItemWhenRequired(childItem);
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
			return findItemWithIdentifierInStack({ identifier, stack });
		}
	};

function findItemWithIdentifierInStack({
	identifier,
	stack,
}) {
	for (const items of stack) {
		const foundItem = findIn(items);

		if (foundItem)
			return foundItem;
	}

	return null;

	function findIn(
		items
	) {
		for (const item of items)
			if (item.id == identifier)
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
		const identifier = dependsUpon[index];

		addDependent({
			dependent:
				item,
			item:
				dependsUpon[index] = findItemWithIdentifier(identifier) || identifier,
		});
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