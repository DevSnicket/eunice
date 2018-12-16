/* istanbul ignore file: only used when JavaScript file is process entry point */

const
	callWithProcessStandardStreamsOfYamlOutput = require("./callWithProcessStandardStreamsOfYamlOutput"),
	yaml = require("js-yaml");

module.exports =
	action =>
		callWithProcessStandardStreamsOfYamlOutput({
			action:
				processArguments =>
					action({
						...processArguments,
						items: yaml.safeLoad(processArguments.items),
					}),
			standardInputParameter:
				"items",
		});