/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "./index.css";

import createAreDependenciesOfAncestorsIncludedSelection from "./createAreDependenciesOfAncestorsIncludedSelection";
import createSubsetSelection from "./createSubsetSelection";
import dependencyListElementFactory from "./dependencyListElementFactory";
import ensureDependencyCountsInStack from "./ensureDependencyCountsInStack";
import { findItemInStackWithIdentifierHierarchy } from "../../../dependency-and-structure";
import getSvgElementForStack from "../../../visualizer";
import getTextWidth from "string-pixel-width";

export default ({
	areDependenciesOfAncestorsIncluded,
	createElement,
	locationHash,
	resizableElementTypes,
	stack,
}) => {
	const subsetSelection =
		createSubsetSelection({
			createElement,
			getHrefWithKeyAndValue:
				getHrefWithKeyAndValueAndNoDependencyList,
			getValueOfKey:
				locationHash.getValueOfKey,
		});

	return (
		createWithSubset({
			areDependenciesOfAncestorsIncludedSelection:
				createAreDependenciesOfAncestorsIncludedSelection({
					areIncludedDefault:
						areDependenciesOfAncestorsIncluded,
					getValueOfKey:
						locationHash.getValueOfKey,
				}),
			createElement,
			locationHash,
			resizableElementTypes,
			stack:
				getOrFindStack({
					identifierHierarchy:
						subsetSelection.identifierHierarchy,
					stack,
				}),
			subsetSelection,
		})
	);

	function getHrefWithKeyAndValueAndNoDependencyList({
		key,
		value,
	}) {
		return (
			locationHash.getWithKeysAndValues({
				keys:
					{
						[key]: key,
						...dependencyListElementFactory.keys,
					},
				values:
					{ [key]: value },
			})
		);
	}
};

function getOrFindStack({
	identifierHierarchy,
	stack,
}) {
	return whenHasIdentifierHierarchy() || stack;

	function whenHasIdentifierHierarchy() {
		return (
			identifierHierarchy
			&&
			getItemsOrThrowError(
				findItemInStackWithIdentifierHierarchy({
					identifierHierarchy,
					stack,
				}),
			)
		);

		function getItemsOrThrowError(
			item,
		) {
			if (item.items)
				return item.items;
			else
				throw new Error(`Final item of subset identifier hierarchy "${identifierHierarchy.join("->")}" has no child items.`);
		}
	}
}

function createWithSubset({
	areDependenciesOfAncestorsIncludedSelection,
	createElement,
	locationHash,
	resizableElementTypes,
	stack,
	subsetSelection,
}) {
	ensureDependencyCountsInStack(stack);

	return (
		createWithDependencyList(
			createVisualizationElement(
				...createBreadcrumbAndOptionsElement(),
				getSvgElement(),
			),
		)
	);

	function createWithDependencyList(
		element,
	) {
		return (
			dependencyListElementFactory.createWithDependencyList({
				areAncestorsIncluded:
					areDependenciesOfAncestorsIncludedSelection.areIncluded,
				createAncestorSeparatorElement:
					subsetSelection.createAncestorSeparatorElement,
				createElement,
				element,
				getHrefWithIdentifierHierarchy:
					subsetSelection.getHrefWithIdentifierHierarchy,
				locationHash,
				resizableElementTypes,
				stack,
			})
		);
	}

	function createVisualizationElement(
		...elements
	) {
		return (
			createElement(
				"div",
				{ className: "visualization" },
				...elements,
			)
		);
	}

	function * createBreadcrumbAndOptionsElement() {
		if (subsetSelection.identifierHierarchy)
			yield (
				createElement(
					"div",
					{ className: "breadcrumb-and-options" },
					subsetSelection.createBreadcrumbElement(),
					areDependenciesOfAncestorsIncludedSelection.createSelectorElement({
						createElement,
						setKeyAndValue:
							locationHash.setKeyAndValue,
					}),
				)
			);
	}

	function getSvgElement() {
		return (
			getSvgElementForStack({
				areDependenciesOfAncestorsIncluded:
					areDependenciesOfAncestorsIncludedSelection.areIncluded,
				createElement,
				elementContainerFactory:
					createElementContainerFactory(),
				getTextWidth,
				namespaces:
					{ xmlnsXlink: "http://www.w3.org/1999/xlink" },
				stack,
				style:
					"a{cursor:pointer}",
			})
		);

		function createElementContainerFactory() {
			return (
				{
					createForDependencyCount: createElementContainerForDependencyCount,
					createForItem: createElementContainerForItem,
				}
			);

			function createElementContainerForDependencyCount({
				element,
				item,
				level,
				relationship,
			}) {
				return (
					dependencyListElementFactory.createForDependencyCount({
						createElement,
						element,
						getHrefWithKeysAndValues:
							locationHash.getWithKeysAndValues,
						identifier:
							item !== stack.parent
							&&
							item.id,
						levelDirection:
							level,
						relationship,
					})
				);
			}

			function createElementContainerForItem({
				element,
				item,
			}) {
				return (
					subsetSelection.createContainerForItemElement({
						element,
						item,
					})
				);
			}
		}
	}
}