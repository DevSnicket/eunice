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
	"item not in subset with no dependencies returns only element",
	() => {
		const itemIdentifier = "item";

		expect(
			renderToStaticMarkup(
				createWithDependencyList({
					createAncestorSeparatorElement:
						null,
					createElement,
					createIdentifierHierarchyAnchor:
						null,
					element,
					identifier:
						itemIdentifier,
					level:
						{},
					relationship:
						"dependsUpon",
					resizableElementTypes:
						null,
					stack:
						[ [ { id: itemIdentifier } ] ],
					subsetIdentifierHierarchy:
						null,
				}),
			),
		)
		.toBe(element);
	},
);

test(
	"subset of child item that depends upon item in same level returns element and dependency list in Reflex resize",
	() => {
		const
			childIdentifier = "item",
			parentIdentifier = "parent";

		expect(
			renderToStaticMarkup(
				createWithDependencyList({
					createAncestorSeparatorElement:
						null,
					createElement,
					createIdentifierHierarchyAnchor:
						identifierHierarchy => `[${identifierHierarchy}]`,
					element,
					identifier:
						childIdentifier,
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
						),
					subsetIdentifierHierarchy:
						[ parentIdentifier ],
				}),
			),
		)
		.toBe(
			readTestFile(
				path.join(__dirname, "testCase.html"),
			)
			.replace(/\n|\t/g, ""),
		);
	},
);