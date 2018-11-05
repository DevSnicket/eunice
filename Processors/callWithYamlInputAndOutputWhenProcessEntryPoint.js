/* istanbul ignore file: only used when JavaScript file is process entry point */

const yaml = require("js-yaml");

const callWithYamlOutputWhenProcessEntryPoint = require("./callWithYamlOutputWhenProcessEntryPoint");

module.exports =
	action =>
		callWithYamlOutputWhenProcessEntryPoint({
			action:
				processArguments =>
					action({
						...processArguments,
						items: yaml.safeLoad(processArguments.items),
					}),
			parentModule:
				module.parent,
			standardInputParameter:
				"items",
		});