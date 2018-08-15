const
	path = require("path");

const
	getSvgForYaml = require("./getSvgForYaml"),
	readTextFile = require("../Tests/readTextFile");

const testcasesDirectory = path.join(__dirname, "getSvgForYaml.withSubset.testcases/");

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
	"subset of root item with child item returns parent with item",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "parent" ],
				yaml: "{id: parent, items: item}",
			})
		)
		.toEqual(
			readTestcaseFile("item-with-parent.svg")
		)
);

test(
	"subset of child item of root with child item returns parent with item",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "grandparent", "parent" ],
				yaml: "{id: grandparent, items: {id: parent, items: item}}",
			})
		)
		.toEqual(
			readTestcaseFile("item-with-parent.svg")
		)
);

test(
	"subset of root item and with child item without identifier returns parent with anonymous item",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "parent" ],
				yaml: "{id: parent, items: { } }",
			})
		)
		.toEqual(
			readTestcaseFile("anonymous-item-with-parent.svg")
		)
);

test(
	"subset of root item without identifier and with child item returns anonymous parent with item",
	() =>
		expect(
			getSvgForYaml({
				// the item id property wont be defined
				// eslint-disable-next-line no-undefined
				subsetIdentifierHierarchy: [ undefined ],
				yaml: "{ items: item }",
			})
		)
		.toEqual(
			readTestcaseFile("item-with-anonymous-parent.svg")
		)
);

test(
	"subset of root item with child item that depends upon grandchild item returns parent with inner dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "grandparent" ],
				yaml: "{id: grandparent, items: {id: parent, dependsUpon: nested, items: nested}}",
			})
		)
		.toEqual(
			readTestcaseFile("parent-depends-upon-inner-below-with-grandparent.svg")
		)
);

test(
	"subset of root item with child item that depends upon parent/root item returns item with outer dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "parent" ],
				yaml: "{id: parent, items: {id: item, dependsUpon: parent}}",
			})
		)
		.toEqual(
			readTestcaseFile("item-with-parent-depends-upon-outer-above.svg")
		)
);

test(
	"subset of parent item with child item that depends upon grandparent/root item returns item with outer dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "grandparent", "parent" ],
				yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: grandparent}}}",
			})
		)
		.toEqual(
			readTestcaseFile("item-with-parent-depends-upon-outer-above.svg")
		)
);

test(
	"subset of grandparent item with grandchild item that depends upon grandparent returns item with outer dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "grandparent" ],
				yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: grandparent}}}",
			})
		)
		.toEqual(
			readTestcaseFile("parent-with-grandparent-depends-upon-outer-above.svg")
		)
);

test(
	"subset of grandparent item with grandchild item that depends upon parent returns item with inner dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "grandparent" ],
				yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: parent}}}",
			})
		)
		.toEqual(
			readTestcaseFile("parent-with-grandparent-depends-upon-inner-above.svg")
		)
);

test(
	"subset of parent item with grandchild item that depends upon parent returns item with outer dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "grandparent", "parent" ],
				yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: parent}}}",
			})
		)
		.toEqual(
			readTestcaseFile("item-with-parent-depends-upon-outer-above.svg")
		)
);

test(
	"subset of root item with stack of child item that depends upon lower child item returns item with outer dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "parent" ],
				yaml: readTestcaseFile("upper-depends-upon-lower-with-parent.yaml"),
			})
		)
		.toEqual(
			readTestcaseFile("upper-item-depends-upon-lower-item-with-parent.svg")
		)
);

test(
	"subset of root item with stack of grandchild item that depends upon lower child item returns item with outer dependency",
	() =>
		expect(
			getSvgForYaml({
				subsetIdentifierHierarchy: [ "parent" ],
				yaml: readTestcaseFile("upper-item-depends-upon-lower-with-parent.yaml"),
			})
		)
		.toEqual(
			readTestcaseFile("upper-item-depends-upon-lower-item-with-parent.svg")
		)
);

function readTestcaseFile(
	filename
) {
	return readTextFile(path.join(testcasesDirectory, filename));
}