/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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