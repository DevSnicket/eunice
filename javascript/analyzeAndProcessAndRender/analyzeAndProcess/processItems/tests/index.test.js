// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import path from "path";
import processItems from "..";

test(
	"Processing returns expected YAML",
	() =>
		expect(
			processItems({
				dependencyPermeableIdentifiers:
					null,
				directoryToCreateOrAddToStacksFrom:
					path.join(__dirname, "stacks"),
				identifierOrItemOrLevelOrStack:
					{
						dependsUpon:
							{
								id: "@scope",
								items: "prefix-dependsUponItems",
							},
						id:
							"root",
						items:
							[
								{
									id:
										"inferStacks",
									items:
										[
											{
												dependsUpon: "second",
												id: "first",
											},
											"second",
										],
								},
								"bin",
								{
									id:
										"notModifyStackMatch",
									items:
										{
											id: "notInRootToNotGetTypeSetToFile",
											items: [ "aardvark", "bin" ],
										},
								},
								{
									id:
										"stacksFromFileSystem",
									items:
										[
											{ dependsUpon: "item2", id: "item1" },
											"item2",
										],
								},
							],
						type:
							"file",
					},
				isInferStacksEnabled:
					true,
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
			dependsUpon:
				"dependsUponItems",
			id:
				"root",
			items:
				[
					"bin",
					{
						id:
							"inferStacks",
						items:
							[
								[ {
									dependsUpon: "second",
									id: "first",
								} ],
								[ "second" ],
							],
					},
					{
						id:
							"notModifyStackMatch",
						items:
							{
								id: "notInRootToNotGetTypeSetToFile",
								items: [ "aardvark", "bin" ],
							},
					},
					{
						id:
							"stacksFromFileSystem",
						items:
							[
								[ { dependsUpon: "item2", id: "item1" } ],
								[ "item2" ],
							],
					},
				],
			type:
				"file",
		}),
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
				identifierOrItemOrLevelOrStack:
					[ "aardvark", "bin" ],
				isInferStacksEnabled:
					false,
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
				"bin",
				"aardvark",
			],
		),
);