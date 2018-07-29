const
	path = require("path");

const
	getSvgForYaml = require("./getSvgForYaml"),
	readTextFile = require("../Tests/readTextFile");

const testcasesDirectory = path.join(__dirname, "getSvgForYaml.testcases/");

test(
	"subset of missing item throws subset identifier not found error",
	() =>
		expect(
			() =>
				getSvgForYaml({
					subsetIdentifierHierarchy: [ "missing" ],
					yaml: "not missing",
				})
		)
		.toThrowError("Identifier of \"missing\" in subset hierarchy not found.")
);

test(
	"subset of missing item throws subset identifier not found error",
	() =>
		expect(
			() =>
				getSvgForYaml({
					subsetIdentifierHierarchy: [ "parent" ],
					yaml: "parent",
				})
		)
		.toThrowError("Final item of subset identifier hierarchy \"parent\" has no child items.")
);

test(
	"subset of root item with single child item returns single item",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "parent" ],
				yaml: "{id: parent, items: single}",
			})
		)
		.toEqual(readTextFile(path.join(testcasesDirectory, "single", ".svg")))
);

test(
	"subset of child item of root with single child item returns single item",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "grandparent", "parent" ],
				yaml: "{id: grandparent, items: {id: parent, items: single}}",
			})
		)
		.toEqual(readTextFile(path.join(testcasesDirectory, "single", ".svg")))
);

test(
	"subset of root item with single child that depends upon grandchild item returns parent with one inner dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "grandparent" ],
				yaml: "{id: grandparent, items: {id: parent, dependsUpon: nested, items: nested}}",
			})
		)
		.toEqual(readTextFile(path.join(testcasesDirectory, "parent-depends-upon-item", ".svg")))
);