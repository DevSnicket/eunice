module.exports = createYamlFromStack;

function createYamlFromStack(
	stack,
) {
	return (
		stack.length === 1
		?
		createFromLevel(stack[0])
		:
		stack.map(createFromLevel)
	);

	function createFromLevel(
		level,
	) {
		return (
			stack.length === 1 && level.length === 1
			?
			createFromItem(level[0])
			:
			level.map(createFromItem)
		);
	}
}

function createFromItem(
	item,
) {
	const
		dependsUponProperty =
			createDependsUponProperty(
				item.dependsUpon,
			),
		itemsProperty =
			createItemsProperty(
				item.items,
			);

	return (
		dependsUponProperty || itemsProperty
		?
		{
			...item.id && { id: item.id },
			...dependsUponProperty,
			...itemsProperty,
		}
		:
		item.id
	);
}

function createDependsUponProperty(
	dependsUpon,
) {
	return (
		dependsUpon
		&&
		{
			dependsUpon:
				dependsUpon.length === 1
				?
				getIdentifierPropertyOrValue(dependsUpon[0])
				:
				dependsUpon.map(getIdentifierPropertyOrValue),
		}
	);
}

function getIdentifierPropertyOrValue(
	value,
) {
	return value.id || value;
}

function createItemsProperty(
	items,
) {
	return (
		items
		&&
		{ items: createYamlFromStack(items) }
	);
}