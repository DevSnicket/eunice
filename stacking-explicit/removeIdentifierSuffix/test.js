const removeIdentifierSuffix = require(".");

test.each(
	[
		[ null, null, null ],
		[
			{},
			null,
			{},
		],
		[
			"item",
			null,
			"item",
		],
		[
			[ "item" ],
			null,
			[ "item" ],
		],
		[
			[ [ "item" ] ],
			null,
			[ [ "item" ] ],
		],
		[
			[ { id: "item" } ],
			null,
			[ { id: "item" } ],
		],
		[
			"item suffix",
			" suffix",
			"item",
		],
		[
			[ "item suffix" ],
			" suffix",
			[ "item" ],
		],
		[
			[ [ "item suffix" ] ],
			" suffix",
			[ [ "item" ] ],
		],
		[
			[ { id: "item suffix" } ],
			" suffix",
			[ { id: "item" } ],
		],
		[
			[ { items: [ "child suffix" ] } ],
			" suffix",
			[ { items: [ "child" ] } ],
		],
		[
			[ { items: [ [ "child suffix" ] ] } ],
			" suffix",
			[ { items: [ [ "child" ] ] } ],
		],
		[
			[ { items: [ { id: "child suffix" } ] } ],
			" suffix",
			[ { items: [ { id: "child" } ] } ],
		],
		[
			[
				{
					id: "parent suffix",
					items: [ "child suffix" ],
				},
			],
			" suffix",
			[
				{
					id: "parent",
					items: [ "child" ],
				},
			],
		],
	],
)(
	"%j items with %j suffix returns %j",
	(items, suffix, expected) =>
		expect(removeIdentifierSuffix({ items, suffix }))
		.toEqual(expected),
);