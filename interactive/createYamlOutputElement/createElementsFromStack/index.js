// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import "./index.css";

import createAreDependenciesOfAncestorsIncludedSelection from "./createAreDependenciesOfAncestorsIncludedSelection";
import createSubsetSelection from "./createSubsetSelection";
import dependencyListElementFactory from "./dependencyListElementFactory";
import ensureDependencyCountsInStack from "./ensureDependencyCountsInStack";
import { findItemInStackWithIdentifierHierarchy } from "@devsnicket/eunice-dependency-and-structure";
import getSvgElementForStack from "@devsnicket/eunice-visualizer";
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