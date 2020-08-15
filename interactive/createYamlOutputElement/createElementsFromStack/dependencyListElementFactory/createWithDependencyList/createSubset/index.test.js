// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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