const stack = require("./");

test.each(
	[
		[
			{
				identifierOrItemOrLevelOrStack: null,
				identifiersToStack: null,
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: "item",
				identifiersToStack: [],
			},
			"item",
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "itemNotSpecified" ],
				identifiersToStack: [ "itemSpecified" ],
			},
			[ "itemNotSpecified" ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "item1", "item2" ],
				identifiersToStack: [ [ "item1", "item2" ] ],
			},
			[ [ "item1", "item2" ] ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "item1", "item2" ],
				identifiersToStack: [ "item1", "item2" ],
			},
			[
				[ "item1" ],
				[ "item2" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "item1", "item2" ],
				identifiersToStack: [ "item2", "item1" ],
			},
			[
				[ "item2" ],
				[ "item1" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "item1", "item2", "item3" ],
				identifiersToStack: [ [ "item1", "item2" ] ],
			},
			[
				[ "item1", "item2" ],
				"item3",
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[
						[ "item1" ],
						[ "item2", "item3" ],
					],
				identifiersToStack:
					[ "item2", "item3" ],
			},
			[
				[ "item1" ], [ "item2" ], [ "item3" ],
			],
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(stack(items))
		.toEqual(expected),
);