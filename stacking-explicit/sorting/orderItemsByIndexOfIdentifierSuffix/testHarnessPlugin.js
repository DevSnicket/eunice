const
	orderItemsByIdentifierSuffix = require("./"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

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