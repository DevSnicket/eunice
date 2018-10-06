const
	path = require("path"),
	stackItemsUsingFileSystem = require("./");

test.each(
	[
		[ null, null ],
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
				id:
					"directoryWithoutStack",
				items:
					[ "firstItem", "secondItem" ],
			},
			{
				id:
					"directoryWithoutStack",
				items:
					[ "firstItem", "secondItem" ],
			},
		],
		[
			{
				id:
					"directoryWithStack",
				items:
					[
						"directoryWithStack/lowerItem2",
						"directoryWithStack/upperItem2",
					],
			},
			{
				id:
					"directoryWithStack",
				items:
					[
						[ "directoryWithStack/upperItem2" ],
						[ "directoryWithStack/lowerItem2" ],
					],
			},
		],
		[
			{
				id:
					"directoryWithStack",
				items:
					[
						"directoryWithStack/lowerItem2",
						"directoryWithStack/lowerItem3",
						"directoryWithStack/upperItem2",
					],
			},
			{
				id:
					"directoryWithStack",
				items:
					[
						[
							"directoryWithStack/upperItem2",
						],
						[
							"directoryWithStack/lowerItem2",
							"directoryWithStack/lowerItem3",
						],
					],
			},
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			stackItemsUsingFileSystem({
				items,
				rootDirectory: path.join(__dirname, "testcases"),
			}),
		)
		.toEqual(
			expected,
		),
);