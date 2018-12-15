const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	removeRedundantParentIdentifierPrefix = require("./");

processorPlugins.plugIn({
	action: removeRedundantParentIdentifierPrefix,
	parameter: { name: "identifierSeparator" },
	text: "remove redundant identifier prefix of parent and separator",
});