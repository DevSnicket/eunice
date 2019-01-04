module.exports = createYamlFromStack;

/**
 * @param {import("../index").Stack} stack
 * @returns {import("../index").Yaml}
 */
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

function createFromItem({
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	dependents,
	dependsUpon,
	id: identifier,
	items,
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	level,
	...restOfItem
}) {
	const
		dependsUponProperty =
			createDependsUponProperty(
				dependsUpon,
			),
		itemsProperty =
			createItemsProperty(
				items,
			);

	return (
		dependsUponProperty || itemsProperty || Object.keys(restOfItem).length
		?
		{
			...identifier && { id: identifier },
			...restOfItem,
			...dependsUponProperty,
			...itemsProperty,
		}
		:
		identifier
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