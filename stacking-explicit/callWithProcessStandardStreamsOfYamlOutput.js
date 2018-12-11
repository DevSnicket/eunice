/* istanbul ignore file: only used when JavaScript file is process entry point */

const
	callWithProcessStandardStreams = require("@devsnicket/eunice-call-with-process-standard-streams"),
	yaml = require("js-yaml");

module.exports =
	({
		action,
		standardInputParameter,
	}) =>
		callWithProcessStandardStreams({
			action:
				processArguments =>
					yaml.safeDump(
						action(processArguments),
						{ lineWidth: Number.MAX_SAFE_INTEGER },
					),
			standardInputParameter,
		});