// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const removeSelfDependentItemsOfType = require(".");

test.each(
	[
		[ null, null ],
		[ "aItem", "aItem" ],
		[ { }, { } ],
		[
			{ id: "aItem" },
			{ id: "aItem" },
		],
		[
			{ items: "aItem" },
			{ items: "aItem" },
		],
		[
			{ type: "aType" },
			{ type: "aType" },
		],
		[
			{
				dependsUpon: "aType",
				id: "aItem",
			},
			{
				dependsUpon: "aType",
				id: "aItem",
			},
		],
		[
			{
				dependsUpon: "aItem",
				id: "aItem",
				type: "aType",
			},
			null,
		],
		[
			{
				dependsUpon: [ "aItem" ],
				id: "aItem",
				type: "aType",
			},
			null,
		],
		[
			[
				{
					dependsUpon: "aItem",
					id: "aItem",
					type: "aType",
				},
			],
			null,
		],
		[
			[
				{
					dependsUpon: "item1",
					id: "item1",
					type: "aType",
				},
				"item2",
			],
			[ "item2" ],
		],
		[
			[
				[
					{
						dependsUpon: "aItem",
						id: "aItem",
						type: "aType",
					},
				],
			],
			null,
		],
		[
			[
				[
					{
						dependsUpon: "item1",
						id: "item1",
						type: "aType",
					},
					"item2",
				],
			],
			[ [ "item2" ] ],
		],
		[
			[
				[
					{
						dependsUpon: "item1",
						id: "item1",
						type: "aType",
					},
					"item2",
				],
				"item3",
			],
			[ [ "item2" ], "item3" ],
		],
		[
			{
				id:
					"item1",
				items:
					{
						dependsUpon: "item1",
						id: "item1",
						type: "aType",
					},
			},
			{ id: "item1" },
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			removeSelfDependentItemsOfType({
				items,
				type: "aType",
			}),
		)
		.toEqual(expected),
);

test(
	"Self dependent of type with other properties throw error",
	() =>
		expect(
			() =>
				removeSelfDependentItemsOfType({
					items:
						{
							dependsUpon: "aItem",
							id: "aItem",
							otherProperty: "otherValue",
							type: "aType",
						},
					type:
						"aType",
				}),
		)
		.toThrowError(
			"Self dependent item (aItem) is of type and has additional properties (otherProperty) that would be lost if removed.",
		),
);