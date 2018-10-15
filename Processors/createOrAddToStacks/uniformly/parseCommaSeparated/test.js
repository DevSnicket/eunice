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