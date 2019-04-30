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
	() =>
		testDependsUponInSameLevel({
			createItemsWrapper:
				items => items,
			identifier:
				"item",
			subsetIdentifierHierarchy:
				null,
		}),
);

test(
	"subset of child item that depends upon item in same level returns element and dependency list in Reflex resize",
	() => {
		const
			childIdentifier = "item",
			parentIdentifier = "parent";

		testDependsUponInSameLevel({
			createItemsWrapper:
				items =>
					[
						{
							id:
								parentIdentifier,
							items,
						},
					],
			identifier:
				childIdentifier,
			subsetIdentifierHierarchy:
				[ parentIdentifier ],
		});
	},
);

function testDependsUponInSameLevel({
	createItemsWrapper,
	identifier,
	subsetIdentifierHierarchy,
}) {
	expect(
		renderToStaticMarkup(
			createWithDependencyList({
				createElement,
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
						createItemsWrapper(
							[
								{
									dependsUpon: dependsUponIdentifier,
									id: identifier,
								},
								{ id: dependsUponIdentifier },
							],
						),
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