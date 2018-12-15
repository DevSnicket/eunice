const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	unstackIndependent = require("./");

processorPlugins.plugIn({
	action: unstackIndependent,
	text: "unstack independent",
});