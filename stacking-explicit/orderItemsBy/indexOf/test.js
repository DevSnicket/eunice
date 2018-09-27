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
				items: [ "childitem1", "childitem2" ],
			},
			input,
		],
		[
			{
				id: "item1",
				items:
					[
						{ id: "childitem1", index: 1 },
						{ id: "childitem2", index: 2 },
					],
			},
			input,
		],
		[
			{
				id: "item1",
				items:
					[
						{ id: "childitem2", index: 2 },
						{ id: "childitem1", index: 1 },
					],
			},
			{
				id: "item1",
				items:
					[
						{ id: "childitem1", index: 1 },
						{ id: "childitem2", index: 2 },
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