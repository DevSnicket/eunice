/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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