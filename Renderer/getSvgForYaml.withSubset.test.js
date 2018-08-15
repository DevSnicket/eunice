const
	path = require("path"),
	{ writeFileSync } = require("fs");

const
	getSvgForYaml = require("./getSvgForYaml"),
	readTextFile = require("../Tests/readTextFile");

const isUpdateExpected = process.argv[2] === "update-expected";

if (!isUpdateExpected) {
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
}

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent",
	subsetIdentifierHierarchy: [ "parent" ],
	testcase: "subset of root item with child item returns parent with item",
	yaml: "{id: parent, items: item}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent",
	subsetIdentifierHierarchy: [ "grandparent", "parent" ],
	testcase: "subset of child item of root with child item returns parent with item",
	yaml: "{id: grandparent, items: {id: parent, items: item}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "anonymous-item-with-parent",
	subsetIdentifierHierarchy: [ "parent" ],
	testcase: "subset of root item and with child item without identifier returns parent with anonymous item",
	yaml: "{id: parent, items: { } }",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-anonymous-parent",
	// the item id property wont be defined
	// eslint-disable-next-line no-undefined
	subsetIdentifierHierarchy: [ undefined ],
	testcase: "subset of root item without identifier and with child item returns anonymous parent with item",
	yaml: "{ items: item }",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "parent-depends-upon-inner-below-with-grandparent",
	subsetIdentifierHierarchy: [ "grandparent" ],
	testcase: "subset of root item with child item that depends upon grandchild item returns parent with inner dependency",
	yaml: "{id: grandparent, items: {id: parent, dependsUpon: nested, items: nested}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-depends-upon-outer-above",
	subsetIdentifierHierarchy: [ "parent" ],
	testcase: "subset of root item with child item that depends upon parent/root item returns item with outer dependency",
	yaml: "{id: parent, items: {id: item, dependsUpon: parent}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-depends-upon-outer-above",
	subsetIdentifierHierarchy: [ "grandparent", "parent" ],
	testcase: "subset of parent item with child item that depends upon grandparent/root item returns item with outer dependency",
	yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: grandparent}}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "parent-with-grandparent-depends-upon-outer-above",
	subsetIdentifierHierarchy: [ "grandparent" ],
	testcase: "subset of grandparent item with grandchild item that depends upon grandparent returns item with outer dependency",
	yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: grandparent}}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "parent-with-grandparent-depends-upon-inner-above",
	subsetIdentifierHierarchy: [ "grandparent" ],
	testcase: "subset of grandparent item with grandchild item that depends upon parent returns item with inner dependency",
	yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: parent}}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-depends-upon-outer-above",
	subsetIdentifierHierarchy: [ "grandparent", "parent" ],
	testcase: "subset of parent item with grandchild item that depends upon parent returns item with outer dependency",
	yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: parent}}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "upper-item-depends-upon-lower-item-with-parent",
	subsetIdentifierHierarchy: [ "parent" ],
	testcase: "subset of root item with stack of child item that depends upon lower child item returns item with outer dependency",
	yaml: readTestcaseFile("upper-depends-upon-lower-with-parent.yaml"),
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "upper-item-depends-upon-lower-item-with-parent",
	subsetIdentifierHierarchy: [ "parent" ],
	testcase: "subset of root item with stack of grandchild item that depends upon lower child item returns item with outer dependency",
	yaml: readTestcaseFile("upper-item-depends-upon-lower-with-parent.yaml"),
});

function getSvgForYamlTestOrUpdateExpected({
	expectedFilename,
	subsetIdentifierHierarchy,
	testcase,
	yaml,
}) {
	const expectedFilenameWithExtension = `${expectedFilename}.svg`;

	if (isUpdateExpected)
		writeFileSync(
			getPathOfFilename(
				expectedFilenameWithExtension
			),
			getSvgForYaml({
				subsetIdentifierHierarchy,
				yaml,
			}),
			"utf-8"
		);
	else
		test(
			testcase,
			() =>
				expect(
					getSvgForYaml({
						subsetIdentifierHierarchy,
						yaml,
					})
				)
				.toEqual(
					readTestcaseFile(expectedFilenameWithExtension)
				)
		);
}

function readTestcaseFile(
	filename
) {
	return readTextFile(getPathOfFilename(filename));
}

function getPathOfFilename(
	filename
) {
	return path.join(__dirname, "getSvgForYaml.withSubset.testcases/", filename);
}