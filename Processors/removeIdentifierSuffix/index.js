const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	processorPlugins = require("../../Harnesses/processorPlugins");

callWithYamlItemsAndOutputWhenProcessEntryPoint(
	removeIdentifierSuffix,
);

processorPlugins.plugIn({
	action: removeIdentifierSuffix,
	parameter: { name: "suffix" },
	text: "remove identifier suffix",
});

module.exports = removeIdentifierSuffix;

function removeIdentifierSuffix({
	items,
	suffix,
}) {
	return (
		withSuffix(suffix)
		.removeFromItemsOrItem(items)
	);
}

function withSuffix(
	suffix,
) {
	return { removeFromItemsOrItem };

	function removeFromItemsOrItem(
		itemsOrItem,
	) {
		return (
			Array.isArray(itemsOrItem)
			?
			itemsOrItem.map(removeFromIdentifierOrItemOrLevel)
			:
			itemsOrItem && removeFromIdentifierOrItem(itemsOrItem)
		);
	}

	function removeFromIdentifierOrItemOrLevel(
		identifierOrItemOrLevel,
	) {
		return (
			Array.isArray(identifierOrItemOrLevel)
			?
			identifierOrItemOrLevel.map(removeFromIdentifierOrItem)
			:
			removeFromIdentifierOrItem(identifierOrItemOrLevel)
		);
	}

	function removeFromIdentifierOrItem(
		identifierOrItem,
	) {
		return (
			(typeof identifierOrItem === "string" && removeFromIdentifier(identifierOrItem))
			||
			removeFromItem(identifierOrItem)
		);
	}

	function removeFromItem({
		id,
		...itemWithoutId
	}) {
		return (
			{
				...id && { id: removeFromIdentifier(id) },
				...itemWithoutId,
				...createItemsProperty(),
			}
		);

		function createItemsProperty() {
			return (
				itemWithoutId.items
				&&
				{
					items:
						removeFromItemsOrItem(
							itemWithoutId.items,
						),
				}
			);
		}
	}

	function removeFromIdentifier(
		identifier,
	) {
		return (
			identifier.endsWith(suffix)
			?
			identifier.substring(0, identifier.length - suffix.length)
			:
			identifier
		);
	}
}