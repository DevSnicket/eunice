const
	callWithYamlInputAndOutputWhenProcessEntryPoint = require("../../../callWithYamlInputAndOutputWhenProcessEntryPoint"),
	orderItemsByIndexOf = require("../"),
	processorPlugins = require("../../../../Harnesses/processorPlugins");

/* istanbul ignore next: only used when JavaScript file is process entry point */
callWithYamlInputAndOutputWhenProcessEntryPoint(
	processArguments =>
		orderItemsByType({
			...processArguments,
			typesInOrder:
				processArguments.typesInOrder
				.map(
					type =>
						type === ""
						?
						// type array index of will only work when exact match
						// eslint-disable-next-line no-undefined
						undefined
						:
						type,
				),
		}),
);

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