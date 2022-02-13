/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createIsDependencyOfItemRelevant from "./createIsDependencyOfItemRelevant";
import createListElement from "./createListElement";
import { createResizableContainer } from "../../../../../test-harnesses";
import createSubset from "./createSubset";
import { findItemInStackWithIdentifierHierarchy } from "../../../../../dependency-and-structure";

export default ({
	areAncestorsIncluded,
	closeHref,
	createAncestorSeparatorElement,
	createElement,
	element,
	getHrefWithIdentifierHierarchy,
	identifier,
	levelDirection,
	locationHash,
	resizableElementTypes,
	relationship,
	stack,
}) => {
	return (
		createListInContainerWhenAny()
		||
		element
	);

	function createListInContainerWhenAny() {
		return (
			levelDirection
			&&
			relationship
			&&
			createVerticalResizeWithLowerElement(
				createListElement({
					closeHref,
					createAncestorSeparatorElement,
					createElement,
					getHrefWithIdentifierHierarchy,
					relationship,
					subset:
						createSubsetOfItem({
							isDependencyOfItemRelevant:
								createIsDependencyOfItemRelevant({
									areAncestorsIncluded,
									levelDirection,
								}),
							item:
								findItemOrGetParent(),
						}),
				}),
			)
		);
	}

	function findItemOrGetParent() {
		return (
			whenIdentifierSpecified()
			||
			stack.parent
		);

		function whenIdentifierSpecified() {
			return (
				identifier
				&&
				findItemInStackWithIdentifierHierarchy({
					identifierHierarchy: [ identifier ],
					stack,
				})
			);
		}
	}

	function createSubsetOfItem({
		isDependencyOfItemRelevant,
		item,
	}) {
		return (
			createSubset({
				isDependencyRelevant:
					dependency =>
						isDependencyOfItemRelevant({
							dependency,
							item,
						}),
				item,
				relationship,
			})
		);
	}

	function createVerticalResizeWithLowerElement(
		lowerElement,
	) {
		return (
			lowerElement
			&&
			createResizableContainer({
				createElement,
				flexKeysAndValues:
					locationHash,
				items:
					[
						{ element },
						{
							element: lowerElement,
							flex: { key: "dependency-list-height" },
						},
					],
				orientation:
					"horizontal",
				resizableElementTypes,
			})
		);
	}
};