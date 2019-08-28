// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const parseCommaSeparated = require(".");

test.each(
	[
		[ null, [] ],
		[
			"item",
			[ "item" ],
		],
		[
			[ "item1", "item2" ],
			[ [ "item1" ], [ "item2" ] ],
		],
		[
			"item1,item2",
			[ "item1", "item2" ],
		],
		[
			[ "item1,item2" ],
			[ [ "item1", "item2" ] ],
		],
	],
)(
	"%j comma separated returns %j",
	(commaSeparated, expected) =>
		expect(
			parseCommaSeparated(
				commaSeparated,
			),
		)
		.toEqual(
			expected,
		),
);