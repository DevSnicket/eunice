require("array.prototype.flatmap")
.shim();

const getIdentifierPropertyOrValue = require("./getIdentifierPropertyOrValue");

module.exports =
	dependsUpon =>
		getFirstWhenSingleOrAll(
			createDependsUponFromProperties(
				groupWithParentIdentifiersAsProperties(
					dependsUpon,
				),
			),
		);

function groupWithParentIdentifiersAsProperties(
	dependsUpon,
) {
	return (
		dependsUpon.reduce(
			(dependsUponByParent, dependUpon) =>
				addToGroupAsProperty({
					group:
						dependsUponByParent,
					key:
						getKeyFromParent(dependUpon.parent),
					value:
						getIdentifierPropertyOrValue(
							dependUpon.item,
						),
				}),
			{},
		)
	);
}

function getKeyFromParent(
	parent,
) {
	return (
		parent
		?
		getIdentifierPropertyOrValue(
			parent,
		)
		:
		""
	);
}

function addToGroupAsProperty({
	group,
	key,
	value,
}) {
	return (
		{
			...group,
			[key]:
				[
					...group[key] || [],
					value,
				],
		});
}

function createDependsUponFromProperties(
	object,
) {
	return (
		Object.entries(object)
		.flatMap(createFromObjectEntry)
	);
}

function createFromObjectEntry(
	entry,
) {
	const items = entry[1];

	return createWhenHasKey() || items;

	function createWhenHasKey() {
		const key = entry[0];

		return (
			key
			&&
			[
				{
					id: key,
					items: getItemsOrItemWhenSingle(),
				},
			]
		);

		function getItemsOrItemWhenSingle() {
			return (
				items.length === 1
				?
				items[0]
				:
				items
			);
		}
	}
}

function getFirstWhenSingleOrAll(
	items,
) {
	return (
		items.length === 1
		?
		items[0]
		:
		items
	);
}