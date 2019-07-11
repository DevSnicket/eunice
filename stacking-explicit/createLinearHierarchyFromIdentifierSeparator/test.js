/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const createLinearHierarchyFromIdentifierSeparator = require(".");

describe(
	"Identifier",
	() =>
		test.each(
			[
				[
					"Without separator returns identifier.",
					"identifier",
					"identifier",
				],
				[
					"With single separator returns new item with child identifier.",
					"parent/child",
					{
						id: "parent",
						items: "child",
					},
				],
				[
					"With two separators returns new item with grandchild identifier.",
					"grandparent/parent/child",
					{
						id:
							"grandparent",
						items:
							{
								id: "parent",
								items: "child",
							},
					},
				],
				[
					"Level without separators returns level.",
					[ "left", "right" ],
					[ "left", "right" ],
				],
				[
					"Stack without separators returns stack.",
					[ [ "upperLeft", "upperRight" ], [ "lowerLeft", "lowerRight" ] ],
					[ [ "upperLeft", "upperRight" ], [ "lowerLeft", "lowerRight" ] ],
				],
			],
		)(
			"%s",
			(description, items, expected) =>
				expect(
					createLinearHierarchyFromIdentifierSeparator({
						identifierSeparator: "/",
						items,
					}),
				)
				.toEqual(
					expected,
				),
		),
);

test(
	"Item with identifier and separator, and other properties returns new item with child item with other properties in order.",
	() =>
		expect(
			createLinearHierarchyFromIdentifierSeparator({
				identifierSeparator:
					"/",
				items:
					{
						alphabeticallyEarlier: "alphabeticallyEarlierValue",
						id: "grandparent/parent",
						otherProperty: "otherValue",
					},
			}),
		)
		.toEqual({
			id:
				"grandparent",
			items:
				{
					id: "parent",
					// needs to match expected key order in YAML.
					// eslint-disable-next-line sort-keys
					alphabeticallyEarlier: "alphabeticallyEarlierValue",
					otherProperty: "otherValue",
				},
		}),
);