// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const orderItemsByIndexOf = require(".");

const input = { toJSON: () => "input" };

test.each(
	[
		[ null, input ],
		[ "item", input ],
		[
			[ "item" ],
			input,
		],
		[
			[ [ "item" ] ],
			input,
		],
		[
			[ "item1", "item2" ],
			input,
		],
		[
			[ [ "item1", "item2" ] ],
			input,
		],
		[
			[ [ "item1" ], [ "item2" ] ],
			input,
		],
		[
			[
				{ id: "item1" },
				{ id: "item2" },
			],
			input,
		],
		[
			[
				{ id: "item1", index: 2 },
				{ id: "item2" },
			],
			[
				{ id: "item2" },
				{ id: "item1", index: 2 },
			],
		],
		[
			[
				{ id: "item1", index: 1 },
				{ id: "item2", index: 1 },
			],
			input,
		],
		[
			[
				{ id: "item1", index: 1 },
				{ id: "item2", index: 2 },
			],
			input,
		],
		[
			[
				{ id: "item2", index: 2 },
				{ id: "item1", index: 1 },
			],
			[
				{ id: "item1", index: 1 },
				{ id: "item2", index: 2 },
			],
		],
		[
			[
				[
					{ id: "item2", index: 2 },
					{ id: "item1", index: 1 },
				],
			],
			input,
		],
		[
			[
				[
					{
						items:
							[
								[ { id: "childItem1", index: 1 } ],
								[ "childItem2" ],
							],
					},
				],
			],
			[
				[
					{
						items:
						[
							[ "childItem2" ],
							[ { id: "childItem1", index: 1 } ],
						],
					},
				],
			],
		],
		[
			[
				[ { id: "item2", index: 2 } ],
				[ { id: "item1", index: 1 } ],
			],
			[
				[ { id: "item1", index: 1 } ],
				[ { id: "item2", index: 2 } ],
			],
		],
		[
			[
				[ { id: "item2", index: 2 } ],
				[ { id: "item1", index: 1 }, "item3" ],
			],
			input,
		],
		[
			{ id: "item", items: "childItem" },
			input,
		],
		[
			{
				id: "item1",
				items: [ "childItem1", "childItem2" ],
			},
			input,
		],
		[
			{
				id: "item1",
				items:
					[
						{ id: "childItem1", index: 1 },
						{ id: "childItem2", index: 2 },
					],
			},
			input,
		],
		[
			{
				id: "item1",
				items:
					[
						{ id: "childItem2", index: 2 },
						{ id: "childItem1", index: 1 },
					],
			},
			{
				id: "item1",
				items:
					[
						{ id: "childItem1", index: 1 },
						{ id: "childItem2", index: 2 },
					],
			},
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			orderItemsByIndexOf({
				getItemIndex: item => item.index,
				items,
			}),
		)
		.toEqual(
			expected === input
			?
			items
			:
			expected,
		),
);