const
	path = require("path"),
	{ writeFileSync } = require("fs");

const
	getSvgForYaml = require("."),
	readTextFile = require("../../Tests/readTextFile");

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
					}),
			)
			.toThrowError("Identifier of \"missing\" in subset hierarchy not found."),
	);

	test(
		"subset of missing item throws subset identifier not found error",
		() =>
			expect(
				() =>
					getSvgForYaml({
						subsetIdentifierHierarchy: [ "parent" ],
						yaml: "parent",
					}),
			)
			.toThrowError("Final item of subset identifier hierarchy \"parent\" has no child items."),
	);
}

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent",
	scenario: "subset of root item with child item",
	subsetIdentifierHierarchy: [ "parent" ],
	yaml: "{id: parent, items: item}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent",
	scenario: "subset of child item of root with child item",
	subsetIdentifierHierarchy: [ "grandparent", "parent" ],
	yaml: "{id: grandparent, items: {id: parent, items: item}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "anonymous-item-with-parent",
	scenario: "subset of root item and with child item without identifier",
	subsetIdentifierHierarchy: [ "parent" ],
	yaml: "{id: parent, items: { } }",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-anonymous-parent",
	scenario: "subset of root item without identifier and with child item",
	// the item id property wont be defined
	// eslint-disable-next-line no-undefined
	subsetIdentifierHierarchy: [ undefined ],
	yaml: "{ items: item }",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "parent-depends-upon-inner-below-with-grandparent",
	scenario: "subset of root item with child item that depends upon grandchild item",
	subsetIdentifierHierarchy: [ "grandparent" ],
	yaml: "{id: grandparent, items: {id: parent, dependsUpon: nested, items: nested}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-depends-upon-outer-above",
	scenario: "subset of root item with child item that depends upon parent/root item",
	subsetIdentifierHierarchy: [ "parent" ],
	yaml: "{id: parent, items: {id: item, dependsUpon: parent}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-depends-upon-outer-above",
	scenario: "subset of parent item with child item that depends upon grandparent/root item",
	subsetIdentifierHierarchy: [ "grandparent", "parent" ],
	yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: grandparent}}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "parent-with-grandparent-depends-upon-outer-above",
	scenario: "subset of grandparent item with grandchild item that depends upon grandparent",
	subsetIdentifierHierarchy: [ "grandparent" ],
	yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: grandparent}}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "parent-with-grandparent-depends-upon-inner-above",
	scenario: "subset of grandparent item with grandchild item that depends upon parent",
	subsetIdentifierHierarchy: [ "grandparent" ],
	yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: parent}}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-depends-upon-outer-above",
	scenario: "subset of parent item with grandchild item that depends upon parent",
	subsetIdentifierHierarchy: [ "grandparent", "parent" ],
	yaml: "{id: grandparent, items: {id: parent, items: {id: item, dependsUpon: parent}}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-that-depends-upon-above",
	scenario: "subset of parent item that depends upon grandparent item with child item",
	subsetIdentifierHierarchy: [ "grandparent", "parent" ],
	yaml: "{id: grandparent, items: {id: parent, dependsUpon: grandparent, items: item}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-that-is-dependent-of-above",
	scenario: "subset of parent item that is dependent of grandparent item with child item",
	subsetIdentifierHierarchy: [ "grandparent", "parent" ],
	yaml: "{id: grandparent, dependsUpon: parent, items: {id: parent, items: item}}",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-that-depends-upon-same",
	scenario: "subset of parent item that depends upon item independent of grandparent with child item",
	subsetIdentifierHierarchy: [ "grandparentSecond", "parent" ],
	yaml: "[grandparentFirst, {id: grandparentSecond, items: {id: parent, dependsUpon: grandparentFirst, items: item}}]",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-that-is-dependent-of-same",
	scenario: "subset of parent item with child item that is dependent of item independent of grandparent",
	subsetIdentifierHierarchy: [ "grandparentSecond", "parent" ],
	yaml: "[{id: grandparentFirst, dependsUpon: parent}, {id: grandparentSecond, items: {id: parent, items: item}}]",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-that-depends-upon-below",
	scenario: "subset of parent item that depends upon item in stack below grandparent with child item",
	subsetIdentifierHierarchy: [ "grandparentUpper", "parent" ],
	yaml: "[ [{id: grandparentUpper, items: {id: parent, dependsUpon: grandparentLower, items: item}}], [grandparentLower] ]",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "item-with-parent-that-depends-upon-above",
	scenario: "subset of parent item that depends upon item in stack above grandparent with child item",
	subsetIdentifierHierarchy: [ "grandparentLower", "parent" ],
	yaml: "[ [grandparentUpper], [{id: grandparentLower, items: {id: parent, dependsUpon: grandparentUpper, items: item}}] ]",
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "upper-item-depends-upon-lower-item-with-parent",
	scenario: "subset of root item with stack of child item that depends upon lower child item",
	subsetIdentifierHierarchy: [ "parent" ],
	yaml: readTestcaseFile("upper-depends-upon-lower-with-parent.yaml"),
});

getSvgForYamlTestOrUpdateExpected({
	expectedFilename: "upper-item-depends-upon-lower-item-with-parent",
	scenario: "subset of root item with stack of grandchild item that depends upon lower child item",
	subsetIdentifierHierarchy: [ "parent" ],
	yaml: readTestcaseFile("upper-item-depends-upon-lower-with-parent.yaml"),
});

function getSvgForYamlTestOrUpdateExpected({
	expectedFilename,
	scenario,
	subsetIdentifierHierarchy,
	yaml,
}) {
	const expectedFilenameWithExtension = `${expectedFilename}.svg`;

	if (isUpdateExpected)
		writeFileSync(
			getPathOfFilename(
				expectedFilenameWithExtension,
			),
			getSvgForYaml({
				subsetIdentifierHierarchy,
				yaml,
			}),
			"utf-8",
		);
	else
		test(
			`${scenario} returns ${expectedFilename.replace(/-/g, " ")}`,
			() =>
				expect(
					getSvgForYaml({
						subsetIdentifierHierarchy,
						yaml,
					}),
				)
				.toEqual(
					readTestcaseFile(expectedFilenameWithExtension),
				),
		);
}

function readTestcaseFile(
	filename,
) {
	return readTextFile(getPathOfFilename(filename));
}

function getPathOfFilename(
	filename,
) {
	return path.join(__dirname, "withSubset.testcases/", filename);
}