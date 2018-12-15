const
	orderItemsByIdentifier = require("./"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

processorPlugins.plugIn({
	action: orderItemsByIdentifier,
	text: "order items by identifier",
});