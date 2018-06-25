module.exports = standariseStack;

function standariseStack(
	stack
) {
	for (let index = 0; index < stack.length; index++)
		standardiseAsLevel({
			identifierOrItemOrLevel: stack[index],
			replace: replacement => stack[index] = replacement,
		});

	function standardiseAsLevel({
		identifierOrItemOrLevel,
		replace,
	}) {
		if (Array.isArray(identifierOrItemOrLevel))
			whenLevel(identifierOrItemOrLevel);
		else
			replace(
				isString(identifierOrItemOrLevel)
				?
				createLevelWhenIdentifier(identifierOrItemOrLevel)
				:
				createLevelWhenObject(identifierOrItemOrLevel)
			);
	}

	function whenLevel(
		items
	) {
		for (let index = 0; index < items.length; index++) {
			const item = items[index];

			if (isString(item))
				items[index] =
					{
						id: item,
						level: items,
					};
			else {
				createLevelWhenObject(item);
				item.level = items;
			}
		}

		items.stack = stack;
	}

	function createLevelWhenObject(
		item
	) {
		if (isString(item.dependsUpon))
			item.dependsUpon = [ item.dependsUpon ];

		if (item.items) {
			if (!item.items.length || !Array.isArray(item.items[0]))
				item.items = [ item.items ];

			standariseStack(item.items);

			item.items.item = item;
		}

		return createLevel(item);
	}

	function isString(
		value
	) {
		return typeof value === "string";
	}

	function createLevelWhenIdentifier(
		identifier
	) {
		return createLevel({ id: identifier });
	}

	function createLevel(
		item
	) {
		const level = [ item ];

		level.stack = stack;

		item.level = level;

		return level;
	}
}