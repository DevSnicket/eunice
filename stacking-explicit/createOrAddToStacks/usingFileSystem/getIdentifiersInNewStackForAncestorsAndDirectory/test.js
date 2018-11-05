const
	getIdentifiersInNewStackForAncestorsAndDirectory = require("."),
	path = require("path");

test.each(
	[
		[
			[],
			null,
			[ "upperItem1", "lowerItem1" ],
		],
		[
			[ { id: "parent" } ],
			[ "parent" ],
			[ "upperItem1", "lowerItem1" ],
		],
		[
			[],
			[ "parent" ],
			false,
		],
		[
			[ { id: "directoryWithoutStack" } ],
			null,
			false,
		],
		[
			[ { id: "directoryWithStack" } ],
			null,
			[ "upperItem2", "lowerItem2" ],
		],
		[
			[
				{ id: "parent" },
				{ id: "directoryWithStack" },
			],
			[ "parent" ],
			[ "upperItem2", "lowerItem2" ],
		],
		[
			[
				{ },
				{ id: "directoryWithStack" },
			],
			[ null ],
			[ "upperItem2", "lowerItem2" ],
		],
		[
			[
				{ id: "directoryWithSubdirectoryWithStack" },
				{ id: "subdirectoryWithStack" },
			],
			null,
			[ "upperItem3", "lowerItem3" ],
		],
	],
)(
	"%j ancestors with subset identifier hierarchy %j returns %j",
	(ancestors, subsetIdentifierHierarchy, expected) =>
		expect(
			getIdentifiersInNewStackForAncestorsAndDirectory({
				ancestors,
				directory: path.join(__dirname, "testcases"),
				subsetIdentifierHierarchy,
			}),
		)
		.toEqual(
			expected,
		),
);