const
	createOrAddToStacksUsingFileSystem = require("."),
	path = require("path");

test(
	"stack child items",
	() =>
		expect(
			createOrAddToStacksUsingFileSystem({
				directory:
					path.join(
						__dirname,
						"getIdentifiersInNewStackForAncestorsAndDirectory",
						"testCases",
					),
				items:
					[
						{ id: "parent" },
						{ id: "directoryWithStack" },
					],
				subsetIdentifierHierarchy:
				[ "parent" ],
			}),
		)
		.toEqual(
			[
				{
					id: "parent",
					items: [ "upperItem1", "lowerItem1" ],
				},
				{ id: "directoryWithStack" },
			],
		),
);