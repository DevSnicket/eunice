const orderItemsByIdentifier = require(".");

test.each(
	[
		[
			null,
			null,
		],
		[
			"item1",
			"item1",
		],
		[
			{ id: "item1" },
			{ id: "item1" },
		],
		[
			[
				{ id: "item1" },
				{ id: "item3" },
				{ id: "item2" },
			],
			[
				{ id: "item1" },
				{ id: "item2" },
				{ id: "item3" },
			],
		],
		[
			[
				{ id: "item2" },
				{ anotherIdentifier: "item3" },
				{ id: "item1" },
			],
			[
				{ anotherIdentifier: "item3" },
				{ id: "item1" },
				{ id: "item2" },
			],
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			orderItemsByIdentifier(items),
		)
		.toEqual(
			expected,
		),
);