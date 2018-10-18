const
	getIdentifiersInNewStackForAncestorsAndDirectory = require("."),
	path = require("path");

test.each(
	[
		[
			[],
			[ "upperItem1", "lowerItem1" ],
		],
		[
			[ { id: "directoryWithoutStack" } ],
			false,
		],
		[
			[ { id: "directoryWithStack" } ],
			[ "upperItem2", "lowerItem2" ],
		],
		[
			[
				{ id: "directoryWithSubdirectoryWithStack" },
				{ id: "subdirectoryWithStack" },
			],
			[ "upperItem3", "lowerItem3" ],
		],
	],
)(
	"%j ancestors returns %j",
	(ancestors, expected) =>
		expect(
			getIdentifiersInNewStackForAncestorsAndDirectory({
				ancestors,
				directory: path.join(__dirname, "testcases"),
			}),
		)
		.toEqual(
			expected,
		),
);