/* istanbul ignore file: only used when JavaScript file is process entry point */

const yaml = require("js-yaml");

const callWhenProcessEntryPoint = require("@devsnicket/eunice-call-when-process-entry-point");

module.exports =
	({
		action,
		parentModule = module.parent,
		standardInputParameter,
	}) =>
		callWhenProcessEntryPoint({
			action:
				processArguments =>
					yaml.safeDump(
						action(processArguments),
						{ lineWidth: Number.MAX_SAFE_INTEGER },
					),
			parentModule,
			standardInputParameter,
		});