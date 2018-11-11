const
	callWithYamlInputAndOutputWhenProcessEntryPoint = require("../callWithYamlInputAndOutputWhenProcessEntryPoint"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses/processorPlugins");

callWithYamlInputAndOutputWhenProcessEntryPoint(
	removeSelfDependentItemsOfType,
);

processorPlugins.plugIn({
	action: removeSelfDependentItemsOfType,
	parameter: { name: "type" },
	text: "remove self dependent items of a type",
});

module.exports = removeSelfDependentItemsOfType;

function removeSelfDependentItemsOfType({
	items,
	type,
}) {
	return (
		whenItemMatch(
			item => item.type !== type || !isSelfDependent(item),
		)
		.getIdentifierOrItemMatchOrFilterItemsInLevelOrStack(
			items,
		)
	);
}

function isSelfDependent({
	id: identifier,
	dependsUpon,
	// parameter specified, but not used to remove it from the rest property
	// eslint-disable-next-line no-unused-vars
	type,
	...restOfItem
}) {
	const result =
		identifier
		&&
		dependsUpon
		&&
		(dependsUpon === identifier || isOnlyDependsUpon());

	if (result) {
		const otherProperties = Object.keys(restOfItem);

		if (otherProperties.length)
			throw Error(`Self dependent item (${identifier}) is of type and has additional properties (${otherProperties}) that would be lost if removed.`);
	}

	return result;

	function isOnlyDependsUpon() {
		return (
			dependsUpon.length === 1
			&&
			dependsUpon[0] === identifier
		);
	}
}

function whenItemMatch(
	itemPredicate,
) {
	return { getIdentifierOrItemMatchOrFilterItemsInLevelOrStack };

	function getIdentifierOrItemMatchOrFilterItemsInLevelOrStack(
		identifierOrItemOrLevelOrStack,
	) {
		return (
			Array.isArray(identifierOrItemOrLevelOrStack)
			?
			filterLevelOrStack(identifierOrItemOrLevelOrStack)
			:
			getIdentifierOrItemMatch(identifierOrItemOrLevelOrStack)
		);
	}

	function filterLevelOrStack(
		levelOrStack,
	) {
		return (
			mapWhenNotEmptyOfTruthy(
				levelOrStack,
				getIdentifierOrItemMatchOrFilterLevel,
			)
		);
	}

	function getIdentifierOrItemMatchOrFilterLevel(
		identifierOrItemOrLevel,
	) {
		return (
			Array.isArray(identifierOrItemOrLevel)
			?
			mapWhenNotEmptyOfTruthy(identifierOrItemOrLevel, getIdentifierOrItemMatch)
			:
			getIdentifierOrItemMatch(identifierOrItemOrLevel)
		);
	}

	function getIdentifierOrItemMatch(
		identifierOrItem,
	) {
		return (
			getWhenIdentifier()
			||
			isItemMatchAndFilterItems(identifierOrItem)
		);

		function getWhenIdentifier() {
			return typeof identifierOrItem === "string" && identifierOrItem;
		}
	}

	function isItemMatchAndFilterItems(
		item,
	) {
		return (
			item && itemPredicate(item)
			?
			createItemWithFilteredItems(item)
			:
			null
		);
	}

	function createItemWithFilteredItems({
		items,
		...restOfItem
	}) {
		const filteredItems =
			getIdentifierOrItemMatchOrFilterItemsInLevelOrStack(items);

		return (
			{
				...restOfItem,
				...filteredItems && { items: filteredItems },
			}
		);
	}
}

function mapWhenNotEmptyOfTruthy(
	items,
	selector,
) {
	return (
		items.reduce(
			(aggregation, item) => {
				const result = selector(item);

				return (
					result
					?
					[
						...aggregation || [],
						result,
					]
					:
					aggregation
				);
			},
			null,
		)
	);
}