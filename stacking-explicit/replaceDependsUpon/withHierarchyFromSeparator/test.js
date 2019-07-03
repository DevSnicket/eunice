/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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