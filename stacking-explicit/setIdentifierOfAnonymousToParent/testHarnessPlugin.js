const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	setIdentifierOfAnonymousToParent = require("./");

processorPlugins.plugIn({
	action: setIdentifierOfAnonymousToParent,
	text: "set identifier of anonymous to parent",
});