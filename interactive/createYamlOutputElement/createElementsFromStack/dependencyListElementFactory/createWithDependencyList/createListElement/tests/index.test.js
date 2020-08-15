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
					getHrefWithIdentifierHierarchy:
						identifierHierarchy => identifierHierarchy,
					relationship:
						"dependsUpon",
					subset:
						createSubset({
							identifier:
								"parent",
							items:
								[
									createSubset({ identifier: "alphabetical sort out of order child 2" }),
									createSubset({ identifier: "alphabetical sort out of order child 1" }),
									createSubset({
										dependencies:
											[ createItem({ identifier: "dependency of child with dependency" }) ],
										identifier:
											"child with dependency",
									}),
									createSubset({
										dependencies:
											[
												createItem({
													identifier: "dependency of anonymous parent",
													parent: createItem({}),
												}),
											],
										identifier:
											"child with dependency hierarchy of anonymous parent",
									}),
									createSubset({
										dependencies:
											[
												createItem({
													identifier:
														"dependency of identifiable parent",
													parent:
														createItem({
															identifier: "identifiable parent of dependency",
															items: true,
														}),
												}),
											],
										identifier:
											"child with dependency hierarchy of identifiable parent",
									}),
									createSubset({
										dependencies:
											[
												createItem({
													identifier:
														"dependency of identifiable parent and grandparent",
													parent:
														createItem({
															identifier:
																"identifiable parent of dependency",
															items:
																true,
															parent:
																createItem({
																	identifier: "identifiable grandparent of dependency",
																	items: true,
																}),
														}),
												}),
											],
										identifier:
											"child with dependency hierarchy of identifiable parent and grandparent",
									}),
									createSubset({
										identifier:
											"child with parent and grandchild",
										items:
											[ createSubset({ identifier: "grandchild in child with parent" }) ],
										parent:
											createItem({ identifier: "parent" }),
									}),
									createSubset({
										identifier:
											"child with two anonymous grandchildren",
										items:
											[ createSubset(), createSubset() ],
									}),
									createSubset({
										dependencies:
											[
												createItem({ identifier: "dependency 1 of child with two dependencies and grandchild" }),
												createItem({ identifier: "dependency 2 of child with two dependencies and grandchild" }),
											],
										identifier:
											"child with two dependencies and grandchild",
										items:
											[ createSubset({ identifier: "grandchild in child with two dependencies" }) ],
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
	parent = null,
} = {}) {
	return (
		{
			dependencies,
			item:
				createItem({
					identifier,
					items: Boolean(items),
					parent,
				}),
			items,
		}
	);
}

function createItem({
	identifier = null,
	parent = null,
	items = null,
}) {
	return (
		{
			id: identifier,
			items,
			level: { stack: { parent } },
		}
	);
}