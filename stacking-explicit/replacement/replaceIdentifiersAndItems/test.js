// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const replaceIdentifiersAndItems = require(".");

test(
	"When identifier and replace returns null, null is returned.",
	() =>
		expect(
			replaceIdentifiersAndItems({
				identifierOrItemOrLevelOrStack: "identifier",
				replace: () => null,
			}),
		)
		.toBeNull(),
);

describe(
	"Replace returns identifier or item.",
	() =>
		test.each(
			[
				[
					"When identifier, replace is called with no ancestors and identifier, and identifier is returned.",
					"identifier",
					[ [ {
						ancestors: [],
						identifierOrItem: "identifier",
					} ] ],
				],
				[
					"When item, replace is called with no ancestors and item, and item is returned.",
					{ id: "item" },
					[ [ {
						ancestors: [],
						identifierOrItem: { id: "item" },
					} ] ],
				],
				[
					"When level of two items, replace is called with no ancestors and first item, then with no ancestors and second item, and level is returned.",
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
					"When stack of two items, replace is called with no ancestors and first item, then with no ancestors and second item, and stack is returned.",
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