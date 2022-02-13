/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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