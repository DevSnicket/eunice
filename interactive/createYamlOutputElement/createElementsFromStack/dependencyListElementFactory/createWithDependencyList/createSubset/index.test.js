/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createSubsetOfItem from ".";

test(
	"Relationship of \"unexpected relationship\" throws error",
	() =>
		expect(
			() =>
				createSubsetOfItem({
					isDependencyRelevant: null,
					item: null,
					relationship: "unexpected relationship",
				}),
		)
		.toThrowError(
			"Unexpected relationship of \"unexpected relationship\".",
		),
);

describe(
	"Relationship of dependent",
	() =>
		testRelationship({
			createPropertyForDependencyItem:
				item => ({
					dependents:
						[ { item } ],
				}),
			otherRelationship:
				"dependsUpon",
			relationship:
				"dependents",
		}),
);

describe(
	"Relationship of depends upon",
	() =>
		testRelationship({
			createPropertyForDependencyItem:
				itemOrFirstAncestorItem => ({
					dependsUpon:
						[ { itemOrFirstAncestorItem } ],
				}),
			otherRelationship:
				"dependents",
			relationship:
				"dependsUpon",
		}),
);

function testRelationship({
	createPropertyForDependencyItem,
	relationship,
	otherRelationship,
}) {
	test(
		"Dependency is filtered by predicate",
		() => {
			const
				dependencyItem = { level: { stack: {} } },
				dependencyItemsFiltered = [];

			const result =
				createSubsetOfItem({
					isDependencyRelevant,
					item: createPropertyForDependencyItem(dependencyItem),
					relationship,
				});

			expect(
				{
					dependencyItemsFiltered,
					result,
				},
			)
			.toEqual(
				{
					dependencyItemsFiltered: [ dependencyItem ],
					result: null,
				},
			);

			function isDependencyRelevant(
				{ item },
			) {
				dependencyItemsFiltered.push(item);

				return false;
			}
		},
	);

	test(
		"Dependency of other relationship is not returned",
		() =>
			expect(
				createSubsetOfItem({
					isDependencyRelevant: () => true,
					item: createPropertyForDependencyItem({ level: {} }),
					relationship: otherRelationship,
				}),
			)
			.toBeNull(),
	);

	test(
		"Dependency of relationship is returned",
		() => {
			const dependency = { level: {} };

			const item =
				{
					...createPropertyForDependencyItem(dependency),
					level: {},
				};

			expect(
				createSubsetOfItem({
					isDependencyRelevant: () => true,
					item,
					relationship,
				}),
			)
			.toEqual(
				{
					dependencies: [ dependency ],
					item,
				},
			);
		},
	);

	test(
		"Dependency of relationship in child item is returned",
		() => {
			const dependency = { level: {} };

			const childItem =
				{
					...createPropertyForDependencyItem(dependency),
					level: {},
				};

			const item =
				{
					items: [ [ childItem ] ],
					level: {},
				};

			expect(
				createSubsetOfItem({
					isDependencyRelevant: () => true,
					item,
					relationship,
				}),
			)
			.toEqual(
				{
					item,
					items:
						[
							{
								dependencies: [ dependency ],
								item: childItem,
							},
						],
				},
			);
		},
	);
}