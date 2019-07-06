/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const hasParentInAncestors = require(".");

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