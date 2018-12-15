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
						"testcases",
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