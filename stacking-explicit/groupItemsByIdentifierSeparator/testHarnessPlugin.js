const
	groupItemsByIdentifierSeparator = require("./"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

processorPlugins.plugIn({
	action: groupItemsByIdentifierSeparator,
	parameter: { name: "identifierSeparator" },
	text: "group items by identifier separator",
});