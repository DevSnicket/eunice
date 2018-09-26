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
		Array.isArray(items)
		?
		items.map(fromIdentifierOrItemOrLevel)
		:
		items && fromIdentifierOrItem(items)
	);

	function fromIdentifierOrItemOrLevel(
		identifierOrItemOrLevel,
	) {
		return (
			Array.isArray(identifierOrItemOrLevel)
			?
			identifierOrItemOrLevel.map(fromIdentifierOrItem)
			:
			fromIdentifierOrItem(identifierOrItemOrLevel)
		);
	}

	function fromIdentifierOrItem(
		identifierOrItem,
	) {
		return (
			(typeof identifierOrItem === "string" && removeFromIdentifier(identifierOrItem))
			||
			fromItem(identifierOrItem)
		);
	}

	function fromItem({
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
						removeIdentifierSuffix({
							items: itemWithoutId.items,
							suffix,
						}),
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