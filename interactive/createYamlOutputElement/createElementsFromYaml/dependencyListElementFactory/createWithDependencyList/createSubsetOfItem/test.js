// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createSubsetOfItem = require(".");

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
			createPropertyForDependency:
				dependency => ({ dependents: [ dependency ] }),
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
			createPropertyForDependency:
				dependency => (
					{
						dependsUpon:
							[ { itemOrFirstAncestorItem: dependency } ],
					}
				),
			otherRelationship:
				"dependents",
			relationship:
				"dependsUpon",
		}),
);

function testRelationship({
	createPropertyForDependency,
	relationship,
	otherRelationship,
}) {
	test(
		"Dependency is filtered by predicate",
		() => {
			const
				dependenciesFiltered = [],
				dependency = { level: { stack: {} } };

			const result =
				createSubsetOfItem({
					isDependencyRelevant,
					item: createPropertyForDependency(dependency),
					relationship,
				});

			expect(
				{
					dependenciesFiltered,
					result,
				},
			)
			.toEqual(
				{
					dependenciesFiltered: [ dependency ],
					result: null,
				},
			);

			function isDependencyRelevant(
				item,
			) {
				dependenciesFiltered.push(item);

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
					item: createPropertyForDependency({ level: {} }),
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
					...createPropertyForDependency(dependency),
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
					...createPropertyForDependency(dependency),
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