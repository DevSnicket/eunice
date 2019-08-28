// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	path = require("path"),
	processItems = require("..");

test(
	"All processors except flatten single root item when has only items and type.",
	() =>
		expect(
			processItems({
				directoryToCreateOrAddToStacksFrom:
					path.join(__dirname, "stacks"),
				identifierSeparator:
					"\\",
				isFileContentReversed:
					false,
				items:
					[
						{
							dependsUpon:
								{
									id: "@scope",
									items: "prefix-dependsUponItems",
								},
							id:
								"item",
						},
						{
							id: "item\\test",
							items: "childOfTest",
						},
						"item\\childWithIndexSuffix\\index",
						"item\\alphabeticallyEarlierItem",
						"item\\bin",
						{
							id: "item\\orderedByType",
							items:
								[
									[ { id: "item1", type: "file" } ],
									{ id: "item2", type: "import" },
									[ { id: "item3", type: "variable" } ],
									[ "item4" ],
									{ id: "item5", type: "export" },
								],
						},
						{
							id: "item\\stacksFromFileSystem",
							items: [ "item1", "item2" ],
						},
					],
				packagePrefixAndScope:
					{
						prefix: "prefix-",
						scope: "scope",
					},
				rootItemIdentifier:
					"root",
			}),
		)
		.toEqual({
			id:
				"root",
			items:
				{
					dependsUpon:
						"dependsUponItems",
					id:
						"item",
					items:
						[
							{
								id: "bin",
								type: "file",
							},
							{
								id:
									"test",
								items:
									[
										[ "childOfTest" ],
										[ "expect", "test" ],
									],
								type:
									"file",
							},
							{
								id: "alphabeticallyEarlierItem",
								type: "file",
							},
							{
								id: "childWithIndexSuffix",
								type: "file",
							},
							{
								id: "orderedByType",
								items:
									[
										{ id: "item5", type: "export" },
										"item4",
										{ id: "item3", type: "variable" },
										{ id: "item2", type: "import" },
										{ id: "item1", type: "file" },
									],
								type: "file",
							},
							{
								id: "stacksFromFileSystem",
								items: [ [ "item1" ], [ "item2" ] ],
								type: "file",
							},
						],
					type:
						"file",
				},
		}),
);

test(
	"Flatten single root item when has only items and type.",
	() =>
		expect(
			processItems({
				directoryToCreateOrAddToStacksFrom:
					"stacks",
				identifierSeparator:
					"\\",
				isFileContentReversed:
					false,
				items:
					{ items: "child" },
				packagePrefixAndScope:
					null,
				rootItemIdentifier:
					null,
			}),
		)
		.toEqual(
			"child",
		),
);

test(
	"isFileContentReversed true reverses descendant items.",
	() =>
		expect(
			processItems({
				directoryToCreateOrAddToStacksFrom:
					"no-stacks",
				identifierSeparator:
					"\\",
				isFileContentReversed:
					true,
				items:
					[
						{
							id:
								"item1",
							items:
								[
									[
										{
											id:
												"child1OfItem1",
											items:
												[
													[ "grandchild1OfItem1" ],
													[ "grandchild2OfItem1" ],
												],
										},
									],
									[ "child2OfItem1" ],
								],
						},
						"item2",
						{ id: "item3", items: "childOfItem3" },
					],
				packagePrefixAndScope:
					null,
				rootItemIdentifier:
					null,
			}),
		)
		.toEqual(
			[
				{
					id:
						"item1",
					items:
						[
							"child2OfItem1",
							{
								id:
									"child1OfItem1",
								items:
									[ "grandchild2OfItem1", "grandchild1OfItem1" ],
							},
						],
					type:
						"file",
				},
				{
					id: "item2",
					type: "file",
				},
				{
					id: "item3",
					items: "childOfItem3",
					type: "file",
				},
			],
		),
);