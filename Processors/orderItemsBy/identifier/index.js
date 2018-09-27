const
	callWithYamlItemsAndOutputWhenProcessEntryPoint = require("../../callWithYamlItemsAndOutputWhenProcessEntryPoint"),
	processorPlugins = require("../../../Harnesses/processorPlugins");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWithYamlItemsAndOutputWhenProcessEntryPoint(
	parameters => orderItemsByIdentifier(parameters.items),
);

processorPlugins.plugIn({
	action: orderItemsByIdentifier,
	text: "order items by identifier",
});

module.exports = orderItemsByIdentifier;

function orderItemsByIdentifier(
	items,
) {
	return (
		items.sort(
			(left, right) =>
				compareIdentifiers(
					getItemIdentifier(left),
					getItemIdentifier(right),
				),
		)
	);
}

function getItemIdentifier(
	item,
) {
	return item.id;
}

function compareIdentifiers(
	left,
	right,
) {
	return (
		left !== right
		&&
		(left < right ? -1 : 1)
	);
}