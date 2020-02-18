// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

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