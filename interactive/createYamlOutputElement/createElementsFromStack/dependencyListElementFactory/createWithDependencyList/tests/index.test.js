/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import {
	addDirectionAndMutualStackToDependenciesInStack,
	createStackFromYaml,
} from "../../../../../../dependency-and-structure";

import { createElement } from "react";
import createWithDependencyList from "..";
import path from "path";
import readTextFile from "../../../../../readTextFile";
import removeWhitespaceFromTestExpected from "../removeWhitespaceFromTestExpected";
import { renderToStaticMarkup } from "react-dom/server";

const
	dependsUponIdentifier = "depends upon",
	element = "element";

test(
	"item without dependencies nor parent returns only element",
	() => {
		const itemIdentifier = "item";

		expect(
			renderToStaticMarkup(
				createWithDependencyList({
					areAncestorsIncluded:
						false,
					closeHref:
						null,
					createAncestorSeparatorElement:
						null,
					createElement,
					element,
					getHrefWithIdentifierHierarchy:
						null,
					identifier:
						itemIdentifier,
					levelDirection:
						{},
					locationHash:
						{},
					relationship:
						"dependsUpon",
					resizableElementTypes:
						null,
					stack:
						[ [ { id: itemIdentifier } ] ],
				}),
			),
		)
		.toBe(element);
	},
);

describe(
	"child item that depends upon item in same level returns element and dependency list in Reflex resize",
	() => {
		const childIdentifier = "child";

		test(
			"root with no identifier specified",
			() =>
				testIdentifierAndStack({
					identifier:
						null,
					stack:
						createStack()[0][0].items,
				}),
		);

		test(
			"child item identifier specified",
			() =>
				testIdentifierAndStack({
					identifier:
						childIdentifier,
					stack:
						createStack(),
				}),
		);

		function createStack() {
			const stack =
				createStackFromYaml([
					{
						dependsUpon: dependsUponIdentifier,
						id: childIdentifier,
						items: "grandchild",
					},
					{ id: dependsUponIdentifier },
				]);

			addDirectionAndMutualStackToDependenciesInStack(stack);

			return stack;
		}

		async function testIdentifierAndStack({
			identifier,
			stack,
		}) {
			expect(
				renderToStaticMarkup(
					createWithDependencyList({
						areAncestorsIncluded:
							true,
						closeHref:
							"close-href",
						createAncestorSeparatorElement:
							null,
						createElement,
						element,
						getHrefWithIdentifierHierarchy:
							identifierHierarchy => identifierHierarchy,
						identifier,
						levelDirection:
							"same",
						locationHash:
							{ getValueOfKey: () => null },
						relationship:
							"dependsUpon",
						resizableElementTypes:
							{
								/* cSpell:disable */
								container: "resizablecontainer",
								item: "resizableitem",
								splitter: "resizablesplitter",
								/* cSpell:enable */
							},
						stack,
					}),
				),
			)
			.toBe(
				removeWhitespaceFromTestExpected(
					await readTextFile(
						path.join(__dirname, "test-case.html"),
					),
				),
			);
		}
	},
);