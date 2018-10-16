const stack = require(".");

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
				identifierOrItemOrLevelOrStack: "itemNotSpecified",
				identifiersToStack: [],
			},
			"itemNotSpecified",
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "itemNotSpecified" ],
				identifiersToStack: [ "itemMissingAndSpecified", "existing" ],
			},
			[ "itemNotSpecified" ],
		],
		[
			{
				identifierOrItemOrLevelOrStack: [ "itemSpecified", "itemNotSpecified" ],
				identifiersToStack: [ "itemMissingAndSpecified", "itemSpecified", "existing" ],
			},
			[
				[ "itemSpecified" ],
				[ "itemNotSpecified" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[
						[ "upperItemSpecified" ],
						"lowerItemSpecified",
					],
				identifiersToStack:
					[ "upperItemSpecified", "lowerItemSpecified" ],
			},
			[
				[ "upperItemSpecified" ],
				[ "lowerItemSpecified" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[
						[ "upperItemSpecified" ],
						"lowerItemNotSpecified",
					],
				identifiersToStack:
					[ "upperItemSpecified", "existing" ],
			},
			[
				[ "upperItemSpecified" ],
				"lowerItemNotSpecified",
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[ "itemNotSpecified", "itemSpecified" ],
				identifiersToStack:
					[
						"existing",
						[ "itemSpecified" ],
					],
			},
			[
				[ "itemNotSpecified" ],
				[ "itemSpecified" ],
			],
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					[
						[ "upperItemNotSpecified" ],
						[ "lowerItemNotSpecified" ],
					],
				identifiersToStack:
					[ "itemMissingAndSpecified", "existing" ],
			},
			[
				[ "upperItemNotSpecified" ],
				[ "lowerItemNotSpecified" ],
			],
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
				identifierOrItemOrLevelOrStack: [ "otherItem", "anotherItemWithFirstItemInItsIdentifier" ],
				identifiersToStack: [ "anotherItemWithFirstItemInItsIdentifier", "otherItem" ],
			},
			[
				[ "anotherItemWithFirstItemInItsIdentifier" ],
				[ "otherItem" ],
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
				identifierOrItemOrLevelOrStack:
					[ "item1", "item2", "item3" ],
				identifiersToStack:
					[
						[ "item1", "item2" ],
						"existing",
					],
			},
			[
				[ "item1", "item2" ],
				[ "item3" ],
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
					[ "existing", "item2", "item3" ],
			},
			[
				[ "item1" ], [ "item2" ], [ "item3" ],
			],
		],
	],
)(
	"%j items returns %j",
	(items, existing) =>
		expect(stack(items))
		.toEqual(existing),
);

test(
	"Item and existing not specified throws error",
	() =>
		expect(
			() =>
				stack({
					identifierOrItemOrLevelOrStack: [ "itemNotSpecified" ],
					identifiersToStack: [ "itemMissingAndSpecified" ],
				}),
		)
		.toThrowError(
			"Single item level of \"existing\" not specified in \"itemMissingAndSpecified\".",
		),
);