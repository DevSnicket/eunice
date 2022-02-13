/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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