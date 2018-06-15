module.exports =
	stack => {
		for (const items of stack)
			for (const item of items) {
				addItemsDependents(item);

				if (item.items)
					for (const childItem of item.items)
						addItemsDependents(childItem);
			}

		function addItemsDependents(
			item
		) {
			if (item.dependsUpon)
				addItemsDependentsFromDependsUpon({
					dependsUpon: item.dependsUpon,
					findItem: findItemInStack,
					item,
				});
		}

		function findItemInStack(
			id
		) {
			for (const items of stack) {
				const foundItem = findItemIn(items);

				if (foundItem)
					return foundItem;
			}

			return null;

			function findItemIn(
				items
			) {
				for (const item of items)
					if (item.id == id)
						return item;
					else if (item.items) {
						const foundItem = findItemIn(item.items);

						if (foundItem)
							return foundItem;
					}

				return null;
			}
		}
	};

function addItemsDependentsFromDependsUpon({
	dependsUpon,
	findItem,
	item,
}) {
	for (let index = 0; index < dependsUpon.length; index++)
		addDependent({
			dependent:
				item,
			item:
				dependsUpon[index] = findItem(dependsUpon[index]),
		});
}

function addDependent({
	item,
	dependent,
}) {
	if (item)
		if (item.dependents)
			item.dependents.push(dependent);
		else
			item.dependents = [ dependent ];
}