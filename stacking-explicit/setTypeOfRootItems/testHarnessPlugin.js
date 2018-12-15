const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	setTypeOfRootItems = require("./");

processorPlugins.plugIn({
	action: setTypeOfRootItems,
	parameter: { name: "type" },
	text: "set type of root items",
});