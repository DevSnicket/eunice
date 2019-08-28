// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

/* istanbul ignore file: only used when JavaScript file is process entry point */

const
	callWithProcessStandardStreams = require("@devsnicket/eunice-call-with-process-standard-streams"),
	yaml = require("js-yaml");

module.exports =
	action =>
		callWithProcessStandardStreams({
			action:
				processArguments =>
					yaml.safeDump(
						action({
							...processArguments,
							items: yaml.safeLoad(processArguments.items),
						}),
						{ lineWidth: Number.MAX_SAFE_INTEGER },
					),
			standardInputParameter:
				"items",
		});