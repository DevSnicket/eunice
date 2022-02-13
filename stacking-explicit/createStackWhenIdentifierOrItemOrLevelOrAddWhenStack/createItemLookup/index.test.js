/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createItemLookup from ".";

const
	anonymousItem = { property: "value" },
	item = { id: "item" },
	otherItem = { id: "otherItem" };

describe(
	"useItem",
	() =>
		test.each(
			[
				[
					{
						identifierOrItemOrLevelOrStack: null,
						targetIdentifierOrItem: null,
					},
					null,
				],
				[
					{
						identifierOrItemOrLevelOrStack: "item",
						targetIdentifierOrItem: "newItem",
					},
					null,
				],
				[
					{
						identifierOrItemOrLevelOrStack: "item",
						targetIdentifierOrItem: "item",
					},
					"item",
				],
				[
					{
						identifierOrItemOrLevelOrStack: item,
						targetIdentifierOrItem: "item",
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: item,
						targetIdentifierOrItem: item,
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: anonymousItem,
						targetIdentifierOrItem: null,
					},
					anonymousItem,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ "item", "otherItem" ],
						targetIdentifierOrItem: "item",
					},
					"item",
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ "item" ],
						targetIdentifierOrItem: "newItem",
					},
					null,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ item, otherItem ],
						targetIdentifierOrItem: "item",
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ item, otherItem ],
						targetIdentifierOrItem: item,
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ otherItem, item ],
						targetIdentifierOrItem: "item",
					},
					item,
				],
				[
					{
						identifierOrItemOrLevelOrStack: [ [ item ], [ otherItem ] ],
						targetIdentifierOrItem: "item",
					},
					item,
				],
			],
		)(
			"%j returns %j",
			// @ts-ignore
			(
				// @ts-ignore
				{ identifierOrItemOrLevelOrStack, targetIdentifierOrItem },
				existing,
			) =>
				expect(
					createItemLookup(identifierOrItemOrLevelOrStack)
					.useItem(targetIdentifierOrItem),
				)
				.toBe(existing),
		),
);

describe(
	"getIdentifiersNotUsed",
	() =>
		test.each(
			[
				[
					null,
					null,
				],
				[
					"notInTarget",
					[ "notInTarget" ],
				],
				[
					{ id: "notInTarget" },
					[ "notInTarget" ],
				],
				[
					[ "notInTarget" ],
					[ "notInTarget" ],
				],
				[
					[ { id: "notInTarget" } ],
					[ "notInTarget" ],
				],
				[
					[ "leftNotInTarget", "rightNotInTarget" ],
					[ "leftNotInTarget", "rightNotInTarget" ],
				],
				[
					[ [ "upperNotInTarget" ], [ "lowerNotInTarget" ] ],
					[ "upperNotInTarget", "lowerNotInTarget" ],
				],
			],
		)(
			"%j returns %j",
			// @ts-ignore
			(
				identifierOrItemOrLevelOrStack,
				identifiersNotUsed,
			) =>
				expect(
					createItemLookup(identifierOrItemOrLevelOrStack)
					.getIdentifiersNotUsed(),
				)
				.toEqual(
					identifiersNotUsed,
				),
		),
);

test.each(
	[
		"inTarget",
		{ id: "inTarget" },
		[ "inTarget" ],
		[ [ "inTarget" ] ],
	],
)(
	"%j, after useItem \"inTarget\", getIdentifiersNotUsed returns null.",
	identifierOrItemOrLevelOrStack => {
		const itemLookup = createItemLookup(identifierOrItemOrLevelOrStack);

		itemLookup.useItem("inTarget");

		expect(
			itemLookup.getIdentifiersNotUsed(),
		)
		.toEqual(
			null,
		);
	},
);