// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import hasParentInAncestors from ".";

describe(
	"Key of \"id\" and pattern of \"addToParent\"",
	() =>
		test.each(
			[
				[ [], false ],
				[ [ { } ], false ],
				[
					[ { id: "parent" } ],
					false,
				],
				[
					[ { id: "addToParent" }, { id: "ancestor" } ],
					false,
				],
				[
					[ { id: "addToParent" } ],
					true,
				],
				[
					[ { id: "ancestor" }, { id: "addToParent" } ],
					true,
				],
			],
		)(
			"Ancestors of %j returns %j",
			(ancestors, expected) =>
				expect(
					hasParentInAncestors({
						ancestors,
						keysAndPatterns:
							[ {
								key: "id",
								pattern: "addToParent",
							} ],
					}),
				)
				.toBe(
					expected,
				),
		),
);

describe(
	"Keys of \"id\" and \"type\", and patterns of \"addToParent\" and \"file\".",
	() =>
		test.each(
			[
				[
					[ { id: "addToParent" } ],
					false,
				],
				[
					[ { type: "file" } ],
					false,
				],
				[
					[ {
						id: "addToParent",
						type: "file",
					} ],
					true,
				],
			],
		)(
			"Ancestors of %j returns %j",
			(ancestors, expected) =>
				expect(
					hasParentInAncestors({
						ancestors,
						keysAndPatterns:
							[
								{
									key: "id",
									pattern: "addToParent",
								},
								{
									key: "type",
									pattern: "file",
								},
							],
					}),
				)
				.toBe(
					expected,
				),
		),
);