/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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