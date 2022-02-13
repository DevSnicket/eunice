/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import replaceItemsOfDependsUponWithIdentifier from ".";

describe(
	"Does not call replaceDependsUponItems",
	() => {
		test(
			"DependsUpon and identifier of null returns null.",
			() =>
				expect(
					replaceItemsOfDependsUponWithIdentifier({
						dependsUpon: null,
						identifier: null,
						replaceDependsUponItems: null,
					}),
				)
				.toBeNull(),
		);

		test(
			"DependsUpon of item without identifier and identifier of null returns item.",
			() => {
				const dependsUpon = {};

				expect(
					replaceItemsOfDependsUponWithIdentifier({
						dependsUpon,
						identifier: null,
						replaceDependsUponItems: null,
					}),
				)
				.toBe(
					dependsUpon,
				);
			},
		);

		test(
			"DependsUpon of item with other identifier returns item.",
			() => {
				const dependsUpon =
					{
						id: "notIdentifier",
						items: "child",
					};

				expect(
					replaceItemsOfDependsUponWithIdentifier({
						dependsUpon,
						identifier: "identifier",
						replaceDependsUponItems: null,
					}),
				)
				.toBe(
					dependsUpon,
				);
			},
		);
	},
);

test(
	"DependsUpon of item with identifier calls replace with child items.",
	() => {
		const child = {};

		let dependsUponItemsToReplace = null;

		replaceItemsOfDependsUponWithIdentifier({
			dependsUpon:
				{
					id: "identifier",
					items: child,
				},
			identifier:
				"identifier",
			replaceDependsUponItems:
				dependsUponItems => dependsUponItemsToReplace = dependsUponItems,
		});

		expect(dependsUponItemsToReplace)
		.toBe(child);
	},
);

test(
	"DependsUpon of item with identifier returns replacement.",
	() => {
		const replacement = {};

		expect(
			replaceItemsOfDependsUponWithIdentifier({
				dependsUpon:
					{ id: "identifier" },
				identifier:
					"identifier",
				replaceDependsUponItems:
					() => replacement,
			}),
		)
		.toBe(
			replacement,
		);
	},
);

test(
	"DependsUpon of item with other identifier and item with identifier returns first item and replacement.",
	() =>
		expect(
			replaceItemsOfDependsUponWithIdentifier({
				dependsUpon:
					[
						{
							id: "notIdentifier",
							items: "prefix-child",
						},
						{
							id: "identifier",
							items: "child",
						},
					],
				identifier:
					"identifier",
				replaceDependsUponItems:
					() => "replacement",
			}),
		)
		.toEqual(
			[
				{
					id: "notIdentifier",
					items: "prefix-child",
				},
				"replacement",
			],
		),
);