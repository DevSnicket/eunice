/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import replaceIdentifiersAndItems from ".";

describe(
	"When replace returns null then null is returned",
	() =>
		test.each(
			[
				"identifier",
				[ "identifier" ],
				[ [ "identifier" ] ],
			],
		)(
			"When %j",
			identifierOrItemOrLevelOrStack =>
				expect(
					replaceIdentifiersAndItems({
						identifierOrItemOrLevelOrStack,
						replace: () => null,
					}),
				)
				.toBeNull(),
		),
);

describe(
	"When replace returns identifier or item then identifier or item is returned.",
	() =>
		test.each(
			[
				[
					"When identifier then replace is called with no ancestors and identifier, and identifier is returned.",
					"identifier",
					[ [ {
						ancestors: [],
						identifierOrItem: "identifier",
					} ] ],
				],
				[
					"When item then replace is called with no ancestors and item, and item is returned.",
					{ id: "item" },
					[ [ {
						ancestors: [],
						identifierOrItem: { id: "item" },
					} ] ],
				],
				[
					"When level of two items then replace is called with no ancestors and first item, then with no ancestors and second item, and level is returned.",
					[
						{ id: "item1" },
						{ id: "item2" },
					],
					[
						[ {
							ancestors: [],
							identifierOrItem: { id: "item1" },
						} ],
						[ {
							ancestors: [],
							identifierOrItem: { id: "item2" },
						} ],
					],
				],
				[
					"When stack of two items then replace is called with no ancestors and first item, then with no ancestors and second item, and stack is returned.",
					[
						[ { id: "item1" } ],
						[ { id: "item2" } ],
					],
					[
						[ {
							ancestors: [],
							identifierOrItem: { id: "item1" },
						} ],
						[ {
							ancestors: [],
							identifierOrItem: { id: "item2" },
						} ],
					],
				],
			],
		)(
			"%s",
			// @ts-ignore
			(description, identifierOrItemOrLevelOrStack, replaceCallArguments) => {
				const replace = jest.fn(({ identifierOrItem }) => identifierOrItem);

				const result =
					replaceIdentifiersAndItems({
						identifierOrItemOrLevelOrStack,
						replace,
					});

				expect({
					replaceCallArguments: replace.mock.calls,
					result,
				})
				.toEqual({
					replaceCallArguments,
					result: identifierOrItemOrLevelOrStack,
				});
			},
		),
);

test(
	"When replace returns \"identifierToKeep\" or null when \"identifierToRemove\" and stack then \"identifierToKeep\" is returned",
	() =>
		expect(
			replaceIdentifiersAndItems({
				identifierOrItemOrLevelOrStack:
					[
						[ "identifierToKeep" ],
						[ "identifierToRemove" ],
					],
				replace:
					({ identifierOrItem }) =>
						identifierOrItem !== "identifierToRemove"
						&&
						identifierOrItem,
			}),
		)
		.toEqual("identifierToKeep"),
);