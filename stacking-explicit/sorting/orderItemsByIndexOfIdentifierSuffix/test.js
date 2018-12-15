const orderItemsByIdentifierSuffix = require(".");

const
	expected =
		[
			{ id: "item3/suffix3" },
			{ id: "item2/suffix2" },
			{ id: "item1/suffix1" },
			{ notId: "item4" },
		],
	identifierSuffixesInOrder =
		[ "/suffix3", "/suffix2" ],
	items =
		[
			{ id: "item1/suffix1" },
			{ id: "item2/suffix2" },
			{ id: "item3/suffix3" },
			{ notId: "item4" },
		];

test(
	`${JSON.stringify(items)} items and identifier suffixes in order ${JSON.stringify(identifierSuffixesInOrder)} returns ${JSON.stringify(expected)}`,
	() =>
		expect(
			orderItemsByIdentifierSuffix({
				identifierSuffixesInOrder,
				items,
			}),
		)
		.toEqual(
			expected,
		),
);