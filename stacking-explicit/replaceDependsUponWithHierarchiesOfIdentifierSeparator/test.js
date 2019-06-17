const replaceDependsUponWithHierarchiesOfIdentifierSeparator = require(".");

test.each(
	[
		[ null, null ],
		[ "item", "item" ],
		[ { }, { } ],
		[
			{ id: "item" },
			{ id: "item" },
		],
		[
			[ { id: "item" } ],
			[ { id: "item" } ],
		],
		[
			[ [ { id: "item" } ] ],
			[ [ { id: "item" } ] ],
		],
		[
			[
				{ id: "item1" },
				[ { id: "item2" } ],
			],
			[
				{ id: "item1" },
				[ { id: "item2" } ],
			],
		],
		[
			{ dependsUpon: "dependsUpon" },
			{ dependsUpon: "dependsUpon" },
		],
		[
			{ dependsUpon: {} },
			{ dependsUpon: {} },
		],
		[
			{
				dependsUpon:
					{
						id: "dependsUponParent",
						items: "dependsUponChild",
					},
			},
			{
				dependsUpon:
					{
						id: "dependsUponParent",
						items: "dependsUponChild",
					},
			},
		],
		[
			{
				dependsUpon:
					{
						id: "dependsUponParent",
						items: [ "dependsUponChild1", "dependsUponChild2" ],
					},
			},
			{
				dependsUpon:
					{
						id: "dependsUponParent",
						items: [ "dependsUponChild1", "dependsUponChild2" ],
					},
			},
		],
		[
			{
				dependsUpon:
					{
						id:
							"dependsUponParent",
						items:
							{
								id:
									"dependsUponChild",
								items:
									"dependsUponGrandchild",
							},
					},
			},
			{
				dependsUpon:
					{
						id:
							"dependsUponParent",
						items:
							{
								id:
									"dependsUponChild",
								items:
									"dependsUponGrandchild",
							},
					},
			},
		],
		[
			{ dependsUpon: "dependsUponParent/dependsUponChild" },
			{
				dependsUpon:
					{
						id: "dependsUponParent",
						items: "dependsUponChild",
					},
			},
		],
		[
			{
				dependsUpon:
					[
						"dependsUponParent1/dependsUponChild1",
						"dependsUponParent2/dependsUponChild2",
					],
			},
			{
				dependsUpon:
					[
						{
							id: "dependsUponParent1",
							items: "dependsUponChild1",
						},
						{
							id: "dependsUponParent2",
							items: "dependsUponChild2",
						},
					],
			},
		],
		[
			{
				dependsUpon:
					[
						"dependsUponParent/dependsUponChild1",
						"dependsUponParent/dependsUponChild2",
					],
			},
			{
				dependsUpon:
					[
						{
							id: "dependsUponParent",
							items: "dependsUponChild1",
						},
						{
							id: "dependsUponParent",
							items: "dependsUponChild2",
						},
					],
			},
		],
		[
			{ dependsUpon: "dependsUponParent/dependsUponChild/dependsUponGrandchild" },
			{
				dependsUpon:
					{
						id:
							"dependsUponParent",
						items:
							{
								id:
									"dependsUponChild",
								items:
									"dependsUponGrandchild",
							},
					},
			},
		],
		[
			{
				dependsUpon:
					{
						id: "dependsUponParent/dependsUponChild",
						items: "dependsUponGrandchild",
					},
			},
			{
				dependsUpon:
					{
						id:
							"dependsUponParent",
						items:
							{
								id:
									"dependsUponChild",
								items:
									"dependsUponGrandchild",
							},
					},
			},
		],
		[
			{
				dependsUpon:
					{
						id: "dependsUponParent",
						items: "dependsUponChild/dependsUponGrandchild",
					},
			},
			{
				dependsUpon:
					{
						id:
							"dependsUponParent",
						items:
							{
								id:
									"dependsUponChild",
								items:
									"dependsUponGrandchild",
							},
					},
			},
		],
		[
			{
				dependsUpon:
					{
						id:
							"dependsUponParent",
						items:
							[
								"dependsUponChild1/dependsUponGrandchild1",
								"dependsUponChild2/dependsUponGrandchild2",
							],
					},
			},
			{
				dependsUpon:
					{
						id:
							"dependsUponParent",
						items:
							[
								{
									id:
										"dependsUponChild1",
									items:
										"dependsUponGrandchild1",
								},
								{
									id:
										"dependsUponChild2",
									items:
										"dependsUponGrandchild2",
								},
							],
					},
			},
		],
		[
			{
				dependsUpon:
					{
						id: "dependsUponParent/dependsUponChild",
						items: "dependsUponGrandchild/dependsUponGreatGrandchild",
					},
			},
			{
				dependsUpon:
					{
						id:
							"dependsUponParent",
						items:
							{
								id:
									"dependsUponChild",
								items:
									{
										id:
											"dependsUponGrandchild",
										items:
											"dependsUponGreatGrandchild",
									},
							},
					},
			},
		],
		[
			{
				id: "parent",
				items:
					{
						dependsUpon: "dependsUponParent/dependsUponChild",
						id: "child",
					},
			},
			{
				id: "parent",
				items:
					{
						dependsUpon:
							{
								id: "dependsUponParent",
								items: "dependsUponChild",
							},
						id:
							"child",
					},
			},
		],
	],
)(
	"%j items returns %j",
	(items, expected) =>
		expect(
			replaceDependsUponWithHierarchiesOfIdentifierSeparator({
				identifierSeparator: "/",
				items,
			}),
		)
		.toEqual(expected),
);