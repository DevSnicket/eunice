/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	{ createElement } = require("react"),
	{ createStackFromYaml } = require("@devsnicket/eunice-dependency-and-structure"),
	createWithDependencyList = require("."),
	{ renderToStaticMarkup } = require("react-dom/server"),
	path = require("path"),
	readTextFile = require("../../../../readTextFile"),
	removeWhitespaceFromTestExpected = require("./removeWhitespaceFromTestExpected");

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
	async() => {
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
			removeWhitespaceFromTestExpected(
				await readTextFile(
					path.join(__dirname, "testCase.html"),
				),
			),
		);
	},
);