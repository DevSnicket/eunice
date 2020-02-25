// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";
import createListElement from "../../createListElement";
import path from "path";
import readTextFile from "../../../../../../readTextFile";
import removeWhitespaceFromTestExpected from "../../removeWhitespaceFromTestExpected";
import { renderToStaticMarkup } from "react-dom/server";

test(
	"child items with depends upon",
	async() =>
		expect(
			renderToStaticMarkup(
				createListElement({
					closeHref:
						"close-href",
					createAncestorSeparatorElement:
						() => "-",
					createElement,
					createIdentifierHierarchyAnchor:
						identifierHierarchy => `[${identifierHierarchy}]`,
					relationship:
						"dependsUpon",
					subset:
						createSubset({
							identifier:
								"item 1",
							items:
								[
									createSubset({
										dependencies:
											[ createItem({ identifier: "dependency 1" }) ],
										identifier:
											"child 1",
									}),
									createSubset({
										dependencies:
											[
												createItem({
													identifier:
														"dependency 2",
													parent:
														createItem({ identifier: "parent of dependency 2" }),
												}),
											],
										identifier:
											"child 2",
									}),
									createSubset({
										dependencies:
											[
												createItem({
													identifier: "dependency 3",
													parent: createItem({}),
												}),
											],
										identifier:
											"child 3",
									}),
									createSubset({
										dependencies:
											[
												createItem({ identifier: "dependency 4" }),
												createItem({ identifier: "dependency 5" }),
											],
										identifier:
											"child 4",
										items:
											[ createSubset({ identifier: "grandchild" }) ],
									}),
									createSubset({
										identifier:
											"child 5",
										items:
											[ createSubset(), createSubset() ],
									}),
								],
						}),
				}),
			),
		)
		.toEqual(
			removeWhitespaceFromTestExpected(
				await readTextFile(
					path.join(__dirname, "test-case.html"),
				),
			),
		),
);

function createSubset({
	dependencies = null,
	identifier = null,
	items = null,
} = {}) {
	return (
		{
			dependencies,
			item: createItem({ identifier }),
			items,
		}
	);
}

function createItem({
	identifier = null,
	parent = null,
}) {
	return (
		{
			id: identifier,
			level: { stack: { parent } },
		}
	);
}