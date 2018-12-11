const
	orderItemsByIndexOf = require("../"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses/processorPlugins");

processorPlugins.plugIn({
	action:
		orderItemsByType,
	parameter:
		{
			isMultiple: true,
			name: "typesInOrder",
		},
	text:
		"order items by type",
});

module.exports = orderItemsByType;

function orderItemsByType({
	items,
	typesInOrder,
}) {
	return (
		orderItemsByIndexOf({
			getItemIndex: item => typesInOrder.indexOf(item.type),
			items,
		})
	);
}