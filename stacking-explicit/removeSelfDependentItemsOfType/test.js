/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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