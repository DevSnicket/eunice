// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const groupItemsByIdentifierSeparator = require(".");

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
			[ {} ],
			input,
		],
		[
			[ { id: "item" } ],
			input,
		],
		[
			[ "item1", "item2" ],
			input,
		],
		[
			[ "item", "itemChildItem" ],
			input,
		],
		[
			[
				{ otherIdentifier: "item1" },
				{ id: "item2" },
			],
			[
				{
					items: { id: "item2" },
					otherIdentifier: "item1",
				},
			],
		],
		[
			[ "item/childItem1", "item/childItem2" ],
			[
				{
					id: "item",
					items: [ "item/childItem1", "item/childItem2" ],
				},
			],
		],
		[
			[ "item", "item/childItem" ],
			[
				{
					id: "item",
					items: "item/childItem",
				},
			],
		],
		[
			[
				{ id: "item" },
				"item/childItem",
			],
			[
				{
					id: "item",
					items: "item/childItem",
				},
			],
		],
		[
			[
				{ id: "item", items: "childItem1" },
				"item/childItem2",
			],
			[
				{
					id: "item",
					items: [ "childItem1", "item/childItem2" ],
				},
			],
		],
		[
			[
				{ id: "item", items: [ [ "childItem1" ] ] },
				"item/childItem2",
			],
			[
				{
					id:
						"item",
					items:
						[
							[ "childItem1" ],
							[ "item/childItem2" ],
						],
				},
			],
		],
		[
			[
				{ id: "item", items: [ [ "childItem1" ] ] },
				"item/childItem2",
				"item/childItem3",
			],
			[
				{
					id:
						"item",
					items:
						[
							[ "childItem1" ],
							[ "item/childItem2", "item/childItem3" ],
						],
				},
			],
		],
		[
			[ "item1", "item1/childItem", "item2" ],
			[
				{
					id: "item1",
					items: "item1/childItem",
				},
				"item2",
			],
		],
		[
			[ "item", "item/childItem1", "item/childItem2" ],
			[
				{
					id: "item",
					items: [ "item/childItem1", "item/childItem2" ],
				},
			],
		],
		[
			[ "item", "item/childItem", "item/childItem/grandchildItem" ],
			[
				{
					id: "item",
					items: { id: "item/childItem", items: "item/childItem/grandchildItem" },
				},
			],
		],
		[
			[ "item", "item/childItem", "item/childItem/grandchildItem", "item/childItem/grandchildItem/greatgrandchildItem" ],
			[
				{
					id:
						"item",
					items:
						{
							id: "item/childItem",
							items: { id: "item/childItem/grandchildItem", items: "item/childItem/grandchildItem/greatgrandchildItem" },
						},
				},
			],
		],
		[
			[ "item", "item/childItem1", "item/childItem1/grandchildItem", "item/childItem2" ],
			[
				{
					id:
						"item",
					items:
						[
							{ id: "item/childItem1", items: "item/childItem1/grandchildItem" },
							"item/childItem2",
						],
				},
			],
		],
		[
			[ "item", "item/childItem", "item/childItem/grandchildItem1", "item/childItem/grandchildItem2", "item/childItem/grandchildItem2/greatgrandchildItem" ],
			[
				{
					id:
						"item",
					items:
						{
							id:
								"item/childItem",
							items:
								[
									"item/childItem/grandchildItem1",
									{ id: "item/childItem/grandchildItem2", items: "item/childItem/grandchildItem2/greatgrandchildItem" },
								],
						},
				},
			],
		],
		[
			[ "item", "item/childItem1", "item/childItem2", "item/childItem3" ],
			[
				{
					id: "item",
					items: [ "item/childItem1", "item/childItem2", "item/childItem3" ],
				},
			],
		],
		[
			[
				"item",
				{
					id: "item/childItem",
					items: [ "item/childItem/grandChildItem1", "item/childItem/grandChildItem2" ],
				},
			],
			[
				{
					id:
						"item",
					items:
						{
							id: "item/childItem",
							items: [ "item/childItem/grandChildItem1", "item/childItem/grandChildItem2" ],
						},
				},
			],
		],
		[
			[ { id: "item", items: "childItem1" }, "item/childItem2" ],
			[
				{
					id: "item",
					items: [ "childItem1", "item/childItem2" ],
				},
			],
		],
		[
			[ { id: "item", items: [ "childItem1", "childItem2" ] }, "item/childItem2" ],
			[
				{
					id: "item",
					items: [ "childItem1", "childItem2", "item/childItem2" ],
				},
			],
		],
		[
			[ "item", "item/childItem1", "item/childItem1/grandchildItem", "item/childItem1/grandchildItem/greatgrandchildItem", "item/childItem2" ],
			[
				{
					id:
						"item",
					items:
						[
							{
								id:
									"item/childItem1",
								items:
									{
										id: "item/childItem1/grandchildItem",
										items: "item/childItem1/grandchildItem/greatgrandchildItem",
									},
							},
							"item/childItem2",
						],
				},
			],
		],
		[
			[ "item", "item/childItem1", "item/childItem1/grandchildItem", "item/childItem1/grandchildItem/greatgrandchildItem", "item/childItem1/grandchildItem/greatgrandchildItem/greatgreatgrandchildItem", "item/childItem2" ],
			[
				{
					id:
						"item",
					items:
						[
							{
								id:
									"item/childItem1",
								items:
									{
										id:
											"item/childItem1/grandchildItem",
										items:
											{
												id: "item/childItem1/grandchildItem/greatgrandchildItem",
												items: "item/childItem1/grandchildItem/greatgrandchildItem/greatgreatgrandchildItem",
											},
									},
							},
							"item/childItem2",
						],
				},
			],
		],
		[
			[ "item/childItem1", "item/childItem1/grandchildItem", "item/childItem2" ],
			[
				{
					id:
						"item",
					items:
						[
							{
								id: "item/childItem1",
								items: "item/childItem1/grandchildItem",
							},
							"item/childItem2",
						],
				},
			],
		],
		[
			[ "item/childItem/grandchildItem1", "item/childItem/grandchildItem2" ],
			[
				{
					id: "item/childItem",
					items: [ "item/childItem/grandchildItem1", "item/childItem/grandchildItem2" ],
				},
			],
		],
		[
			[ "item/childItem1", "item/childItem1/grandchildItem1", "item/childItem1/grandchildItem2" ],
			[
				{
					id: "item/childItem1",
					items: [ "item/childItem1/grandchildItem1", "item/childItem1/grandchildItem2" ],
				},
			],
		],
		[
			[ "item/child1", "item/child2/grandchild1", "item/child2/grandchild2" ],
			[
				{
					id:
						"item",
					items:
						[
							"item/child1",
							{
								id: "item/child2",
								items: [ "item/child2/grandchild1", "item/child2/grandchild2" ],
							},
						],
				},
			],
		],
		[
			[ "item", "item/childItem", "item/childItem/grandchildItem/greatgrandchildItem1", "item/childItem/grandchildItem/greatgrandchildItem2" ],
			[
				{
					id:
						"item",
					items:
						{
							id:
								"item/childItem",
							items:
								{
									id: "item/childItem/grandchildItem",
									items: [ "item/childItem/grandchildItem/greatgrandchildItem1", "item/childItem/grandchildItem/greatgrandchildItem2" ],
								},
						},
				},
			],
		],
		[
			[ "item/childItem1", "item/childItem1/grandchildItem", "item/childItem1/grandchildItem/greatgrandchildItem", "item/childItem2" ],
			[
				{
					id:
						"item",
					items:
						[
							{
								id: "item/childItem1",
								items:
									{
										id: "item/childItem1/grandchildItem",
										items: "item/childItem1/grandchildItem/greatgrandchildItem",
									},
							},
							"item/childItem2",
						],
				},
			],
		],
		[
			[ "item/child1", "item/child2/grandchild1", "item/child2/grandchild1/greatGrandchild", "item/child2/grandchild2", "item/child2/grandchild3" ],
			[
				{
					id:
						"item",
					items:
						[
							"item/child1",
							{
								id:
									"item/child2",
								items:
									[
										{
											id: "item/child2/grandchild1",
											items: "item/child2/grandchild1/greatGrandchild",
										},
										"item/child2/grandchild2",
										"item/child2/grandchild3",
									],
							},
						],
				},
			],
		],
		[
			[
				"item/child1",
				"item/child2/grandchild1",
				"item/child2/grandchild1/greatgrandchild2",
				"item/child2/grandchild1/greatgrandchild2/greatgreatgrandchild",
				"item/child2/grandchild2",
			],
			[
				{
					id: "item",
					items:
						[
							"item/child1",
							{
								id: "item/child2",
								items:
									[
										{
											id: "item/child2/grandchild1",
											items:
												{
													id: "item/child2/grandchild1/greatgrandchild2",
													items: "item/child2/grandchild1/greatgrandchild2/greatgreatgrandchild",
												},
										},
										"item/child2/grandchild2",
									],
							},
						],
				},
			],
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			groupItems(items),
		)
		.toEqual(
			expected === input
			?
			items
			:
			expected,
		),
);

test(
	"two item identifiers out of order throws error",
	() =>
		expect(() => groupItems([ "item2", "item1" ]))
		.toThrowError(),
);

function groupItems(
	items,
) {
	return (
		groupItemsByIdentifierSeparator({
			identifierSeparator: "/",
			items,
		})
	);
}