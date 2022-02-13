/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import removePackagePrefixAndScopeInDependsUpon from ".";

test(
	"Item, prefix and scope and null returns null.",
	() =>
		expect(
			removePackagePrefixAndScopeInDependsUpon({
				identifierOrItemOrLevelOrStack: null,
				prefix: null,
				scope: null,
			}),
		)
		.toEqual(
			null,
		),
);

test(
	"Prefix and scope of null returns item.",
	() => {
		const identifierOrItemOrLevelOrStack = {};

		expect(
			removePackagePrefixAndScopeInDependsUpon({
				identifierOrItemOrLevelOrStack,
				prefix: null,
				scope: null,
			}),
		)
		.toBe(
			identifierOrItemOrLevelOrStack,
		);
	},
);

test(
	"Scope of null and item with depends upon identifier with prefix returns item with depends upon identifier without prefix.",
	() => {
		const
			items = "child",
			prefix = "prefix-";

		expect(
			removePackagePrefixAndScopeInDependsUpon({
				identifierOrItemOrLevelOrStack:
					{
						dependsUpon:
							{
								id: `${prefix}item`,
								items,
							},
					},
				prefix,
				scope:
					null,
			}),
		)
		.toEqual({
			dependsUpon:
				{
					id: "item",
					items,
				},
		});
	},
);

test(
	"Item with depends upon of scope and item with depends upon not of scope, returns first item with depends upon child item and second item.",
	() => {
		const scope = "scope";

		expect(
			removePackagePrefixAndScopeInDependsUpon({
				identifierOrItemOrLevelOrStack:
					[
						{
							dependsUpon:
								{
									id: `@${scope}`,
									items: "childOfFirst",
								},
							id:
								"firstItem",
						},
						{
							dependsUpon:
								{
									id: "notScope",
									items: "childOfSecond",
								},
							id:
								"secondItem",
						},
					],
				prefix:
					null,
				scope,
			}),
		)
		.toEqual(
			[
				{
					dependsUpon: "childOfFirst",
					id: "firstItem",
				},
				{
					dependsUpon:
						{
							id: "notScope",
							items: "childOfSecond",
						},
					id:
						"secondItem",
				},
			],
		);
	},
);

test(
	"Item with depends upon of scope and item with depends upon not of scope, both with depends upon child with prefix, returns first item with depends upon child item without prefix and second item.",
	() => {
		const
			prefix = "prefix-",
			scope = "scope";

		expect(
			removePackagePrefixAndScopeInDependsUpon({
				identifierOrItemOrLevelOrStack:
					[
						{
							dependsUpon:
								{
									id: `@${scope}`,
									items: `${prefix}childOfFirst`,
								},
							id:
								"firstItem",
						},
						{
							dependsUpon:
								{
									id: "notScope",
									items: `${prefix}childOfSecond`,
								},
							id:
								"secondItem",
						},
					],
				prefix,
				scope,
			}),
		)
		.toEqual(
			[
				{
					dependsUpon: "childOfFirst",
					id: "firstItem",
				},
				{
					dependsUpon:
						{
							id: "notScope",
							items: `${prefix}childOfSecond`,
						},
					id:
						"secondItem",
				},
			],
		);
	},
);