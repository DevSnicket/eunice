const orderItemsByIdentifier = require(".");

const
	expected =
		[
			{ id: "item1" },
			{ id: "item2" },
			{ id: "item3" },
		],
	items =
		[
			{ id: "item1" },
			{ id: "item3" },
			{ id: "item2" },
		];

test(
	`${JSON.stringify(items)} items returns ${JSON.stringify(expected)}`,
	() =>
		expect(
			orderItemsByIdentifier(items),
		)
		.toEqual(
			expected,
		),
);