// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default createStackFromParsedYaml;

function createStackFromParsedYaml(
	yaml,
) {
	const stack =
		Array.isArray(yaml)
		?
		createFromArray()
		:
		[ createLevelFromIdentifierOrItem(yaml) ];

	for (const level of stack)
		level.stack = stack;

	return stack;

	function createFromArray() {
		return (
			yaml.some(Array.isArray)
			?
			yaml
			.filter(itemOrLevel => itemOrLevel)
			.map(createLevelFromIdentifierOrItemOrLevel)
			:
			[ createLevelFromIdentifierOrItemOrLevel(yaml) ]
		);
	}
}

function createLevelFromIdentifierOrItemOrLevel(
	identifierOrItemOrLevel,
) {
	return (
		Array.isArray(identifierOrItemOrLevel)
		?
		createLevelFromItems(identifierOrItemOrLevel)
		:
		createLevelFromIdentifierOrItem(identifierOrItemOrLevel)
	);
}

function createLevelFromItems(
	items,
) {
	const level =
		items
		.map(
			item =>
				isString(item)
				?
				{ id: item }
				:
				createItemFromObject(item),
		);

	for (const item of level)
		item.level = level;

	return level;
}

function createLevelFromIdentifierOrItem(
	identifierOrItem,
) {
	return (
		isString(identifierOrItem)
		?
		createLevelWhenIdentifier(identifierOrItem)
		:
		createLevel(createItemFromObject(identifierOrItem))
	);
}

function isString(
	value,
) {
	return typeof value === "string";
}

function createLevelWhenIdentifier(
	identifier,
) {
	return createLevel({ id: identifier });
}

function createLevel(
	item,
) {
	const level = [ item ];

	item.level = level;

	return level;
}

function createItemFromObject({
	dependsUpon,
	id,
	items,
	...restOfObject
}) {
	const item =
		{
			...id && { id },
			...dependsUpon && { dependsUpon: ensureIsArray(dependsUpon) },
			...restOfObject,
			...items && { items: createStackFromParsedYaml(items) },
		};

	if (item.items)
		item.items.parent = item;

	return item;
}

function ensureIsArray(
	item,
) {
	return (
		Array.isArray(item)
		?
		item
		:
		[ item ]
	);
}