const findItemWithIdentifierHierarchy = require(".");

test(
	"empty identifier hierarchy returns null",
	() =>
		expect(
			findItemWithIdentifierHierarchy({
				identifierHierarchy: [],
				stack: null,
			}),
		)
		.toBeNull(),
);

test(
	"item missing from empty stack throws error",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy: [ "missing" ],
					stack: [],
				}),
		)
		.toThrowError("Identifier of \"missing\" not found."),
);

test(
	"item missing from empty level throws error",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy:
						[ "missing" ],
					stack:
						createStackWithLevel([]),
				}),
		)
		.toThrowError("Identifier of \"missing\" not found."),
);

test(
	"missing child item throws error with parent identifer",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy:
						[ "parent", "missing" ],
					stack:
						createStackWithLevel(
							[
								createParent({
									id: "parent",
									items: [],
									stack: {},
								}),
							],
						),
				}),
		)
		.toThrowError("Identifier of \"missing\" not found in hierarchy \"parent\"."),
);

test(
	"missing grandchild item throws error with grandparent and parent identifers",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy:
						[ "grandparent", "parent", "missing" ],
					stack:
						createStackWithLevel(
							[
								createParent({
									id:
										"grandparent",
									items:
										[ [
											createParent({
												id:
													"parent",
												items:
													[],
												stack:
													createStackParentProperty({
														id: "grandparent",
														stack: {},
													}),
											}),
										] ],
									stack:
										{},
								}),
							],
						),
				}),
		)
		.toThrowError("Identifier of \"missing\" not found in hierarchy \"grandparent\"->\"parent\"."),
);

function createParent({
	id,
	items,
	stack,
}) {
	return (
		{
			id,
			items:
				{
					...createStackParentProperty({
						id,
						stack,
					}),
					reduce:
						items.reduce.bind(items),
				},
		}
	);
}

function createStackParentProperty({
	id,
	stack,
}) {
	return (
		{
			parent:
				{
					id,
					level: { stack },
				},
		}
	);
}

test(
	"no child items throws error",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy:
						[ "parent", "child" ],
					stack:
						createStackWithLevel(
							[
								{
									id: "parent",
									level: { stack: {} },
								},
							],
						),
				}),
		)
		.toThrowError("Item with identifier \"parent\" found has no child items."),
);

function createStackWithLevel(
	level,
) {
	return (
		[
			{
				find: level.find.bind(level),
				stack: null,
			},
		]
	);
}