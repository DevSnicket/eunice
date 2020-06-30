// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import replaceIdentifiersAndItemsAndLevelsAndStacks from ".";

test.each(
	[
		[
			{
				identifierOrItemOrLevelOrStack:
					null,
				replace:
					({ identifierOrItemOrLevelOrStack }) => identifierOrItemOrLevelOrStack,
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					"item",
				replace:
					() => "replacement",
			},
			"replacement",
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					{ id: "item" },
				replace:
					({ identifierOrItemOrLevelOrStack }) => identifierOrItemOrLevelOrStack,
			},
			{ id: "item" },
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					{ id: "parent", items: "child" },
				replace:
					({ identifierOrItemOrLevelOrStack }) => identifierOrItemOrLevelOrStack,
			},
			{ id: "parent", items: "child" },
		],
		[
			{
				identifierOrItemOrLevelOrStack:
					{ id: "parent", items: "child" },
				replace:
					({ identifierOrItemOrLevelOrStack }) =>
						identifierOrItemOrLevelOrStack !== "child"
						&&
						identifierOrItemOrLevelOrStack,
			},
			{ id: "parent" },
		],
	],
)(
	"%j with replacement %j returns %j",
	// @ts-ignore
	(argument, expected) =>
		expect(
			replaceIdentifiersAndItemsAndLevelsAndStacks(
				// @ts-ignore
				argument,
			),
		)
		.toEqual(
			expected,
		),
);

test.each(
	[
		[
			null,
			[
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: null,
				},
			],
		],
		[
			"item",
			[
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: "item",
				},
			],
		],
		[
			[ "first", "second" ],
			[
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: [ "first", "second" ],
				},
			],
		],
		[
			[ [ "first", "second" ] ],
			[
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: [ [ "first", "second" ] ],
				},
			],
		],
		[
			[ [ "first" ], [ "second" ] ],
			[
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: [ [ "first" ], [ "second" ] ],
				},
			],
		],
		[
			[ [ "first" ], "second" ],
			[
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: [ [ "first" ], "second" ],
				},
			],
		],
		[
			[ "first", [ "second" ] ],
			[
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: [ "first", [ "second" ] ],
				},
			],
		],
		[
			{ id: "parent", items: "child" },
			[
				{
					ancestors: [ { id: "parent", items: "child" } ],
					identifierOrItemOrLevelOrStack: "child",
				},
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: { id: "parent", items: "child" },
				},
			],
		],
	],
)(
	"%j calls replace with arguments %j",
	// @ts-ignore
	(identifierOrItemOrLevelOrStack, expected) => {
		const actual = [];

		replaceIdentifiersAndItemsAndLevelsAndStacks({
			identifierOrItemOrLevelOrStack,
			replace:
				argument => {
					actual.push(argument);

					return argument.identifierOrItemOrLevelOrStack;
				},
		});

		expect(actual)
		.toEqual(expected);
	},
);