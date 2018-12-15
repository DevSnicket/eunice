const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	removeSelfDependentItemsOfType = require("./");

processorPlugins.plugIn({
	action: removeSelfDependentItemsOfType,
	parameter: { name: "type" },
	text: "remove self dependent items of a type",
});