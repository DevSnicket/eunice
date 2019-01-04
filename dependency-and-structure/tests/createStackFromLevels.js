module.exports = createStackFromLevels;

function createStackFromLevels(
	levels,
) {
	return (
		mapWithNewArray(
			levels,
			(level, stack) =>
				createLevel({
					items: level,
					stack,
				}),
		)
	);
}

function createLevel({
	items,
	stack,
}) {
	return (
		Object.assign(
			mapWithNewArray(
				items,
				(item, level) =>
					createItem({
						...item,
						level,
					}),
			),
			{ stack },
		)
	);
}

function mapWithNewArray(
	items,
	mapFunction,
) {
	const newArray = Array(items.length);

	for (let index = 0; index < items.length; index++)
		newArray[index] =
			mapFunction(
				items[index],
				newArray,
			);

	return newArray;
}

function createItem({
	id,
	items,
	level,
	...restOfItem
}) {
	const item =
		{
			...id && { id },
			level,
			...restOfItem,
		};

	if (items)
		item.items =
			Object.assign(
				createStackFromLevels(items),
				{ parent: item },
			);

	return item;
}