/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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