const stack = require("./");

test.each(
	[
		[
			{
				identifierStack: null,
				items: null,
			},
			null,
		],
		[
			{
				identifierStack: [],
				items: "item",
			},
			"item",
		],
		[
			{
				identifierStack: [ [ "item1", "item2" ] ],
				items: [ "item1", "item2" ],
			},
			[ [ "item1", "item2" ] ],
		],
		[
			{
				identifierStack: [ [ "item1", "item2" ] ],
				items: [ "item1", "item2", "item3" ],
			},
			[
				[ "item1", "item2" ],
				"item3",
			],
		],
		[
			{
				identifierStack: [ "itemSpecified" ],
				items: [ "itemNotSpecified" ],
			},
			[ "itemNotSpecified" ],
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(stack(items))
		.toEqual(expected),
);