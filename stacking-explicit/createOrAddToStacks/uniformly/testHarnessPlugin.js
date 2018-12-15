const
	createOrAddToStacksUniformly = require("./"),
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins");

processorPlugins.plugIn({
	action:
		createOrAddToStacksUniformly,
	parameter:
		{
			isMultiple: true,
			name: "commaSeparatedLevels",
		},
	text:
		"stack uniformly",
});