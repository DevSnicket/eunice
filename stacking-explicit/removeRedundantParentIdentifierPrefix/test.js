// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const removeRedundantParentIdentifierPrefix = require(".");

test.each(
	[
		[ "item", "item" ],
		[
			[ "item" ],
			"item",
		],
		[
			[ [ "item" ] ],
			"item",
		],
		[
			{ id: "item" },
			"item",
		],
		[
			{ id: "parent", items: "child" },
			{ id: "parent", items: "child" },
		],
		[
			{ id: "parent", items: "parent/child" },
			{ id: "parent", items: "child" },
		],
		[
			{
				id: "grandparent",
				items: { id: "grandparent/parent", items: "grandparent/parent/child" },
			},
			{
				id: "grandparent",
				items: { id: "parent", items: "child" },
			},
		],
		[
			{ dependsUpon: "missing" },
			{ dependsUpon: "missing" },
		],
		[
			{ dependsUpon: { id: "missing", items: "missing" } },
			{ dependsUpon: { id: "missing", items: "missing" } },
		],
		[
			{ dependsUpon: "parent/child", id: "parent", items: "parent/child" },
			{ dependsUpon: "child", id: "parent", items: "child" },
		],
		[
			{
				id: "grandparent",
				items: { id: "grandparent/parent", items: { dependsUpon: "grandparent/parent" } },
			},
			{
				id: "grandparent",
				items: { id: "parent", items: { dependsUpon: "parent" } },
			},
		],
		[
			{
				id:
					"grandparent",
				items:
					{
						id: "grandparent/parent",
						items: { dependsUpon: { id: "grandparent/parent", items: "missing" } },
					},
			},
			{
				id:
					"grandparent",
				items:
					{
						id: "parent",
						items: { dependsUpon: { id: "parent", items: "missing" } },
					},
			},
		],
		[
			{
				id:
					"grandparent",
				items:
					{
						id: "grandparent/parent",
						items:
							{
								dependsUpon:
									{
										id: "grandparent/parent",
										items: { id: "missing", items: "childOfMissing" },
									},
							},
					},
			},
			{
				id:
					"grandparent",
				items:
					{
						id: "parent",
						items:
							{
								dependsUpon:
									{
										id: "parent",
										items: { id: "missing", items: "childOfMissing" },
									},
							},
					},
			},
		],
		[
			[
				{ dependsUpon: "parent/child" },
				{ id: "parent", items: "parent/child" },
			],
			[
				{ dependsUpon: "child" },
				{ id: "parent", items: "child" },
			],
		],
		[
			[
				{ id: "parent", items: "parent/child" },
				{ dependsUpon: "parent/child" },
			],
			[
				{ id: "parent", items: "child" },
				{ dependsUpon: "child" },
			],
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			removeRedundantParentIdentifierPrefix({
				identifierSeparator: "/",
				items,
			}),
		)
		.toEqual(expected),
);