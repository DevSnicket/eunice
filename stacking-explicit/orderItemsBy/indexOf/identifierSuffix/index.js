const
	callWithYamlInputAndOutputWhenProcessEntryPoint = require("../../../callWithYamlInputAndOutputWhenProcessEntryPoint"),
	orderItemsByIndexOf = require(".."),
	processorPlugins = require("@devsnicket/eunice-test-harnesses/processorPlugins");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWithYamlInputAndOutputWhenProcessEntryPoint(
	({
		identifierSuffixesInOrder,
		items,
	}) =>
		orderItemsByIdentifierSuffix({
			identifierSuffixesInOrder:
				Array.isArray(identifierSuffixesInOrder)
				?
				identifierSuffixesInOrder
				:
				identifierSuffixesInOrder && [ identifierSuffixesInOrder ],
			items,
		}),
);

processorPlugins.plugIn({
	action:
		orderItemsByIdentifierSuffix,
	parameter:
		{
			isMultiple: true,
			name: "identifierSuffixesInOrder",
		},
	text:
		"order items by identifier suffix",
});

module.exports = orderItemsByIdentifierSuffix;

function orderItemsByIdentifierSuffix({
	items,
	identifierSuffixesInOrder,
}) {
	return (
		orderItemsByIndexOf({
			getItemIndex:
				item =>
					getWhenIndexOrDefault(
						getItemIndex(item),
					),
			items,
		})
	);

	function getItemIndex(
		item,
	) {
		return (
			item.id
			?
			identifierSuffixesInOrder.findIndex(
				suffix => item.id.endsWith(suffix),
			)
			:
			-1
		);
	}

	function getWhenIndexOrDefault(
		index,
	) {
		return (
			index === -1
			?
			identifierSuffixesInOrder.length
			:
			index
		);
	}
}