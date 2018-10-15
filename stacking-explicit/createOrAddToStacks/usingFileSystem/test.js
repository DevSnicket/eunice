const
	path = require("path"),
	stackItemsUsingFileSystem = require(".");

test.each(
	[
		[ "aItem", "aItem" ],
		[ {}, {} ],
		[
			[ "lowerItem1", "upperItem1" ],
			[
				[ "upperItem1" ],
				[ "lowerItem1" ],
			],
		],
		[
			[ { id: "lowerItem1" }, { id: "upperItem1" } ],
			[
				[ { id: "upperItem1" } ],
				[ { id: "lowerItem1" } ],
			],
		],
		[
			{
				id: "directoryWithoutStack",
				items: [ "firstItem", "secondItem" ],
			},
			{
				id: "directoryWithoutStack",
				items: [ "firstItem", "secondItem" ],
			},
		],
		[
			{
				id: "directoryWithStack",
				items: [ "lowerItem2", "upperItem2" ],
			},
			{
				id: "directoryWithStack",
				items: [ [ "upperItem2" ], [ "lowerItem2" ] ],
			},
		],
		[
			{
				id: "directoryWithStack",
				items: [ "lowerItem2", "lowerItem3", "upperItem2" ],
			},
			{
				id:
					"directoryWithStack",
				items:
					[
						[ "upperItem2" ],
						[ "lowerItem2", "lowerItem3" ],
					],
			},
		],
		[
			{
				id:
					"directoryWithSubdirectoryWithStack",
				items:
					{
						id: "subdirectoryWithStack",
						items: [ "lowerItem4", "upperItem3" ],
					},
			},
			{
				id:
					"directoryWithSubdirectoryWithStack",
				items:
					{
						id: "subdirectoryWithStack",
						items: [ [ "upperItem3" ], [ "lowerItem4" ] ],
					},
			},
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			stackItemsUsingFileSystem({
				directory: path.join(__dirname, "testcases"),
				items,
			}),
		)
		.toEqual(
			expected,
		),
);