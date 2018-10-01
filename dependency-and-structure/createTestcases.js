const prettyFormat = require("pretty-format");

module.exports =
	() =>
		[
			createTestCase({
				stack:
					createStack(createLevel({ id: "item" })),
				yaml:
					"item",
			}),
			createTestCase({
				stack:
					createStack(
						createLevel({
							id: "item",
							otherProperty: "otherValue",
						}),
					),
				yaml:
					{
						id: "item",
						otherProperty: "otherValue",
					},
			}),
			createTestCase({
				stack:
					createStack(
						createLevel(
							{ id: "item1" },
							{ id: "item2" },
						),
					),
				yaml:
					[ "item1", "item2" ],
			}),
			createTestCase({
				stack:
					createStack(
						createLevel({ id: "item1" }),
						createLevel({ id: "item2" }),
					),
				yaml:
					[ [ "item1" ], [ "item2" ] ],
			}),
			createTestCase({
				stack:
					createStack(createLevel(createItem({ items: createStack(createLevel({ id: "item" })) }))),
				yaml:
					{ items: "item" },
			}),
			createTestCase({
				stack:
					createStack(
						createLevel(
							createItem({
								id: "item",
								items: createStack(createLevel({ id: "childItem" })),
							}),
						),
					),
				yaml:
					{
						id: "item",
						items: "childItem",
					},
			}),
			createTestCase({
				stack:
					createStack(
						createLevel({
							dependsUpon: [ "missing" ],
							id: "item1",
						}),
					),
				yaml:
					{
						id: "item1",
						// property order affects YAML output order and for readability id is the first property
						// eslint-disable-next-line sort-keys
						dependsUpon: "missing",
					},
			}),
			createSingleDependencyTestCase(),
			createMultipleDependencyTestCase(),
		];

function createSingleDependencyTestCase() {
	const itemWithDependsUpon =
		{ id: "item1" };

	const dependentItem =
		{
			dependents: [ itemWithDependsUpon ],
			id: "item2",
		};

	itemWithDependsUpon.dependsUpon = [ dependentItem ];

	return (
		createTestCase({
			stack:
				createStack(
					createLevel(
						itemWithDependsUpon,
						dependentItem,
					),
				),
			yaml:
				[
					{
						id: itemWithDependsUpon.id,
						// property order affects YAML output order and for readability id is the first property
						// eslint-disable-next-line sort-keys
						dependsUpon: dependentItem.id,
					},
					dependentItem.id,
				],
		})
	);
}

function createMultipleDependencyTestCase() {
	const itemWithDependsUpon =
		{ id: "item1" };

	const dependentItems =
		[
			{
				dependents: [ itemWithDependsUpon ],
				id: "item2",
			},
			{
				dependents: [ itemWithDependsUpon ],
				id: "item3",
			},
		];

	itemWithDependsUpon.dependsUpon = dependentItems;

	return (
		createTestCase({
			stack:
				createStack(
					createLevel(
						...[
							itemWithDependsUpon,
							...dependentItems,
						],
					),
				),
			yaml:
				[
					{
						id: itemWithDependsUpon.id,
						// property order affects YAML output order and for readability id is the first property
						// eslint-disable-next-line sort-keys
						dependsUpon:
							[
								dependentItems[0].id,
								dependentItems[1].id,
							],
					},
					dependentItems[0].id,
					dependentItems[1].id,
				],
		})
	);
}

function createStack(
	...levels
) {
	for (const level of levels)
		level.stack = levels;

	return levels;
}

function createLevel(
	...items
) {
	for (const item of items)
		item.level = items;

	return items;
}

function createItem({
	id = null,
	items,
}) {
	const item =
		{
			...id && { id },
			items,
		};

	items.parent = item;

	return item;
}

function createTestCase({
	stack,
	yaml,
}) {
	return (
		{
			stack,
			stackFormatted: prettyFormat(stack, { min: true }),
			yaml,
		}
	);
}