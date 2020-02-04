// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	createOrAddToStacksUsingFileSystem = require("."),
	path = require("path");

const testCasesDirectory =
	path.join(
		__dirname,
		"test-cases",
	);

test(
	"stack child items of subset",
	() =>
		expect(
			createOrAddToStacksUsingFileSystem({
				directory:
					path.join(
						testCasesDirectory,
						"directoryWithStack",
					),
				identifierOrItemOrLevelOrStack:
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

test(
	"stack in subdirectory moved into child items of parent stack item",
	() =>
		expect(
			createOrAddToStacksUsingFileSystem({
				directory:
					path.join(
						testCasesDirectory,
						"directoryWithStackOfSubdirectoryWithStackMovedIntoChildren",
					),
				identifierOrItemOrLevelOrStack:
					{
						id:
							"subdirectoryWithStack",
						items:
							[
								"subdirectoryWithStackLower",
								"subdirectoryWithStackUpper",
							],
					},
				subsetIdentifierHierarchy:
					null,
			}),
		)
		.toEqual({
			id:
				"new item",
			items:
				{
					id:
						"subdirectoryWithStack",
					items:
						[
							[ "subdirectoryWithStackUpper" ],
							[ "subdirectoryWithStackLower" ],
						],
				},
		}),
);