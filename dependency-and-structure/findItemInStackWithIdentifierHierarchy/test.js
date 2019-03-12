const
	createStackFromYaml = require("../createStackFromYaml"),
	findItemWithIdentifierHierarchy = require(".");

test(
	"missing item throws error",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy:
						[ "missing" ],
					stack:
						createStackFromYaml("not missing"),
				}),
		)
		.toThrowError("Identifier of \"missing\" not found."),
);

test(
	"missing child item throws error",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy:
						[ "parent", "missing" ],
					stack:
						createStackFromYaml(
							[ [
								{
									id: "parent",
									items: "not missing",
								},
							] ],
						),
				}),
		)
		.toThrowError("Identifier of \"missing\" not found in hierarchy \"parent\"."),
);

test(
	"missing grand child item throws error",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy:
						[ "grandchild", "parent", "missing" ],
					stack:
						createStackFromYaml(
							[ [
								{
									id:
										"grandchild",
									items:
										[ [
											{
												id: "parent",
												items: "not missing",
											},
										] ],
								},
							] ],
						),
				}),
		)
		.toThrowError("Identifier of \"missing\" not found in hierarchy \"grandchild\"->\"parent\"."),
);

test(
	"no child items throws error",
	() =>
		expect(
			() =>
				findItemWithIdentifierHierarchy({
					identifierHierarchy:
						[ "parent", "child" ],
					stack:
						createStackFromYaml(
							[ [ { id: "parent" } ] ],
						),
				}),
		)
		.toThrowError("Item with identifier \"parent\" found has no child items."),
);