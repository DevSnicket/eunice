/* istanbul ignore file: only used when JavaScript file is process entry point */

const yaml = require("js-yaml");

const callWhenProcessEntryPoint = require("../callWhenProcessEntryPoint");

module.exports =
	action =>
		callWhenProcessEntryPoint({
			action:
				processArguments =>
					yaml.safeDump(
						action({
							...processArguments,
							items: yaml.safeLoad(processArguments.items),
						}),
						{ lineWidth: Number.MAX_SAFE_INTEGER },
					),
			parentModule:
				module.parent,
			standardInputParameter:
				"items",
		});