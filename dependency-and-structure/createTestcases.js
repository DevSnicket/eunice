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
					createItemYaml({
						dependsUpon: "missing",
						id: "item1",
					}),
			}),
			createParentDependsUponChildTestCase(),
			createChildDependsUponParentTestCase(),
			createFirstDependsUponSecondTestCase(),
			createSecondDependsUponFirstTestCase(),
			createFirstDependsUponSecondAndThirdTestCase(),
			createUpperDependsUponLowerTestCase(),
			createLowerDependsUponUpperTestCase(),
			createSelfDependentTestCase(),
			createSelfDependentInParentOfSameIdentifierTestCase(),
			createSelfDependentWithChildOfSameIdentifierTestCase(),
		];

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

function createParentDependsUponChildTestCase() {
	const child = { id: "child" };

	const parent =
		createItem({
			id: "parent",
			items: createStack(createLevel(child)),
		});

	parent.dependsUpon = [ child ];
	child.dependents = [ parent ];

	return (
		{
			stack:
				createStack(createLevel(parent)),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createParentDependsUponChildTestCase,
				),
			yaml:
				createItemYaml({
					dependsUpon:
						child.id,
					id:
						parent.id,
					items:
						child.id,
				}),
		}
	);
}

function createChildDependsUponParentTestCase() {
	const child = { id: "child" };

	const parent =
		createItem({
			id: "parent",
			items: createStack(createLevel(child)),
		});

	child.dependsUpon = [ parent ];
	parent.dependents = [ child ];

	return (
		{
			stack:
				createStack(createLevel(parent)),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createChildDependsUponParentTestCase,
				),
			yaml:
				{
					id:
						parent.id,
					items:
						createItemYaml({
							dependsUpon: parent.id,
							id: child.id,
						}),
				},
		}
	);
}

function createFirstDependsUponSecondTestCase() {
	const first = { id: "first" };

	const second =
		{
			dependents: [ first ],
			id: "second",
		};

	first.dependsUpon = [ second ];

	return (
		{
			stack:
				createStack(
					createLevel(
						first,
						second,
					),
				),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createFirstDependsUponSecondTestCase,
				),
			yaml:
				[
					createItemYaml({
						dependsUpon: second.id,
						id: first.id,
					}),
					second.id,
				],
		}
	);
}

function createSecondDependsUponFirstTestCase() {
	const first = { id: "first" };

	const second =
		{
			dependsUpon: [ first ],
			id: "second",
		};

	first.dependents = [ second ];

	return (
		{
			stack:
				createStack(
					createLevel(
						first,
						second,
					),
				),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createSecondDependsUponFirstTestCase,
				),
			yaml:
				[
					first.id,
					createItemYaml({
						dependsUpon: first.id,
						id: second.id,
					}),
				],
		}
	);
}

function createFirstDependsUponSecondAndThirdTestCase() {
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
		{
			stack:
				createStack(
					createLevel(
						...[
							itemWithDependsUpon,
							...dependentItems,
						],
					),
				),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createFirstDependsUponSecondAndThirdTestCase,
				),
			yaml:
				[
					createItemYaml({
						dependsUpon:
							[
								dependentItems[0].id,
								dependentItems[1].id,
							],
						id:
							itemWithDependsUpon.id,
					}),
					dependentItems[0].id,
					dependentItems[1].id,
				],
		}
	);
}

function createUpperDependsUponLowerTestCase() {
	const upper = { id: "upper" };

	const lower =
		{
			dependents: [ upper ],
			id: "lower",
		};

	upper.dependsUpon = [ lower ];

	return (
		{
			stack:
				createStack(
					createLevel(upper),
					createLevel(lower),
				),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createUpperDependsUponLowerTestCase,
				),
			yaml:
				[
					[
						createItemYaml({
							dependsUpon: lower.id,
							id: upper.id,
						}),
					],
					[ lower.id ],
				],
		}
	);
}

function createLowerDependsUponUpperTestCase() {
	const lower = { id: "lower" };

	const upper =
		{
			dependents: [ lower ],
			id: "upper",
		};

	lower.dependsUpon = [ upper ];

	return (
		{
			stack:
				createStack(
					createLevel(upper),
					createLevel(lower),
				),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createLowerDependsUponUpperTestCase,
				),
			yaml:
				[
					[ upper.id ],
					[
						createItemYaml({
							dependsUpon: upper.id,
							id: lower.id,
						}),
					],
				],
		}
	);
}

function createSelfDependentTestCase(
) {
	const item = { id: "single" };

	item.dependents = [ item ];
	item.dependsUpon = [ item ];

	return (
		{
			stack:
				createStack(createLevel(item)),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createSelfDependentTestCase,
				),
			yaml:
				createItemYaml({
					dependsUpon: item.id,
					id: item.id,
				}),
		}
	);
}

function createSelfDependentInParentOfSameIdentifierTestCase() {
	const id = "single";

	const child =
		{
			id,
			otherIdentifier: "child",
		};

	child.dependents = [ child ];
	child.dependsUpon = [ child ];

	const parent =
		createItem({
			id,
			items: createStack(createLevel(child)),
			otherIdentifier: "parent",
		});

	return (
		{
			stack:
				createStack(createLevel(parent)),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createSelfDependentInParentOfSameIdentifierTestCase,
				),
			yaml:
				createItemYaml({
					id,
					items:
						createItemYaml({
							dependsUpon: id,
							id,
							otherIdentifier: child.otherIdentifier,
						}),
					otherIdentifier:
						parent.otherIdentifier,
				}),
		}
	);
}

function createSelfDependentWithChildOfSameIdentifierTestCase() {
	const id = "single";

	const child =
		{
			id,
			otherIdentifier: "child",
		};

	const parent =
		createItem({
			id,
			items: createStack(createLevel(child)),
			otherIdentifier: "parent",
		});

	parent.dependents = [ parent ];
	parent.dependsUpon = [ parent ];

	return (
		{
			stack:
				createStack(createLevel(parent)),
			stackFormatted:
				getStackFormattedFromCreateTestCaseFunction(
					createSelfDependentWithChildOfSameIdentifierTestCase,
				),
			yaml:
				createItemYaml({
					dependsUpon:
						id,
					id,
					items:
						createItemYaml({
							id,
							otherIdentifier: child.otherIdentifier,
						}),
					otherIdentifier:
						parent.otherIdentifier,
				}),
		}
	);
}

function getStackFormattedFromCreateTestCaseFunction(
	createTestCaseFunction,
) {
	return (
		createTestCaseFunction.name.substring(
			"create".length,
			createTestCaseFunction.name.length - "TestCase".length,
		)
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
	...restOfItem
}) {
	const item =
		{
			...id && { id },
			...restOfItem,
			items,
		};

	items.parent = item;

	return item;
}

function createItemYaml({
	id,
	items = null,
	...restOfYamlItem
}) {
	return (
		{
			id,
			...restOfYamlItem,
			...items && { items },
		}
	);
}