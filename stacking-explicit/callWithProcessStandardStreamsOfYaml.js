/* istanbul ignore file: only used when JavaScript file is process entry point */

const
	callWithProcessStandardStreamsAndYamlOutput = require("./callWithProcessStandardStreamsOfYamlOutput"),
	yaml = require("js-yaml");

module.exports =
	action =>
		callWithProcessStandardStreamsAndYamlOutput({
			action:
				processArguments =>
					action({
						...processArguments,
						items: yaml.safeLoad(processArguments.items),
					}),
			standardInputParameter:
				"items",
		});