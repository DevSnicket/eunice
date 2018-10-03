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
			{ id: "grandparent", items: { id: "grandparent/parent", items: "grandparent/parent/child" } },
			{ id: "grandparent", items: { id: "parent", items: "child" } },
		],
		[
			{ dependsUpon: "missing" },
			{ dependsUpon: "missing" },
		],
		[
			{ dependsUpon: "parent/child", id: "parent", items: "parent/child" },
			{ dependsUpon: "child", id: "parent", items: "child" },
		],
		[
			{ id: "grandparent", items: { id: "grandparent/parent", items: { dependsUpon: "grandparent/parent" } } },
			{ id: "grandparent", items: { id: "parent", items: { dependsUpon: "parent" } } },
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
		[
			{
				id: "parent",
				items:
					[
						{ dependsUpon: "parent/child", id: "child" },
						{ id: "parent/child", otherProperty: "otherValue" },
					],
			},
			{
				id: "parent",
				items: { id: "child", otherProperty: "otherValue" },
			},
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

test.each(
	[
		[
			{
				id: "parent",
				items:
					[
						{ id: "child" },
						{ id: "parent/child" },
					],
			},
			"Item with duplicate identifier does not depend upon any items.",
		],
		[
			{
				id: "parent",
				items:
					[
						{ dependsUpon: [ "dependsUpon1", "dependsUpon2" ], id: "child" },
						{ id: "parent/child" },
					],
			},
			"Item with duplicate identifier does not depend upon a single item.",
		],
		[
			{
				id: "parent",
				items:
					[
						{ dependsUpon: "dependsUpon1", id: "child" },
						{ id: "parent/child" },
					],
			},
			"Item with duplicate identifier does not depend upon an item with same identifier.",
		],
		[
			{
				id: "parent",
				items:
					[
						{ dependsUpon: "parent/child", id: "child", otherProperty: "otherValue" },
						{ id: "parent/child" },
					],
			},
			"Item with duplicate identifier has relevant properties (otherProperty).",
		],
	],
)(
	"%j items throws error %j",
	(items, expected) =>
		expect(
			() =>
				removeRedundantParentIdentifierPrefix({
					identifierSeparator: "/",
					items,
				}),
		)
		.toThrowError(expected),
);