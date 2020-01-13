// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	path = require("path"),
	processItems = require("..");

test(
	"All processors except flatten single root item when has only items and type.",
	() =>
		expect(
			processItems({
				dependencyPermeableIdentifiers:
					null,
				directoryToCreateOrAddToStacksFrom:
					path.join(__dirname, "stacks"),
				identifierSeparator:
					"\\",
				isFileContentReversed:
					false,
				isInferStacksEnabled:
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
						"item\\childWithIndexSuffix\\index",
						"item\\alphabeticallyEarlierItem",
						"item\\bin",
						{
							id:
								"item\\notModifyStackMatch",
							items:
								{
									id: "notInRootToNotGetTypeSetToFile",
									items: [ "aardvark", "bin" ],
								},
						},
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
							id:
								"item\\stacksFromFileSystem",
							items:
								[
									{ dependsUpon: "item2", id: "item1" },
									"item2",
								],
						},
					],
				modifyStacksFile:
					{
						filePath: path.join(__dirname, "modify-file-stacks.yaml"),
						key: "type",
						pattern: "^file$",
					},
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
								id: "alphabeticallyEarlierItem",
								type: "file",
							},
							{
								id: "childWithIndexSuffix",
								type: "file",
							},
							{
								id:
									"notModifyStackMatch",
								items:
									{
										id: "notInRootToNotGetTypeSetToFile",
										items: [ "aardvark", "bin" ],
									},
								type:
									"file",
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
								id:
									"stacksFromFileSystem",
								items:
									[
										[ { dependsUpon: "item2", id: "item1" } ],
										[ "item2" ],
									],
								type:
									"file",
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
				dependencyPermeableIdentifiers:
					null,
				directoryToCreateOrAddToStacksFrom:
					"stacks",
				identifierSeparator:
					"\\",
				isFileContentReversed:
					false,
				isInferStacksEnabled:
					false,
				items:
					{ items: "child" },
				modifyStacksFile:
					null,
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
				dependencyPermeableIdentifiers:
					null,
				directoryToCreateOrAddToStacksFrom:
					"no-stacks",
				identifierSeparator:
					"\\",
				isFileContentReversed:
					true,
				isInferStacksEnabled:
					false,
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
				modifyStacksFile:
					null,
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

test(
	"isInferStacksEnabled true splits first depends upon second into two levels",
	() =>
		expect(
			processItems({
				dependencyPermeableIdentifiers:
					null,
				directoryToCreateOrAddToStacksFrom:
					"no-stacks",
				identifierSeparator:
					"\\",
				isFileContentReversed:
					false,
				isInferStacksEnabled:
					true,
				items:
					[
						{
							dependsUpon: "second",
							id: "first",
						},
						"second",
					],
				modifyStacksFile:
					null,
				packagePrefixAndScope:
					null,
				rootItemIdentifier:
					null,
			}),
		)
		.toEqual(
			[
				[ {
					dependsUpon: "second",
					id: "first",
					type: "file",
				} ],
				[ {
					id: "second",
					type: "file",
				} ],
			],
		),
);


test(
	"Modify stacks without key and pattern.",
	() =>
		expect(
			processItems({
				dependencyPermeableIdentifiers:
					null,
				directoryToCreateOrAddToStacksFrom:
					"no-stacks",
				identifierSeparator:
					"\\",
				isFileContentReversed:
					false,
				isInferStacksEnabled:
					false,
				items:
					[ "aardvark", "bin" ],
				modifyStacksFile:
					{ filePath: path.join(__dirname, "modify-file-stacks.yaml") },
				packagePrefixAndScope:
					null,
				rootItemIdentifier:
					null,
			}),
		)
		.toEqual(
			[
				{ id: "bin", type: "file" },
				{ id: "aardvark", type: "file" },
			],
		),
);