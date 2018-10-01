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