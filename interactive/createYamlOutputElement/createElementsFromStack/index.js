// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createSubsetSelection from "./createSubsetSelection";
import dependencyListElementFactory from "./dependencyListElementFactory";
import ensureDependencyCountsInStack from "./ensureDependencyCountsInStack";
import { findItemInStackWithIdentifierHierarchy } from "@devsnicket/eunice-dependency-and-structure";
import getSvgElementForStack from "@devsnicket/eunice-visualizer";
import getTextWidth from "string-pixel-width";

export default ({
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
	createElement,
	locationHash,
	resizableElementTypes,
	stack,
	subsetSelection,
}) {
	ensureDependencyCountsInStack(stack);

	return (
		createWithDependencyList(
			createBreadcrumbAndSvgElement(),
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

	function createBreadcrumbAndSvgElement() {
		return (
			createElement(
				"div",
				{ style: { padding: "0.5em" } },
				subsetSelection.createBreadcrumbElement(),
				getSvgElementForStack({
					createElement,
					elementContainerFactory:
						createElementContainerFactory(),
					getTextWidth,
					namespaces:
						{ xmlnsXlink: "http://www.w3.org/1999/xlink" },
					stack,
					style:
						"a{cursor:pointer}",
				}),
			)
		);
	}

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
					identifier: item.id,
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