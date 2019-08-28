// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

module.exports =
	commaSeparated => {
		return (
			splitItemsWhenArray()
			||
			splitWhenString()
			||
			[]
		);

		function splitItemsWhenArray() {
			return (
				Array.isArray(commaSeparated)
				&&
				commaSeparated.map(split)
			);
		}

		function splitWhenString() {
			return (
				typeof commaSeparated === "string"
				&&
				split(commaSeparated)
			);
		}
	};

function split(
	value,
) {
	return value.split(",");
}