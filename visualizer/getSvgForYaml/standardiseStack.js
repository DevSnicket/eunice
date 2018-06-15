module.exports =
	stack => {
		for (let index = 0; index < stack.length; index++)
			standardiseItems({
				items: stack[index],
				replace: replacement => stack[index] = replacement,
			});
	};

function standardiseItems({
	items,
	replace,
}) {
	if (Array.isArray(items))
		whenArray(items);
	else
		replace(
			isString(items)
			?
			whenIdentifier(items)
			:
			whenObject(items)
		);
}

function whenArray(
	items
) {
	for (let index = 0; index < items.length; index++) {
		const item = items[index];

		if (isString(item))
			items[index] = {
				id: item,
				parent: items,
			};
		else {
			whenObject(item);
			item.parent = items;
		}
	}
}

function whenObject(
	item
) {
	if (isString(item.dependsUpon))
		item.dependsUpon = [ item.dependsUpon ];

	if (item.items) {
		if (isString(item.items))
			item.items = whenIdentifier(item.items);
		else
			standardiseItems({
				items: item.items,
				replace: replacement => item.items = replacement,
			});

		item.items.parent = item;
	}

	return createParentArray(item);
}

function isString(
	value
) {
	return typeof value === "string";
}

function whenIdentifier(
	identifier
) {
	return createParentArray({ id: identifier });
}

function createParentArray(
	item
) {
	const parent = [ item ];

	item.parent = parent;

	return parent;
}