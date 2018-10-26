module.exports = createStack;

function createStack(
	levels,
) {
	const stack = levels.map(createLevel);

	for (const level of stack)
		level.stack = stack;

	return stack;
}

function createLevel(
	items,
) {
	const level = items.map(createItem);

	for (const item of level)
		item.level = level;

	return level;
}

function createItem({
	id = null,
	items,
	...restOfItem
}) {
	const item =
		{
			...id && { id },
			...restOfItem,
		};

	if (items)
		item.items = createStackFromItems();

	return item;

	function createStackFromItems() {
		const stack = createStack(items);

		stack.parent = item;

		return stack;
	}
}