const orderItemsByType = require("./orderItemsByType");

assertOrderItemsByTypeEqualsSource({
	name: "null returns null",
	source: null,
});

assertOrderItemsByTypeEqualsSource({
	name: "item identifier returns item identifier",
	source: "item",
});

assertOrderItemsByTypeEqualsSource({
	name: "single item identifier returns single item identifier",
	source: [ "item" ],
});

assertOrderItemsByTypeEqualsSource({
	name: "single item identifier in a stack returns single item identifier in a stack",
	source: [ [ "item" ] ],
});

assertOrderItemsByTypeEqualsSource({
	name: "two item identifiers returns them in same order",
	source: [ "item1", "item2" ],
});

assertOrderItemsByTypeEqualsSource({
	name: "two item identifiers in a stack returns them in same order in a stack",
	source: [ [ "item1", "item2" ] ],
});

assertOrderItemsByTypeEqualsSource({
	name: "two item identifiers in different stack levels returns them in same order in different stack levels",
	source: [ [ "item1" ], [ "item2" ] ],
});

assertOrderItemsByTypeEqualsSource({
	name: "two items without types returns them in same order",
	source:
		[
			{ id: "item1" },
			{ id: "item2" },
		],
});

assertOrderItemsByType({
	expected:
		[
			{ id: "item2" },
			{ id: "item1", type: "type2" },
		],
	name: "one item with type and one item without type returns them in type order",
	source:
		[
			{ id: "item1", type: "type2" },
			{ id: "item2" },
		],
});

assertOrderItemsByTypeEqualsSource({
	name: "two items with same type returns them in same order",
	source:
		[
			{ id: "item1", type: "type1" },
			{ id: "item2", type: "type1" },
		],
});

assertOrderItemsByTypeEqualsSource({
	name: "two items with types in order returns them in same order",
	source:
		[
			{ id: "item1", type: "type1" },
			{ id: "item2", type: "type2" },
		],
});

assertOrderItemsByType({
	expected:
		[
			{ id: "item1", type: "type1" },
			{ id: "item2", type: "type2" },
		],
	name: "two items with types out of order returns them in type order",
	source:
		[
			{ id: "item2", type: "type2" },
			{ id: "item1", type: "type1" },
		],
});

assertOrderItemsByTypeEqualsSource({
	name: "two items with types out of order in same stack level returns input",
	source:
		[
			[
				{ id: "item2", type: "type2" },
				{ id: "item1", type: "type1" },
			],
		],
});


assertOrderItemsByType({
	expected:
		[
			[
				{
					items:
					[
						[ "childItem2" ],
						[ { id: "childItem1", type: "type1" } ],
					],
				},
			],
		],
	name: "single item in a stack with two child items with types out of order in different stack levels return the child items in type order",
	source:
		[
			[
				{
					items:
						[
							[ { id: "childItem1", type: "type1" } ],
							[ "childItem2" ],
						],
				},
			],
		],
});

assertOrderItemsByType({
	expected:
		[
			[ { id: "item1", type: "type1" } ],
			[ { id: "item2", type: "type2" } ],
		],
	name: "two items with types out of order in different stack levels in returns the stack levels in type order",
	source:
		[
			[ { id: "item2", type: "type2" } ],
			[ { id: "item1", type: "type1" } ],
		],
});

assertOrderItemsByTypeEqualsSource({
	name: "two items with types out of order in different stack levels and third item identifier in second level, returns input",
	source:
		[
			[ { id: "item2", type: "type2" } ],
			[ { id: "item1", type: "type1" }, "item3" ],
		],
});

assertOrderItemsByTypeEqualsSource({
	name: "item with child item identifier returns item",
	source: { id: "item", items: "childItem" },
});

assertOrderItemsByTypeEqualsSource({
	name: "two child item identifiers without types in order returns them in same order",
	source:
		{
			id: "item1",
			items: [ "childitem1", "childitem2" ],
		},
});

assertOrderItemsByTypeEqualsSource({
	name: "two child items with types in order returns them in same order",
	source:
		{
			id: "item1",
			items:
				[
					{ id: "childitem1", type: "type1" },
					{ id: "childitem2", type: "type2" },
				],
		},
});

assertOrderItemsByType({
	expected:
		{
			id: "item1",
			items:
				[
					{ id: "childitem1", type: "type1" },
					{ id: "childitem2", type: "type2" },
				],
		},
	name: "two child items with types out of order returns them in type orderr",
	source:
		{
			id: "item1",
			items:
				[
					{ id: "childitem2", type: "type2" },
					{ id: "childitem1", type: "type1" },
				],
		},
});

function assertOrderItemsByTypeEqualsSource({
	name,
	source,
}) {
	assertOrderItemsByType({
		expected: source,
		name,
		source,
	});
}

function assertOrderItemsByType({
	expected,
	name,
	source,
}) {
	test(
		name,
		() =>
			expect(
				orderItemsByType({
					items: source,
					// type array index of will only work when exact match
					// eslint-disable-next-line no-undefined
					typesInOrder: [ undefined, "type1", "type2" ],
				})
			)
			.toEqual(expected)
	);
}