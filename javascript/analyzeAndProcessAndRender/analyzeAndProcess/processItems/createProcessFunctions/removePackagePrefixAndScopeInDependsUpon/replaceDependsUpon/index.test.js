// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// Undefined needed to test items without a dependsUpon property
/* eslint-disable no-undefined */

import replaceDependsUpon from ".";

test(
	"Identifier without replace callback returns identifier.",
	() => {
		const identifierOrItemOrLevelOrStack = "identifier";

		expect(
			replaceDependsUpon({
				identifierOrItemOrLevelOrStack,
				replace: null,
			}),
		)
		.toBe(
			identifierOrItemOrLevelOrStack,
		);
	},
);

test.each(
	[
		[
			{},
			null,
			undefined,
			{},
		],
		[
			{
				id: "identifier",
				otherProperty: "otherValue",
			},
			null,
			undefined,
			{
				id: "identifier",
				otherProperty: "otherValue",
			},
		],
		[
			{ dependsUpon: "original" },
			null,
			"original",
			{},
		],
		[
			{},
			"replacement",
			undefined,
			{ dependsUpon: "replacement" },
		],
		[
			{ dependsUpon: "original" },
			"replacement",
			"original",
			{ dependsUpon: "replacement" },
		],
		[
			[ { dependsUpon: "original" } ],
			"replacement",
			"original",
			[ { dependsUpon: "replacement" } ],
		],
		[
			[ [ { dependsUpon: "original" } ] ],
			"replacement",
			"original",
			[ [ { dependsUpon: "replacement" } ] ],
		],
	],
)(
	"%j and replacement of %o calls replace with argument %o and returns %j",
	// @ts-ignore
	(identifierOrItemOrLevelOrStack, replacement, replaceCallArgument, expected) => {
		const replace = jest.fn(() => replacement);

		const result =
			replaceDependsUpon({
				identifierOrItemOrLevelOrStack,
				replace,
			});

		expect({
			replaceCallArguments: replace.mock.calls,
			result,
		})
		.toEqual({
			replaceCallArguments: [ [ replaceCallArgument ] ],
			result: expected,
		});
	},
);

test(
	"Replaced in child item",
	() => {
		const replace = jest.fn(() => "replacement");

		const result =
			replaceDependsUpon({
				identifierOrItemOrLevelOrStack:
					{ items: { } },
				replace,
			});

		expect({
			replaceCallArguments: replace.mock.calls,
			result,
		})
		.toEqual({
			replaceCallArguments:
				[ [ undefined ], [ undefined ] ],
			result:
				{
					dependsUpon: "replacement",
					items: { dependsUpon: "replacement" },
				},
		});
	},
);