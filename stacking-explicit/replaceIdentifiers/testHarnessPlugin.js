const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	replaceIdentifiers = require("./");

processorPlugins.plugIn({
	action: replaceIdentifiers,
	parameter: { name: "prefix" },
	text: "replace identifiers",
});