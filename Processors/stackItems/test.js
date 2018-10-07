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
				identifierStack: [ "itemSpecified" ],
				items: [ "itemNotSpecified" ],
			},
			[ "itemNotSpecified" ],
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
				identifierStack: [ "item1", "item2" ],
				items: [ "item1", "item2" ],
			},
			[
				[ "item1" ],
				[ "item2" ],
			],
		],
		[
			{
				identifierStack: [ "item2", "item1" ],
				items: [ "item1", "item2" ],
			},
			[
				[ "item2" ],
				[ "item1" ],
			],
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
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(stack(items))
		.toEqual(expected),
);