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
								items: [],
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
								items: [],
								type: "file",
							},
							{
								id: "childWithIndexSuffix",
								items: [],
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