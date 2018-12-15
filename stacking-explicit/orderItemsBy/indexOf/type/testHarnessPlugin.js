const
	orderItemsByType = require("./"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

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