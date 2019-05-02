const
	{ createElement } = require("react"),
	{ createStackFromYaml } = require("@devsnicket/eunice-dependency-and-structure"),
	createWithDependencyList = require("."),
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path"),
	readTestFile = require("../../test/readTestFile");

const
	dependsUponIdentifier = "depends upon",
	element = "element";

test(
	"subset of item that depends upon item in same level returns element and dependency list in Reflex resize",
	() => {
		const itemIdentifier = "item";

		testDependsUponInSameLevel({
			identifier:
				itemIdentifier,
			items:
				[
					{
						dependsUpon: dependsUponIdentifier,
						id: itemIdentifier,
					},
					{ id: dependsUponIdentifier },
				],
			subsetIdentifierHierarchy:
				null,
		});
	},
);

test(
	"subset of child item that depends upon item in same level returns element and dependency list in Reflex resize",
	() => {
		const
			childIdentifier = "item",
			parentIdentifier = "parent";

		testDependsUponInSameLevel({
			identifier:
				childIdentifier,
			items:
				[
					{
						id:
							parentIdentifier,
						items:
							[
								{
									dependsUpon: dependsUponIdentifier,
									id: childIdentifier,
								},
							],
					},
					{ id: dependsUponIdentifier },
				],
			subsetIdentifierHierarchy:
				[ parentIdentifier ],
		});
	},
);

function testDependsUponInSameLevel({
	identifier,
	items,
	subsetIdentifierHierarchy,
}) {
	expect(
		renderToStaticMarkup(
			createWithDependencyList({
				createAncestorSeparatorElement:
					null,
				createElement,
				createItemAnchor,
				element,
				identifier,
				level:
					"same",
				relationship:
					"dependsUpon",
				resizableElementTypes:
					{
						/* cSpell:disable */
						container: "resizablecontainer",
						element: "resizableelement",
						splitter: "resizablesplitter",
						/* cSpell:enable */
					},
				stack:
					createStackFromYaml(
						items,
					),
				subsetIdentifierHierarchy,
			}),
		),
	)
	.toBe(
		readTestFile(
			path.join(__dirname, "testCase.html"),
		)
		.replace(/\n|\t/g, ""),
	);
}

function createItemAnchor({
	identifier,
	identifierHierarchy,
}) {
	return (
		createElement(
			"a",
			{ href: identifierHierarchy },
			identifier,
		)
	);
}