// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const setIdentifierOfAnonymousToParent = require(".");

test.each(
	[
		[
			{
				id: "parent",
				items: {},
			},
			{
				id: "parent",
				items: {},
			},
		],
		[
			{
				id: "parent",
				items: { type: "export" },
			},
			{
				id:
					"parent",
				items:
					{
						id: "parent",
						type: "export",
					},
			},
		],
		[
			{
				aParentProperty:
					"aParentValue",
				id:
					"parent",
				items:
					{
						aChildProperty: "aChildValue",
						type: "export",
					},
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
						type: "export",
					},
			},
		],
		[
			{
				id:
					"grandparent",
				items:
					{
						items: { type: "export" },
						type: "export",
					},
			},
			{
				id:
					"grandparent",
				items:
					{
						id:
							"grandparent",
						items:
							{
								id: "grandparent",
								type: "export",
							},
						type:
							"export",
					},
			},
		],
		[
			{
				id:
					"grandparent",
				items:
					{
						id: "parent",
						items: { type: "export" },
					},
			},
			{
				id:
					"grandparent",
				items:
					{
						id:
							"parent",
						items:
							{
								id: "parent",
								type: "export",
							},
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