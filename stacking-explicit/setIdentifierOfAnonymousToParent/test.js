const setIdentifierOfAnonymousToParent = require(".");

test.each(
	[
		[ null, null ],
		[ "item", "item" ],
		[ {}, {} ],
		[
			{ aProperty: "aValue" },
			{ aProperty: "aValue" },
		],
		[
			{ id: "item" },
			{ id: "item" },
		],
		[
			[ "item1", "item2" ],
			[ "item1", "item2" ],
		],
		[
			[ { id: "item1" }, { id: "item2" } ],
			[ { id: "item1" }, { id: "item2" } ],
		],
		[
			[
				[ "upper1", "upper2" ],
				[ "lower1", "lower2" ],
			],
			[
				[ "upper1", "upper2" ],
				[ "lower1", "lower2" ],
			],
		],
		[
			{
				id: "parent",
				items: "child",
			},
			{
				id: "parent",
				items: "child",
			},
		],
		[
			{
				id: "parent",
				items: {},
			},
			{
				id: "parent",
				items: { id: "parent" },
			},
		],
		[
			{
				aParentProperty: "aParentValue",
				id: "parent",
				items: { aChildProperty: "aChildValue" },
			},
			{
				aParentProperty:
					"aParentValue",
				id:
					"parent",
				items:
					{
						aChildProperty: "aChildValue",
						id: "parent",
					},
			},
		],
		[
			{
				id: "grandparent",
				items: { items: { } },
			},
			{
				id:
					"grandparent",
				items:
					{
						id: "grandparent",
						items: { id: "grandparent" },
					},
			},
		],
	],
)(
	"%j returns %j",
	(
		items,
		expected,
	) =>
		expect(
			setIdentifierOfAnonymousToParent(
				items,
			),
		)
		.toEqual(expected),
);