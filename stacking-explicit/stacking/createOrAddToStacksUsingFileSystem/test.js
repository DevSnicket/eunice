// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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
						"getTargetLevelOrStackForAncestorsAndDirectory",
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
					items: [ [ "upperItem1" ], [ "lowerItem1" ] ],
				},
				{ id: "directoryWithStack" },
			],
		),
);