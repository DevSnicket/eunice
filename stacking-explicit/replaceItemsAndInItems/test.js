// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const replaceDescendantItemsUsingAncestors = require(".");

test.each(
	[
		[
			{
				identifierOrItemOrLevelOrStack: null,
				replace: ({ identifierOrItemOrLevelOrStack }) => identifierOrItemOrLevelOrStack,
			},
			null,
		],
		[
			{
				identifierOrItemOrLevelOrStack: "item",
				replace: () => "replacement",
			},
			"replacement",
		],
		[
			{
				identifierOrItemOrLevelOrStack: { id: "item" },
				replace: ({ identifierOrItemOrLevelOrStack }) => identifierOrItemOrLevelOrStack,
			},
			{ id: "item" },
		],
		[
			{
				identifierOrItemOrLevelOrStack: { id: "parent", items: "child" },
				replace: ({ identifierOrItemOrLevelOrStack }) => identifierOrItemOrLevelOrStack,
			},
			{ id: "parent", items: "child" },
		],
	],
)(
	"%j with replacement %j returns %j",
	(argument, expected) =>
		expect(
			replaceDescendantItemsUsingAncestors(
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
			{ id: "parent", items: "child" },
			[
				{
					ancestors: [],
					identifierOrItemOrLevelOrStack: { id: "parent", items: "child" },
				},
				{
					ancestors: [ { id: "parent", items: "child" } ],
					identifierOrItemOrLevelOrStack: "child",
				},
			],
		],
	],
)(
	"%j calls replace with arguments %j",
	(identifierOrItemOrLevelOrStack, expected) => {
		const actual = [];

		replaceDescendantItemsUsingAncestors({
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